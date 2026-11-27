import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowLeft,
  BriefcaseBusiness,
  Download,
  Ellipsis,
  FileText,
  MessageCircle,
  X,
} from "lucide-react";

import type {
  CorrespondenceThread,
  ThreadMessage,
} from "@/@types/correspondences";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  Message,
  MessageContent,
  MessageFooter,
  MessageGroup,
} from "@/components/ui/message";
import { Spinner } from "@/components/ui/spinner";
import { useMessages, useSingleThread } from "@/hooks/correspondences";

import {
  formatSeparatorLabel,
  formatTime,
  getAttachmentName,
  getAttachmentUrl,
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

/** Start a new timestamped block when messages are more than an hour apart. */
const BLOCK_GAP_MS = 60 * 60 * 1000;
/** Show the "jump to latest" button once scrolled this far from the bottom. */
const JUMP_THRESHOLD_PX = 160;

type TimeBlock = { key: number; label: string; messages: ThreadMessage[] };

const groupByTime = (messages: ThreadMessage[]) =>
  messages.reduce<TimeBlock[]>((blocks, message) => {
    const last = blocks[blocks.length - 1];
    const previous = last?.messages[last.messages.length - 1];
    const gap = previous
      ? new Date(message.created_at).getTime() -
        new Date(previous.created_at).getTime()
      : Infinity;

    if (last && gap <= BLOCK_GAP_MS) {
      last.messages.push(message);
    } else {
      blocks.push({
        key: message.id,
        label: formatSeparatorLabel(message.created_at),
        messages: [message],
      });
    }

    return blocks;
  }, []);

type ThreadViewProps = {
  threadId: number;
  fallbackThread?: CorrespondenceThread;
  currentUserId?: number;
  onBack: () => void;
};

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

  // The messages response also carries the thread (with participants).
  const messagesThread = (
    messagesResponse as { data?: { thread?: CorrespondenceThread } } | undefined
  )?.data?.thread;
  const thread =
    messagesThread ??
    toItem<CorrespondenceThread>(threadResponse) ??
    fallbackThread;

  const messages = useMemo(
    () => sortMessages(toList<ThreadMessage>(messagesResponse)),
    [messagesResponse],
  );
  const blocks = useMemo(() => groupByTime(messages), [messages]);

  const counterpart = thread
    ? getCounterpart(thread, currentUserId)
    : undefined;
  const counterpartName = getUserName(counterpart);
  const counterpartImage = getUserImage(counterpart);
  const jobTitle = thread ? getJobTitle(thread) : undefined;
  const company = thread ? getCompanyName(thread) : undefined;

  const isMine = (message: ThreadMessage) =>
    currentUserId !== undefined && getSenderId(message) === currentUserId;
  const lastMessage = messages[messages.length - 1];
  const showSeen =
    !!lastMessage && isMine(lastMessage) && !!lastMessage.read_at;

  const scrollRef = useRef<HTMLDivElement>(null);
  const [showJump, setShowJump] = useState(false);

  const scrollToBottom = (behavior: ScrollBehavior = "auto") => {
    const element = scrollRef.current;
    if (element) element.scrollTo({ top: element.scrollHeight, behavior });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages.length, threadId]);

  const handleScroll = () => {
    const element = scrollRef.current;
    if (!element) return;

    const distance =
      element.scrollHeight - element.scrollTop - element.clientHeight;
    setShowJump(distance > JUMP_THRESHOLD_PX);
  };

  const renderIntro = () => (
    <div className="flex flex-col items-center gap-3 pt-6 pb-10 text-center">
      <Avatar size="lg">
        <AvatarImage src={counterpartImage} alt={counterpartName} />
        <AvatarFallback>{getInitials(counterpartName)}</AvatarFallback>
      </Avatar>

      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-bold">{counterpartName}</h3>
        {thread?.subject && (
          <p className="text-muted-foreground">{thread.subject}</p>
        )}
        {(jobTitle || company) && (
          <p className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
            <BriefcaseBusiness className="size-3.5 shrink-0" />
            <span>{[jobTitle, company].filter(Boolean).join(" · ")}</span>
          </p>
        )}
      </div>
    </div>
  );

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

    return (
      <>
        {renderIntro()}

        {messages.length === 0 ? (
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
        ) : (
          <div className="flex flex-col gap-8">
            {blocks.map((block) => (
              <section key={block.key} className="flex flex-col gap-4">
                <p className="text-center text-sm font-medium text-muted-foreground">
                  {block.label}
                </p>

                <MessageGroup>
                  {block.messages.map((message, index) => {
                    const mine = isMine(message);
                    const next = block.messages[index + 1];
                    const isLastInRun =
                      !next || getSenderId(next) !== getSenderId(message);
                    const isLatest = message.id === lastMessage?.id;
                    const text = getMessageText(message).trim();
                    const attachments = message.attachments ?? [];

                    return (
                      <Message key={message.id} align={mine ? "end" : "start"}>
                        <MessageContent>
                          {attachments.length > 0 && (
                            <ul
                              className={`flex max-w-[85%] flex-col gap-1.5 sm:max-w-[70%] ${
                                mine ? "items-end self-end" : "items-start"
                              }`}
                            >
                              {attachments.map((attachment, fileIndex) => {
                                const name = getAttachmentName(attachment);
                                const href = getAttachmentUrl(attachment);

                                return (
                                  <li
                                    key={attachment.id ?? fileIndex}
                                    className="max-w-full"
                                  >
                                    <a
                                      href={href || undefined}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      title={formatTime(message.created_at)}
                                      className="flex items-center gap-3 rounded-2xl border border-border bg-background px-3 py-2.5 transition-colors hover:bg-muted"
                                    >
                                      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-muted text-Blue">
                                        <FileText className="size-4" />
                                      </span>
                                      <span className="min-w-0 truncate text-sm font-medium">
                                        {name}
                                      </span>
                                      <Download className="size-4 shrink-0 text-muted-foreground" />
                                    </a>
                                  </li>
                                );
                              })}
                            </ul>
                          )}

                          {text && (
                            <div
                              title={formatTime(message.created_at)}
                              className={`w-fit max-w-[85%] rounded-3xl px-4 py-2.5 text-[15px] leading-snug whitespace-pre-wrap sm:max-w-[70%] ${
                                mine
                                  ? "self-end bg-Blue text-white"
                                  : "bg-muted text-foreground"
                              } ${
                                isLastInRun
                                  ? mine
                                    ? "rounded-br-md"
                                    : "rounded-bl-md"
                                  : ""
                              }`}
                            >
                              {text}
                            </div>
                          )}

                          {isLatest && showSeen && (
                            <MessageFooter>Seen</MessageFooter>
                          )}
                        </MessageContent>
                      </Message>
                    );
                  })}
                </MessageGroup>
              </section>
            ))}
          </div>
        )}
      </>
    );
  };

  return (
    <>
      {/* Header */}
      <header className="flex min-h-[72px] items-center gap-3 px-4 py-3 sm:px-5">
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
          <AvatarImage src={counterpartImage} alt={counterpartName} />
          <AvatarFallback>{getInitials(counterpartName)}</AvatarFallback>
        </Avatar>

        <h2 className="min-w-0 flex-1 truncate text-lg font-semibold">
          {counterpartName}
        </h2>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="outline"
                size="icon-lg"
                aria-label="Conversation options"
              />
            }
          >
            <Ellipsis />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={onBack}>
                <X />
                Close
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      {/* Messages */}
      <div className="relative flex min-h-0 flex-1 flex-col">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex min-h-0 flex-1 flex-col overflow-y-auto px-4 pb-6 sm:px-6"
        >
          {renderMessages()}
        </div>

        {showJump && (
          <div className="absolute right-5 bottom-4">
            <Button
              size="icon-lg"
              aria-label="Jump to latest message"
              onClick={() => scrollToBottom("smooth")}
            >
              <ArrowDown />
            </Button>
          </div>
        )}
      </div>

      <MessageComposer threadId={threadId} />
    </>
  );
};

export default ThreadView;
