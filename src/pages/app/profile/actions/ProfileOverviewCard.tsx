import { CheckCircle2, Sparkles } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import ProfilePreview from "../components/preview/ProfilePreview";
import ProfileSettingsCard from "./Profilesettingscard";

// Types
export type ProfileSettings = {
  is_public: boolean;
  open_to_work: boolean;
  show_contacts: boolean;
  job_alerts: boolean;
};

type Props = {
  applicant: any;
  onChange?: (
    key: keyof ProfileSettings,
    value: boolean,
  ) => Promise<void> | void;
};

// Progress constants
const SIZE = 88;
const STROKE = 8;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const getStatus = (pct: number) => {
  if (pct >= 100)
    return {
      title: "Profile complete",
      text: "Your profile is ready to impress employers.",
    };

  if (pct >= 70)
    return {
      title: "Almost there!",
      text: "Add a few more details to stand out.",
    };

  return {
    title: "Keep going!",
    text: "Complete your profile to get noticed.",
  };
};

const ProfileOverviewCard = ({ applicant }: Props) => {
  // Profile completion
  const raw = Number(applicant?.profile_completion?.total_percentage ?? 0);

  const percentage = Math.min(
    100,
    Math.max(0, Math.round(Number.isFinite(raw) ? raw : 0)),
  );

  const offset = CIRCUMFERENCE - (percentage / 100) * CIRCUMFERENCE;

  const isComplete = percentage >= 100;
  const status = getStatus(percentage);

  return (
    <>
      <Card size="sm">
        <CardContent className="space-y-4">
          {/* ===== HEADER ===== */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold tracking-tight">
                Profile overview
              </h3>
            </div>

            <div className="flex size-9 items-center justify-center rounded-xl bg-Blue/10 text-Blue">
              <Sparkles className="size-4" />
            </div>
          </div>

          <Separator />

          {/* ===== PROFILE COMPLETION ===== */}
          <div>
            <div className="flex items-center gap-4">
              {/* Circular progress */}
              <div
                className="relative shrink-0"
                style={{ width: SIZE, height: SIZE }}
              >
                <svg width={SIZE} height={SIZE} className="-rotate-90">
                  <circle
                    cx={SIZE / 2}
                    cy={SIZE / 2}
                    r={RADIUS}
                    strokeWidth={STROKE}
                    fill="none"
                    className="stroke-muted"
                  />

                  <circle
                    cx={SIZE / 2}
                    cy={SIZE / 2}
                    r={RADIUS}
                    strokeWidth={STROKE}
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={CIRCUMFERENCE}
                    strokeDashoffset={offset}
                    className={`transition-[stroke-dashoffset] duration-700 ease-out ${
                      isComplete ? "stroke-Blue" : "stroke-Orange"
                    }`}
                  />
                </svg>

                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold tabular-nums">
                    {percentage}%
                  </span>
                </div>
              </div>

              {/* Completion message */}
              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex items-center gap-1.5">
                  {isComplete && (
                    <CheckCircle2 className="size-4 shrink-0 text-Blue" />
                  )}

                  <p className="text-sm font-semibold">{status.title}</p>
                </div>

                <p className="text-xs leading-relaxed text-muted-foreground">
                  {status.text}
                </p>
              </div>
            </div>

            {!isComplete && (
              <div className="mt-4 rounded-lg bg-Blue/5 px-3 py-2.5">
                <div className="flex items-start gap-2">
                  <Sparkles className="mt-0.5 size-3.5 shrink-0 text-Blue" />
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    A complete profile helps employers understand your skills
                    and experience.
                  </p>
                </div>
              </div>
            )}
          </div>

          <Separator />

          <ProfilePreview applicant={applicant} />

          <ProfileSettingsCard applicant={applicant} />
        </CardContent>
      </Card>
    </>
  );
};

export default ProfileOverviewCard;
