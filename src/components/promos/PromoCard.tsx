import { useState, type ReactNode } from "react";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface PromoCardProps {
  title: string;
  description?: string;
  icon?: ReactNode;

  // Appearance
  backgroundColor?: string;
  className?: string;

  // Action button
  buttonText?: string;
  onButtonClick?: () => void;
  buttonClassName?: string;

  // Dismiss
  dismissible?: boolean;
  onDismiss?: () => void;

  // Additional content
  children?: ReactNode;
}

export default function PromoCard({
  title,
  description,
  icon,
  backgroundColor = "#C4F2E1",
  className,
  buttonText,
  onButtonClick,
  buttonClassName,
  dismissible = true,
  onDismiss,
  children,
}: PromoCardProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  return (
    <Card
      style={{ backgroundColor }}
      className={cn(
        "relative w-full overflow-hidden rounded-xl border-0 py-0 shadow-none",
        className,
      )}
    >
      <CardContent className="space-y-4 px-3.5 py-4">
        {/* Dismiss button */}
        {dismissible && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleDismiss}
            aria-label="Dismiss promotion"
            className="absolute top-3 right-3 size-6 rounded-full text-slate-600 hover:bg-black/5"
          >
            <X className="size-4" />
          </Button>
        )}

        {/* Content */}
        <div className={cn("space-y-1", dismissible && "pr-6")}>
          <div className="flex items-center gap-2">
            <h3 className="text-[20px] leading-7 font-bold tracking-tight text-[#0F1419]">
              {title}
            </h3>

            {icon && <span className="shrink-0">{icon}</span>}
          </div>

          {description && (
            <p className="text-[14px] leading-5 text-[#536471]">
              {description}
            </p>
          )}
        </div>

        {/* Custom content */}
        {children}

        {/* Optional action button */}
        {buttonText && (
          <Button
            type="button"
            onClick={onButtonClick}
            className={cn(
              "h-9 rounded-full bg-[#0F1419] px-4 text-sm font-bold text-white hover:bg-[#272C30]",
              buttonClassName,
            )}
          >
            {buttonText}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
