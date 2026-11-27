import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { MessageCircle, Search } from "lucide-react";

import type { CorrespondenceThread } from "@/@types/correspondences";
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

import ThreadList, { type ThreadFilter } from "./components/ThreadList";
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
  const [filter, setFilter] = useState<ThreadFilter>("all");

  const { data: user } = useUser();
  const currentUserId: number | undefined = user?.id;

  const { data, isLoading, isError, refetch } = useThreads();

  const threads = useMemo(
    () => sortThreads(toList<CorrespondenceThread>(data)),
    [data],
  );

  const threadParam = Number(searchParams.get("thread"));
  const activeId =
    Number.isFinite(threadParam) && threadParam > 0 ? threadParam : null;
  const activeThread = threads.find((thread) => thread.id === activeId);

  const filteredThreads = useMemo(() => {
    const query = search.trim().toLowerCase();
    const visible =
      filter === "unread"
        ? threads.filter((thread) => (thread.unread_count ?? 0) > 0)
        : threads;
    if (!query) return visible;

    return visible.filter((thread) =>
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
  }, [threads, search, filter, currentUserId]);

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
    <div className="space-y-4">
      <h1 className="text-2xl font-bold tracking-tight">Correspondences</h1>

      <div className="flex h-[min(780px,calc(100dvh-140px))] min-h-[480px] overflow-hidden rounded-2xl border border-border bg-background">
        {/* Inbox */}
        <aside
          className={`w-full shrink-0 flex-col border-r border-border md:flex md:w-xs lg:w-[380px] ${
            activeId ? "hidden" : "flex"
          }`}
        >
          <ThreadList
            threads={filteredThreads}
            activeId={activeId}
            currentUserId={currentUserId}
            search={search}
            onSearchChange={setSearch}
            filter={filter}
            onFilterChange={setFilter}
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
