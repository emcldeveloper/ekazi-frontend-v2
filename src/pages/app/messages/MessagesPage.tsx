import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { MessageCircle, Search } from "lucide-react";

import type { CorrespondenceThread } from "@/@types/correspondences";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { useUser } from "@/hooks/auth";
import { useThreads } from "@/hooks/correspondences";

import ThreadList from "./components/ThreadList";
import ThreadView from "./components/ThreadView";
import {
  getCompanyName,
  getCounterpart,
  getJobTitle,
  getLastMessage,
  getMessageText,
  getUserName,
  sortThreads,
  toList,
} from "./utils";

const JOBS_ROUTE = "/app/jobs";

const MessagesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");

  const { data: user } = useUser();
  const currentUserId: number | undefined = user?.id;

  const { data, isLoading, isError, refetch } = useThreads();

  const threads = useMemo(
    () => sortThreads(toList<CorrespondenceThread>(data)),
    [data],
  );

  const threadParam = Number(searchParams.get("thread"));
  const activeId = Number.isFinite(threadParam) && threadParam > 0
    ? threadParam
    : null;
  const activeThread = threads.find((thread) => thread.id === activeId);

  const unreadCount = threads.reduce(
    (total, thread) => total + (thread.unread_count ?? 0),
    0,
  );

  const filteredThreads = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return threads;

    return threads.filter((thread) =>
      [
        thread.subject,
        getUserName(getCounterpart(thread, currentUserId)),
        getJobTitle(thread),
        getCompanyName(thread),
        getMessageText(getLastMessage(thread)),
      ]
        .filter(Boolean)
        .some((value) => value!.toLowerCase().includes(query)),
    );
  }, [threads, search, currentUserId]);

  const selectThread = (id: number | null) => {
    setSearchParams(
      (params) => {
        if (id === null) params.delete("thread");
        else params.set("thread", String(id));
        return params;
      },
      { replace: true },
    );
  };

  return (
    <div className="flex flex-col gap-5">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-Blue">
            Messages
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Stay connected with recruiters and manage your job conversations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="secondary">
            <MessageCircle />
            {threads.length} Conversations
          </Badge>
          {unreadCount > 0 && <Badge>{unreadCount} unread</Badge>}
        </div>
      </header>

      <div className="flex h-[min(740px,calc(100dvh-190px))] min-h-[480px] overflow-hidden rounded-2xl border border-border bg-background shadow-sm">
        {/* Inbox */}
        <aside
          className={`w-full shrink-0 flex-col border-r border-border md:flex md:w-[320px] lg:w-[360px] ${
            activeId ? "hidden" : "flex"
          }`}
        >
          <ThreadList
            threads={filteredThreads}
            activeId={activeId}
            currentUserId={currentUserId}
            search={search}
            onSearchChange={setSearch}
            onSelect={selectThread}
            isLoading={isLoading}
            isError={isError}
            onRetry={() => refetch()}
            hasAnyThreads={threads.length > 0}
          />
        </aside>

        {/* Conversation */}
        <section
          className={`min-w-0 flex-1 flex-col ${
            activeId ? "flex" : "hidden md:flex"
          }`}
        >
          {activeId ? (
            <ThreadView
              key={activeId}
              threadId={activeId}
              fallbackThread={activeThread}
              currentUserId={currentUserId}
              onBack={() => selectThread(null)}
            />
          ) : (
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <MessageCircle />
                </EmptyMedia>
                <EmptyTitle>Select a conversation</EmptyTitle>
                <EmptyDescription>
                  Choose a conversation from your inbox to start messaging.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Button
                  variant="outline"
                  nativeButton={false}
                  render={<Link to={JOBS_ROUTE} />}
                >
                  <Search />
                  Explore jobs
                </Button>
              </EmptyContent>
            </Empty>
          )}
        </section>
      </div>
    </div>
  );
};

export default MessagesPage;
