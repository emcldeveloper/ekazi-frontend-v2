import { Card, CardContent } from "@/components/ui/card";

type Props = {
  applicant: any;
};

const SIZE = 80;
const STROKE = 10;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const getStatus = (pct: number) => {
  if (pct >= 100)
    return {
      title: "Profile complete",
      text: "Employers can see your full profile.",
    };
  if (pct >= 70)
    return {
      title: "Almost there",
      text: "A few more details will make you stand out.",
    };
  return {
    title: "Keep going",
    text: "Complete your profile to get noticed by employers.",
  };
};

const ProfileCompletionCard = ({ applicant }: Props) => {
  const raw = Number(applicant?.profile_completion?.total_percentage ?? 0);
  const percentage = Math.min(100, Math.max(0, Math.round(raw)));
  const offset = CIRCUMFERENCE - (percentage / 100) * CIRCUMFERENCE;
  const isComplete = percentage >= 100;
  const status = getStatus(percentage);

  return (
    <Card>
      <CardContent className="flex  items-center gap-4 text-center">
        <div className="relative" style={{ width: SIZE, height: SIZE }}>
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
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl font-bold tabular-nums">
              {percentage}%
            </span>
          </div>
        </div>

        <div className="space-y-1">
          <p className="font-semibold">{status.title}</p>
          <p className="text-sm text-muted-foreground">{status.text}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCompletionCard;
