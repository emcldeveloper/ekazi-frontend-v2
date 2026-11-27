import { ChevronDown, Inbox, Search, X } from "lucide-react";

import type { CorrespondenceThread } from "@/@types/correspondences";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { InputGroupInput } from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";

import {
  formatRelativeShort,
  getCounterpart,
  getInitials,
  getLastMessage,
  getMessagePreview,
  getSenderId,
  getUserImage,
  getUserName,
} from "../utils";

export type ThreadFilter = "all" | "unread";

const FILTER_LABELS: Record<ThreadFilter, string> = {
  all: "All",
  unread: "Unread",
};

type ThreadListProps = {
  threads: CorrespondenceThread[];
  activeId: number | null;
  currentUserId?: number;
  search: string;
  onSearchChange: (value: string) => void;
  filter: ThreadFilter;
  onFilterChange: (value: ThreadFilter) => void;
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
  filter,
  onFilterChange,
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
              Messages from employers about your applications will appear here.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      );
    }

    if (threads.length === 0) {
      const isUnreadOnly = filter === "unread" && !search.trim();

      return (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              {isUnreadOnly ? <Inbox /> : <Search />}
            </EmptyMedia>
            <EmptyTitle>
              {isUnreadOnly ? "You're all caught up" : "No conversations found"}
            </EmptyTitle>
            <EmptyDescription>
              {isUnreadOnly
                ? "There are no unread messages right now."
                : "Try searching for another name, subject or company."}
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      );
    }

    return (
      <ul className="flex flex-col gap-1 px-2 pb-3">
        {threads.map((thread) => {
          const counterpart = getCounterpart(thread, currentUserId);
          const name = getUserName(counterpart);
          const lastMessage = getLastMessage(thread);
          const unread = thread.unread_count ?? 0;
          const isActive = activeId === thread.id;
          const isMine =
            !!lastMessage && getSenderId(lastMessage) === currentUserId;
          const timestamp =
            lastMessage?.created_at ?? thread.updated_at ?? thread.created_at;

          return (
            <li key={thread.id}>
              <button
                type="button"
                onClick={() => onSelect(thread.id)}
                aria-current={isActive ? "true" : undefined}
                className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition-colors hover:bg-muted/60 ${
                  isActive ? "bg-muted" : ""
                }`}
              >
                <Avatar size="lg">
                  <AvatarImage src={getUserImage(counterpart)} alt={name} />
                  <AvatarFallback>{getInitials(name)}</AvatarFallback>
                </Avatar>

                <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <span className="flex items-baseline justify-between gap-2">
                    <span className="truncate font-bold">{name}</span>
                    <time
                      dateTime={timestamp}
                      className="shrink-0 text-sm text-muted-foreground"
                    >
                      {formatRelativeShort(timestamp)}
                    </time>
                  </span>

                  <span className="flex items-center justify-between gap-2">
                    <span
                      className={`truncate ${
                        unread > 0
                          ? "font-semibold text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      {lastMessage
                        ? `${isMine ? "You: " : ""}${getMessagePreview(lastMessage)}`
                        : thread.subject || "No messages yet"}
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
      <div className="flex flex-col gap-4 px-4 pt-4 pb-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex-1 flex h-11 items-center gap-1 rounded-full bg-muted pr-1.5 pl-4 text-muted-foreground focus-within:ring-3 focus-within:ring-ring/50">
            <Search className="size-4 shrink-0" />
            <InputGroupInput
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search"
              aria-label="Search conversations"
            />
            {search && (
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label="Clear search"
                onClick={() => onSearchChange("")}
              >
                <X />
              </Button>
            )}
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger
              render={<Button variant="outline" />}
              className="h-11"
            >
              {FILTER_LABELS[filter]}
              <ChevronDown />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuRadioGroup
                value={filter}
                onValueChange={(value) => onFilterChange(value as ThreadFilter)}
              >
                <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="unread">
                  Unread
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
        {renderBody()}
      </div>
    </>
  );
};

export default ThreadList;
