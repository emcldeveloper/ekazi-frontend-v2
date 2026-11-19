import { useMemo, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  BriefcaseBusiness,
  CheckCheck,
  CircleCheck,
  Clock3,
  Inbox,
  MessageCircle,
  MoreHorizontal,
  Paperclip,
  Search,
  Send,
  ShieldCheck,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const JOBS_ROUTE = "/app/jobs";

type Message = {
  id: number;
  content: string;
  sender: "me" | "other";
  time: string;
  date: string;
  status?: "sent" | "read";
};

type Conversation = {
  id: number;
  name: string;
  avatar?: string;
  initials: string;
  role: string;
  company: string;
  jobTitle: string;
  online: boolean;
  unread: number;
  updatedAt: string;
  messages: Message[];
};

const initialConversations: Conversation[] = [];

const getLastMessage = (conversation: Conversation) =>
  conversation.messages[conversation.messages.length - 1];

const getCurrentTime = () =>
  new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

const MessagesPage = () => {
  const [conversations, setConversations] = useState(initialConversations);
  const [activeId, setActiveId] = useState<number | null>(1);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [showMobileChat, setShowMobileChat] = useState(false);

  const activeConversation = conversations.find(
    (conversation) => conversation.id === activeId,
  );

  const unreadCount = conversations.reduce(
    (total, conversation) => total + conversation.unread,
    0,
  );

  const filteredConversations = useMemo(() => {
    const query = search.trim().toLowerCase();

    return conversations.filter((conversation) =>
      [
        conversation.name,
        conversation.company,
        conversation.jobTitle,
        getLastMessage(conversation)?.content,
      ]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(query)),
    );
  }, [conversations, search]);

  const selectConversation = (id: number) => {
    setActiveId(id);
    setShowMobileChat(true);
    setMessage("");

    setConversations((prev) =>
      prev.map((conversation) =>
        conversation.id === id ? { ...conversation, unread: 0 } : conversation,
      ),
    );
  };

  const sendMessage = (event?: FormEvent) => {
    event?.preventDefault();

    const content = message.trim();

    if (!content || activeId === null) return;

    const newMessage: Message = {
      id: Date.now(),
      content,
      sender: "me",
      time: getCurrentTime(),
      date: "Today",
      status: "sent",
    };

    setConversations((prev) =>
      prev.map((conversation) =>
        conversation.id === activeId
          ? {
              ...conversation,
              updatedAt: newMessage.time,
              messages: [...conversation.messages, newMessage],
            }
          : conversation,
      ),
    );

    setMessage("");
  };

  return (
    <div className="space-y-5">
      {/* Page heading */}
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
          <Badge
            variant="secondary"
            className="gap-1.5 rounded-full px-3 py-1.5 font-medium"
          >
            <MessageCircle className="size-3.5" />
            {conversations.length} Conversations
          </Badge>

          {unreadCount > 0 && (
            <Badge className="rounded-full bg-Blue text-white">
              {unreadCount} unread
            </Badge>
          )}
        </div>
      </header>

      {/* Main messaging interface */}
      <Card className="overflow-hidden rounded-2xl border bg-background p-0 shadow-sm">
        <div className="flex h-[min(740px,calc(100dvh-190px))] min-h-[480px]">
          {/* LEFT: Conversations */}
          <aside
            className={`w-full shrink-0 flex-col border-r bg-background md:flex md:w-[320px] lg:w-[360px] ${
              showMobileChat ? "hidden" : "flex"
            }`}
          >
            <div className="space-y-4 border-b p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-semibold text-foreground">Inbox</h2>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Your recent conversations
                  </p>
                </div>

                <span className="flex size-8 items-center justify-center rounded-lg bg-Blue/10 text-Blue">
                  <Inbox className="size-4" />
                </span>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search messages..."
                  className="h-10 rounded-xl bg-muted/40 pl-9 pr-9"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    aria-label="Clear search"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  >
                    <X className="size-4" />
                  </button>
                )}
              </div>
            </div>

            <ScrollArea className="min-h-0 flex-1">
              {filteredConversations.length > 0 ? (
                <div className="py-2">
                  {filteredConversations.map((conversation) => {
                    const lastMessage = getLastMessage(conversation);
                    const isActive = activeId === conversation.id;

                    return (
                      <button
                        key={conversation.id}
                        type="button"
                        onClick={() => selectConversation(conversation.id)}
                        className={`relative flex w-full gap-3 border-b border-border/40 px-4 py-4 text-left transition-colors hover:bg-muted/50 ${
                          isActive ? "bg-Blue/5" : "bg-transparent"
                        }`}
                      >
                        {isActive && (
                          <span className="absolute inset-y-0 left-0 w-[3px] rounded-r bg-Blue" />
                        )}

                        <div className="relative shrink-0">
                          <Avatar className="size-11 border">
                            <AvatarImage
                              src={conversation.avatar}
                              alt={conversation.name}
                            />
                            <AvatarFallback className="bg-Blue/10 text-xs font-semibold text-Blue">
                              {conversation.initials}
                            </AvatarFallback>
                          </Avatar>

                          {conversation.online && (
                            <span className="absolute bottom-0 right-0 size-3 rounded-full border-2 border-background bg-emerald-500" />
                          )}
                        </div>

                        <div className="min-w-0 flex-1 space-y-1">
                          <div className="flex items-center justify-between gap-2">
                            <p
                              className={`truncate text-sm ${
                                conversation.unread > 0
                                  ? "font-bold"
                                  : "font-semibold"
                              }`}
                            >
                              {conversation.name}
                            </p>
                            <span className="shrink-0 text-[10px] text-muted-foreground">
                              {conversation.updatedAt}
                            </span>
                          </div>

                          <p className="truncate text-xs font-medium text-Blue">
                            {conversation.company}
                          </p>

                          <div className="flex items-center justify-between gap-2">
                            <p
                              className={`truncate text-xs ${
                                conversation.unread > 0
                                  ? "font-semibold text-foreground"
                                  : "text-muted-foreground"
                              }`}
                            >
                              {lastMessage?.sender === "me" && "You: "}
                              {lastMessage?.content}
                            </p>

                            {conversation.unread > 0 && (
                              <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-Blue text-[10px] font-semibold text-white">
                                {conversation.unread}
                              </span>
                            )}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col items-center px-6 py-16 text-center">
                  <Search className="mb-3 size-8 text-muted-foreground/50" />
                  <h3 className="text-sm font-semibold">
                    No conversations found
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Try searching for another name or company.
                  </p>
                </div>
              )}
            </ScrollArea>

            <div className="border-t bg-muted/20 p-3 text-center">
              <p className="text-xs text-muted-foreground">
                Your conversations with recruiters are private.
              </p>
            </div>
          </aside>

          {/* RIGHT: Chat */}
          <section
            className={`min-w-0 flex-1 flex-col ${
              showMobileChat ? "flex" : "hidden md:flex"
            }`}
          >
            {activeConversation ? (
              <>
                {/* Chat header */}
                <div className="flex min-h-[76px] items-center justify-between gap-3 border-b px-4 py-3 sm:px-5">
                  <div className="flex min-w-0 items-center gap-3">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="shrink-0 md:hidden"
                      onClick={() => setShowMobileChat(false)}
                    >
                      <ArrowLeft className="size-5" />
                    </Button>

                    <div className="relative shrink-0">
                      <Avatar className="size-11 border">
                        <AvatarImage
                          src={activeConversation.avatar}
                          alt={activeConversation.name}
                        />
                        <AvatarFallback className="bg-Blue/10 text-sm font-semibold text-Blue">
                          {activeConversation.initials}
                        </AvatarFallback>
                      </Avatar>
                      {activeConversation.online && (
                        <span className="absolute bottom-0 right-0 size-3 rounded-full border-2 border-background bg-emerald-500" />
                      )}
                    </div>

                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-bold text-foreground sm:text-base">
                        {activeConversation.name}
                      </h3>
                      <p className="truncate text-xs text-muted-foreground">
                        {activeConversation.role} · {activeConversation.company}
                      </p>
                      <p
                        className={`mt-0.5 text-[11px] ${
                          activeConversation.online
                            ? "text-emerald-600"
                            : "text-muted-foreground"
                        }`}
                      >
                        {activeConversation.online ? "● Online" : "Offline"}
                      </p>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="shrink-0"
                    aria-label="More conversation options"
                    disabled
                  >
                    <MoreHorizontal className="size-5" />
                  </Button>
                </div>

                {/* Job context */}
                <div className="flex items-center justify-between gap-3 border-b bg-muted/20 px-4 py-3 sm:px-5">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-xl border bg-background text-Blue">
                      <BriefcaseBusiness className="size-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-xs font-semibold sm:text-sm">
                        {activeConversation.jobTitle}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {activeConversation.company}
                      </p>
                    </div>
                  </div>

                  <Badge
                    variant="outline"
                    className="shrink-0 gap-1 border-emerald-200 bg-emerald-50 text-[10px] text-emerald-700"
                  >
                    <CircleCheck className="size-3" />
                    Applied
                  </Badge>
                </div>

                {/* Messages */}
                <ScrollArea className="min-h-0 flex-1 bg-muted/10">
                  <div className="space-y-5 px-4 py-6 sm:px-6">
                    <div className="flex justify-center">
                      <span className="rounded-full border bg-background px-3 py-1 text-[11px] text-muted-foreground">
                        Conversation started
                      </span>
                    </div>

                    {activeConversation.messages.map((chatMessage, index) => {
                      const isMine = chatMessage.sender === "me";
                      const previousMessage =
                        activeConversation.messages[index - 1];

                      const showDate =
                        !previousMessage ||
                        previousMessage.date !== chatMessage.date;

                      return (
                        <div key={chatMessage.id}>
                          {showDate && (
                            <div className="my-5 flex items-center gap-4">
                              <Separator className="flex-1" />
                              <span className="shrink-0 text-[11px] font-medium text-muted-foreground">
                                {chatMessage.date}
                              </span>
                              <Separator className="flex-1" />
                            </div>
                          )}

                          <div
                            className={`flex items-end gap-2 ${
                              isMine ? "justify-end" : "justify-start"
                            }`}
                          >
                            {!isMine && (
                              <Avatar className="size-7 shrink-0">
                                <AvatarFallback className="bg-Blue/10 text-[9px] font-semibold text-Blue">
                                  {activeConversation.initials}
                                </AvatarFallback>
                              </Avatar>
                            )}

                            <div
                              className={`flex max-w-[85%] flex-col gap-1 sm:max-w-[75%] ${
                                isMine ? "items-end" : "items-start"
                              }`}
                            >
                              <div
                                className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                                  isMine
                                    ? "rounded-br-sm bg-Blue text-white"
                                    : "rounded-bl-sm border bg-background text-foreground shadow-xs"
                                }`}
                              >
                                <p className="whitespace-pre-wrap break-words">
                                  {chatMessage.content}
                                </p>
                              </div>

                              <div className="flex items-center gap-1.5 px-1 text-[10px] text-muted-foreground">
                                <span>{chatMessage.time}</span>
                                {isMine &&
                                  (chatMessage.status === "read" ? (
                                    <CheckCheck className="size-3.5 text-Blue" />
                                  ) : (
                                    <Clock3 className="size-3" />
                                  ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </ScrollArea>

                {/* Message composer */}
                <div className="border-t bg-background p-3 sm:p-4">
                  <form onSubmit={sendMessage}>
                    <div className="rounded-2xl border bg-muted/20 p-2 transition-colors focus-within:border-Blue/40">
                      <Textarea
                        value={message}
                        onChange={(event) => setMessage(event.target.value)}
                        onKeyDown={(event) => {
                          if (
                            event.key === "Enter" &&
                            !event.shiftKey &&
                            !event.nativeEvent.isComposing
                          ) {
                            event.preventDefault();
                            sendMessage();
                          }
                        }}
                        placeholder="Type your message..."
                        rows={2}
                        className="min-h-16 resize-none border-0 bg-transparent shadow-none focus-visible:ring-0"
                      />

                      <div className="flex items-center justify-between gap-3 px-1 pb-1">
                        <div className="flex items-center gap-2">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="size-8 text-muted-foreground"
                            disabled
                            aria-label="Attach file"
                          >
                            <Paperclip className="size-4" />
                          </Button>
                          <span className="hidden text-[11px] text-muted-foreground sm:inline">
                            Enter to send · Shift + Enter for new line
                          </span>
                        </div>

                        <Button
                          type="submit"
                          size="sm"
                          disabled={!message.trim()}
                          className="gap-2 rounded-xl bg-Blue px-4 text-white hover:bg-Blue/90"
                        >
                          Send
                          <Send className="size-3.5" />
                        </Button>
                      </div>
                    </div>
                  </form>

                  <p className="mt-2 flex items-center justify-center gap-1.5 text-center text-[10px] text-muted-foreground">
                    <ShieldCheck className="size-3" />
                    Never share passwords or payment details in chat.
                  </p>
                </div>
              </>
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-4 p-6 text-center">
                <div className="flex size-16 items-center justify-center rounded-2xl bg-Blue/10 text-Blue">
                  <MessageCircle className="size-8" />
                </div>
                <div>
                  <h3 className="font-bold">Select a conversation</h3>
                  <p className="mt-1 max-w-xs text-sm text-muted-foreground">
                    Choose a conversation from your inbox to start messaging.
                  </p>
                </div>
                <Button variant="outline">
                  <Link to={JOBS_ROUTE}>
                    <Search className="size-4" />
                    Explore jobs
                  </Link>
                </Button>
              </div>
            )}
          </section>
        </div>
      </Card>
    </div>
  );
};

export default MessagesPage;
