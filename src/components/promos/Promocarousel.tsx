import { useCallback, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Pause, Play, X } from "lucide-react";

export type PromoSlide = {
  id: string;
  eyebrow: string;
  title: string;
  cta: { label: string; href?: string; onClick?: () => void };
  /** Background classes for this slide, e.g. "bg-Blue". */
  className?: string;
  illustration?: ReactNode;
};

type Props = {
  slides: PromoSlide[];
  /** localStorage key used to remember that the user closed the banner. */
  storageKey?: string;
  /** How long the banner stays hidden after closing. */
  dismissForDays?: number;
  /** Time each slide is shown, in ms. */
  interval?: number;
  className?: string;
};

const DAY = 24 * 60 * 60 * 1000;

const isDismissed = (key: string, days: number) => {
  try {
    const value = Number(localStorage.getItem(key));
    return Boolean(value) && Date.now() - value < days * DAY;
  } catch {
    return false;
  }
};

const prefersReducedMotion = () => {
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
};

const PromoCarousel = ({
  slides,
  storageKey = "promo-carousel-dismissed",
  dismissForDays = 3,
  interval = 6000,
  className,
}: Props) => {
  const [hidden, setHidden] = useState(() =>
    isDismissed(storageKey, dismissForDays),
  );
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(prefersReducedMotion);
  const [hovering, setHovering] = useState(false);

  const count = slides.length;
  const next = useCallback(() => setActive((i) => (i + 1) % count), [count]);

  const dismiss = () => {
    setHidden(true);
    try {
      localStorage.setItem(storageKey, String(Date.now()));
    } catch {
      /* storage unavailable: hide for this visit only */
    }
  };

  if (hidden || count === 0) return null;

  const current = Math.min(active, count - 1);
  const running = !paused && !hovering && count > 1;

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Highlights"
      className={cn(
        "relative overflow-hidden rounded-2xl text-white shadow-sm",
        className,
      )}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocusCapture={() => setHovering(true)}
      onBlurCapture={() => setHovering(false)}
    >
      <style>{`@keyframes promo-progress { from { transform: scaleX(0) } to { transform: scaleX(1) } }`}</style>

      {/* Slides are stacked in one grid cell so the card keeps the height of the tallest slide */}
      <div className="grid">
        {slides.map((slide, i) => {
          const isActive = i === current;
          const ctaClass =
            "bg-white text-sm font-semibold text-gray-900 hover:bg-white/90";
          return (
            <div
              key={slide.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              aria-hidden={!isActive}
              className={cn(
                "col-start-1 row-start-1 transition-opacity duration-500 ease-out",
                "bg-Blue px-6 pb-16 pt-8 sm:px-10 sm:pt-10",
                slide.className,
                isActive ? "opacity-100" : "pointer-events-none opacity-0",
              )}
            >
              <div className="flex items-center gap-8">
                <div className="flex-1 space-y-3 pr-8 md:pr-0">
                  <p className="text-sm font-medium text-white/85 sm:text-base">
                    {slide.eyebrow}
                  </p>
                  <h2 className="max-w-xl text-xl font-semibold leading-snug md:text-2xl">
                    {slide.title}
                  </h2>
                  <div className="pt-3">
                    {slide.cta.href ? (
                      <Button className={ctaClass} tabIndex={isActive ? 0 : -1}>
                        <a href={slide.cta.href}>{slide.cta.label}</a>
                      </Button>
                    ) : (
                      <Button
                        onClick={slide.cta.onClick}
                        className={ctaClass}
                        tabIndex={isActive ? 0 : -1}
                      >
                        {slide.cta.label}
                      </Button>
                    )}
                  </div>
                </div>
                {slide.illustration && (
                  <div className="hidden shrink-0 md:block" aria-hidden>
                    {slide.illustration}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={dismiss}
        aria-label="Close"
        className="absolute right-3 top-3 z-10 h-9 w-9 rounded-full text-white hover:bg-white/15 hover:text-white"
      >
        <X className="h-5 w-5" />
      </Button>

      {count > 1 && (
        <div className="absolute inset-x-0 bottom-5 z-10 flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? "Play" : "Pause"}
            className="flex h-6 w-6 items-center justify-center rounded-full border border-white/70 text-white transition-colors hover:bg-white/15"
          >
            {paused ? (
              <Play className="h-3 w-3 fill-current" />
            ) : (
              <Pause className="h-3 w-3 fill-current" />
            )}
          </button>

          {slides.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === current}
              className="group py-2"
            >
              <span className="block h-1 w-12 overflow-hidden rounded-full bg-white/35 transition-colors group-hover:bg-white/50">
                {i === current && (
                  <span
                    key={`${current}-${slide.id}`}
                    onAnimationEnd={next}
                    className="block h-full w-full origin-left rounded-full bg-white"
                    style={{
                      animation: `promo-progress ${interval}ms linear forwards`,
                      animationPlayState: running ? "running" : "paused",
                    }}
                  />
                )}
              </span>
            </button>
          ))}
        </div>
      )}
    </section>
  );
};

export default PromoCarousel;
