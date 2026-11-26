import { useState, type FormEvent } from "react";
import { Send, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";
import { useSendMessage } from "@/hooks/correspondences";
import { getErrorMessage } from "@/utils/axios-helpers";

type MessageComposerProps = {
  threadId: number;
};

const MessageComposer = ({ threadId }: MessageComposerProps) => {
  const [message, setMessage] = useState("");
  const { mutate: sendMessage, isPending } = useSendMessage();

  const content = message.trim();

  const handleSubmit = (event?: FormEvent) => {
    event?.preventDefault();
    if (!content || isPending) return;

    sendMessage(
      { thread_id: threadId, message: content, category: "general" },
      {
        onSuccess: () => setMessage(""),
        onError: (error) => toast.error(getErrorMessage(error)),
      },
    );
  };

  return (
    <div className="border-t border-border bg-background p-3 sm:p-4">
      <form onSubmit={handleSubmit}>
        <InputGroup>
          <InputGroupTextarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            onKeyDown={(event) => {
              if (
                event.key === "Enter" &&
                !event.shiftKey &&
                !event.nativeEvent.isComposing
              ) {
                event.preventDefault();
                handleSubmit();
              }
            }}
            placeholder="Type your message..."
            aria-label="Message"
            rows={2}
            disabled={isPending}
          />
          <InputGroupAddon align="block-end">
            <InputGroupText>
              <span className="hidden sm:inline">
                Enter to send · Shift + Enter for new line
              </span>
            </InputGroupText>
            <span className="ml-auto">
              <InputGroupButton
                type="submit"
                variant="default"
                size="sm"
                disabled={!content || isPending}
              >
                {isPending ? <Spinner /> : <Send />}
                Send
              </InputGroupButton>
            </span>
          </InputGroupAddon>
        </InputGroup>
      </form>

      <p className="mt-2 flex items-center justify-center gap-1.5 text-center text-[10px] text-muted-foreground">
        <ShieldCheck className="size-3" />
        Never share passwords or payment details in chat.
      </p>
    </div>
  );
};

export default MessageComposer;
