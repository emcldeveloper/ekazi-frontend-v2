import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { FileText, Plus, SendHorizontal, X } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { InputGroupInput } from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";
import { useSendMessage } from "@/hooks/correspondences";
import { getErrorMessage } from "@/utils/axios-helpers";

import { formatFileSize } from "../utils";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const ACCEPTED_FILES =
  ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv,.png,.jpg,.jpeg";

type MessageComposerProps = {
  threadId: number;
};

const MessageComposer = ({ threadId }: MessageComposerProps) => {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate: sendMessage, isPending } = useSendMessage();

  const content = message.trim();
  const canSend = (!!content || !!file) && !isPending;

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0];
    // Reset so picking the same file again still fires onChange.
    event.target.value = "";
    if (!selected) return;

    if (selected.size > MAX_FILE_SIZE) {
      toast.error(`${selected.name} is larger than 10 MB.`);
      return;
    }

    // Only one file per message: a new pick replaces the current one.
    setFile(selected);
  };

  const handleSubmit = (event?: FormEvent) => {
    event?.preventDefault();
    if (!canSend) return;

    sendMessage(
      {
        thread_id: threadId,
        message: content,
        category: "general",
        attachment: file ?? undefined,
      },
      {
        onSuccess: () => {
          setMessage("");
          setFile(null);
        },
        onError: (error) => toast.error(getErrorMessage(error)),
      },
    );
  };

  return (
    <div className="flex flex-col gap-2 px-4 pt-2 pb-4 sm:px-5">
      {file && (
        <div className="flex w-fit max-w-full items-center gap-2 rounded-2xl border border-border bg-background py-1.5 pr-1 pl-3 sm:max-w-80">
          <FileText className="size-4 shrink-0 text-muted-foreground" />
          <span className="flex min-w-0 flex-col">
            <span className="truncate text-sm font-medium">{file.name}</span>
            <span className="text-xs text-muted-foreground">
              {formatFileSize(file.size)}
            </span>
          </span>
          <Button
            variant="ghost"
            size="icon-xs"
            aria-label={`Remove ${file.name}`}
            disabled={isPending}
            onClick={() => setFile(null)}
          >
            <X />
          </Button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          ref={fileInputRef}
          type="file"
          accept={ACCEPTED_FILES}
          onChange={handleFileChange}
          className="hidden"
          tabIndex={-1}
          aria-hidden
        />
        <Button
          variant="secondary"
          size="icon-lg"
          aria-label={file ? "Replace attachment" : "Attach a document"}
          disabled={isPending}
          onClick={() => fileInputRef.current?.click()}
        >
          <Plus />
        </Button>

        <div className="flex h-12 min-w-0 flex-1 items-center gap-2 rounded-full bg-muted pr-1.5 pl-3 focus-within:ring-3 focus-within:ring-ring/50">
          <InputGroupInput
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Message"
            aria-label="Message"
            autoComplete="off"
            disabled={isPending}
          />
          <Button
            type="submit"
            size="icon"
            aria-label="Send message"
            disabled={!canSend}
          >
            {isPending ? <Spinner /> : <SendHorizontal />}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MessageComposer;
