import { Inbox, Search, X } from "lucide-react";

import type { CorrespondenceThread } from "@/@types/correspondences";
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
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";

import {
  formatListTimestamp,
  getCompanyName,
  getCounterpart,
  getInitials,
  getLastMessage,
  getMessageText,
  getSenderId,
  getUserImage,
  getUserName,
} from "../utils";

type ThreadListProps = {
  threads: CorrespondenceThread[];
  activeId: number | null;
  currentUserId?: number;
  search: string;
  onSearchChange: (value: string) => void;
  onSelect: (id: number) => void;
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
  hasAnyThreads: boolean;
};

const ThreadList = ({
  threads,
  activeId,
  currentUserId,
  search,
  onSearchChange,
  onSelect,
  isLoading,
  isError,
  onRetry,
  hasAnyThreads,
}: ThreadListProps) => {
  const renderBody = () => {
    if (isLoading) {
      return (
        <div className="flex flex-1 items-center justify-center gap-2 p-6 text-sm text-muted-foreground">
          <Spinner />
          Loading conversations...
        </div>
      );
    }

    if (isError) {
      return (
        <Empty>
          <EmptyHeader>
            <EmptyTitle>Couldn't load conversations</EmptyTitle>
            <EmptyDescription>
              Check your connection and try again.
            </EmptyDescription>
          </EmptyHeader>
          <Button variant="outline" size="sm" onClick={onRetry}>
            Retry
          </Button>
        </Empty>
      );
    }

    if (!hasAnyThreads) {
      return (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Inbox />
            </EmptyMedia>
            <EmptyTitle>No conversations yet</EmptyTitle>
            <EmptyDescription>
              Messages from employers about your applications will appear
              here.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      );
    }

    if (threads.length === 0) {
      return (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Search />
            </EmptyMedia>
            <EmptyTitle>No conversations found</EmptyTitle>
            <EmptyDescription>
              Try searching for another name, subject or company.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      );
    }

    return (
      <ul className="divide-y divide-border">
        {threads.map((thread) => {
          const counterpart = getCounterpart(thread, currentUserId);
          const name = getUserName(counterpart);
          const lastMessage = getLastMessage(thread);
          const company = getCompanyName(thread);
          const unread = thread.unread_count ?? 0;
          const isActive = activeId === thread.id;
          const isMine =
            !!lastMessage && getSenderId(lastMessage) === currentUserId;

          return (
            <li key={thread.id}>
              <button
                type="button"
                onClick={() => onSelect(thread.id)}
                aria-current={isActive ? "true" : undefined}
                className={`relative flex w-full gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/60 ${
                  isActive ? "bg-muted" : ""
                }`}
              >
                {isActive && (
                  <span className="absolute inset-y-0 left-0 w-[3px] rounded-r bg-Blue" />
                )}

                <Avatar size="lg">
                  <AvatarImage src={getUserImage(counterpart)} alt={name} />
                  <AvatarFallback>{getInitials(name)}</AvatarFallback>
                </Avatar>

                <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <span className="flex items-center justify-between gap-2">
                    <span
                      className={`truncate text-sm ${
                        unread > 0 ? "font-bold" : "font-semibold"
                      }`}
                    >
                      {name}
                    </span>
                    <span className="shrink-0 text-[11px] text-muted-foreground">
                      {formatListTimestamp(
                        lastMessage?.created_at ??
                          thread.updated_at ??
                          thread.created_at,
                      )}
                    </span>
                  </span>

                  <span className="truncate text-xs font-medium">
                    {thread.subject}
                    {company && (
                      <span className="text-muted-foreground">
                        {" "}
                        · {company}
                      </span>
                    )}
                  </span>

                  <span className="flex items-center justify-between gap-2">
                    <span
                      className={`truncate text-xs ${
                        unread > 0
                          ? "font-semibold text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      {lastMessage
                        ? `${isMine ? "You: " : ""}${getMessageText(lastMessage)}`
                        : "No messages yet"}
                    </span>
                    {unread > 0 && <Badge>{unread}</Badge>}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <>
      <div className="flex flex-col gap-4 border-b border-border p-4">
        <div>
          <h2 className="font-semibold">Inbox</h2>
          <p className="text-xs text-muted-foreground">
            Your recent conversations
          </p>
        </div>

        <InputGroup>
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupInput
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search messages..."
            aria-label="Search conversations"
          />
          {search && (
            <InputGroupAddon align="inline-end">
              <InputGroupButton
                size="icon-xs"
                aria-label="Clear search"
                onClick={() => onSearchChange("")}
              >
                <X />
              </InputGroupButton>
            </InputGroupAddon>
          )}
        </InputGroup>
      </div>

      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
        {renderBody()}
      </div>
    </>
  );
};

export default ThreadList;
