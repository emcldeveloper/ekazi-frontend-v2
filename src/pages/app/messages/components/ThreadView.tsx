import { useEffect, useMemo, useRef } from "react";
import { ArrowLeft, BriefcaseBusiness, MessageCircle } from "lucide-react";

import type {
  CorrespondenceThread,
  ThreadMessage,
} from "@/@types/correspondences";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageHeader,
} from "@/components/ui/message";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { useMessages, useSingleThread } from "@/hooks/correspondences";

import {
  formatDayLabel,
  formatTime,
  getCompanyName,
  getCounterpart,
  getInitials,
  getJobTitle,
  getMessageText,
  getSenderId,
  getUserImage,
  getUserName,
  sortMessages,
  toItem,
  toList,
} from "../utils";
import MessageComposer from "./MessageComposer";

type ThreadViewProps = {
  threadId: number;
  fallbackThread?: CorrespondenceThread;
  currentUserId?: number;
  onBack: () => void;
};

type DayGroup = { label: string; messages: ThreadMessage[] };

const groupByDay = (messages: ThreadMessage[]) =>
  messages.reduce<DayGroup[]>((groups, message) => {
    const label = formatDayLabel(message.created_at);
    const last = groups[groups.length - 1];

    if (last && last.label === label) {
      last.messages.push(message);
    } else {
      groups.push({ label, messages: [message] });
    }

    return groups;
  }, []);

const ThreadView = ({
  threadId,
  fallbackThread,
  currentUserId,
  onBack,
}: ThreadViewProps) => {
  const { data: threadResponse } = useSingleThread(threadId);
  const {
    data: messagesResponse,
    isLoading,
    isError,
    refetch,
  } = useMessages(threadId);

  const thread =
    toItem<CorrespondenceThread>(threadResponse) ?? fallbackThread;

  const messages = useMemo(
    () => sortMessages(toList<ThreadMessage>(messagesResponse)),
    [messagesResponse],
  );
  const dayGroups = useMemo(() => groupByDay(messages), [messages]);

  const counterpart = thread
    ? getCounterpart(thread, currentUserId)
    : undefined;
  const counterpartName = getUserName(counterpart);
  const jobTitle = thread ? getJobTitle(thread) : undefined;
  const company = thread ? getCompanyName(thread) : undefined;

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = scrollRef.current;
    if (element) element.scrollTop = element.scrollHeight;
  }, [messages.length, threadId]);

  const renderMessages = () => {
    if (isLoading) {
      return (
        <div className="flex flex-1 items-center justify-center gap-2 text-sm text-muted-foreground">
          <Spinner />
          Loading messages...
        </div>
      );
    }

    if (isError) {
      return (
        <Empty>
          <EmptyHeader>
            <EmptyTitle>Couldn't load messages</EmptyTitle>
            <EmptyDescription>
              Something went wrong while loading this conversation.
            </EmptyDescription>
          </EmptyHeader>
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            Retry
          </Button>
        </Empty>
      );
    }

    if (messages.length === 0) {
      return (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <MessageCircle />
            </EmptyMedia>
            <EmptyTitle>No messages yet</EmptyTitle>
            <EmptyDescription>
              Send the first message to start the conversation.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      );
    }

    return (
      <div className="flex flex-col gap-6">
        {dayGroups.map((group) => (
          <section key={group.label} className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <Separator />
              </div>
              <span className="shrink-0 text-[11px] font-medium text-muted-foreground">
                {group.label}
              </span>
              <div className="flex-1">
                <Separator />
              </div>
            </div>

            <MessageGroup>
              {group.messages.map((message, index) => {
                const senderId = getSenderId(message);
                const isMine =
                  currentUserId !== undefined && senderId === currentUserId;
                const sender = message.sender ?? message.user;
                const senderName = sender
                  ? getUserName(sender)
                  : counterpartName;
                const previous = group.messages[index - 1];
                const isFirstInRun =
                  !previous || getSenderId(previous) !== senderId;

                return (
                  <Message key={message.id} align={isMine ? "end" : "start"}>
                    {!isMine && (
                      <MessageAvatar>
                        {isFirstInRun ? (
                          <Avatar size="sm">
                            <AvatarImage
                              src={getUserImage(sender ?? counterpart)}
                              alt={senderName}
                            />
                            <AvatarFallback>
                              {getInitials(senderName)}
                            </AvatarFallback>
                          </Avatar>
                        ) : (
                          <span className="size-6" aria-hidden />
                        )}
                      </MessageAvatar>
                    )}

                    <MessageContent>
                      {!isMine && isFirstInRun && (
                        <MessageHeader>{senderName}</MessageHeader>
                      )}

                      <div
                        className={`w-fit max-w-[85%] rounded-2xl px-4 py-2.5 leading-relaxed whitespace-pre-wrap sm:max-w-[75%] ${
                          isMine
                            ? "self-end rounded-br-sm bg-Blue text-white"
                            : "rounded-bl-sm bg-muted text-foreground"
                        }`}
                      >
                        {getMessageText(message)}
                      </div>

                      <MessageFooter>
                        {formatTime(message.created_at)}
                        {isMine && message.read_at && " · Read"}
                      </MessageFooter>
                    </MessageContent>
                  </Message>
                );
              })}
            </MessageGroup>
          </section>
        ))}
      </div>
    );
  };

  return (
    <>
      {/* Header */}
      <header className="flex min-h-[72px] items-center gap-3 border-b border-border px-4 py-3 sm:px-5">
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Back to inbox"
            onClick={onBack}
          >
            <ArrowLeft />
          </Button>
        </div>

        <Avatar size="lg">
          <AvatarImage src={getUserImage(counterpart)} alt={counterpartName} />
          <AvatarFallback>{getInitials(counterpartName)}</AvatarFallback>
        </Avatar>

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-bold sm:text-base">
            {counterpartName}
          </h3>
          <p className="truncate text-xs text-muted-foreground">
            {thread?.subject}
          </p>
        </div>
      </header>

      {/* Job context */}
      {(jobTitle || company) && (
        <div className="flex items-center justify-between gap-3 border-b border-border bg-muted/30 px-4 py-2.5 sm:px-5">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-Blue">
              <BriefcaseBusiness className="size-4" />
            </span>
            <div className="min-w-0">
              {jobTitle && (
                <p className="truncate text-xs font-semibold sm:text-sm">
                  {jobTitle}
                </p>
              )}
              {company && (
                <p className="truncate text-xs text-muted-foreground">
                  {company}
                </p>
              )}
            </div>
          </div>
          <Badge variant="outline">Job</Badge>
        </div>
      )}

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex min-h-0 flex-1 flex-col overflow-y-auto bg-muted/10 px-4 py-6 sm:px-6"
      >
        {renderMessages()}
      </div>

      <MessageComposer threadId={threadId} />
    </>
  );
};

export default ThreadView;
