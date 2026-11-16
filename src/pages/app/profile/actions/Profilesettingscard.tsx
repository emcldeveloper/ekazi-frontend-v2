import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowRight, Crown, Settings, Settings2, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

export type ProfileSettings = {
  is_public: boolean;
  open_to_work: boolean;
  show_contacts: boolean;
  job_alerts: boolean;
};

const OPTIONS: { key: keyof ProfileSettings; label: string; hint: string }[] = [
  {
    key: "is_public",
    label: "Public profile",
    hint: "Employers can find you in search",
  },
  {
    key: "open_to_work",
    label: "Open to work",
    hint: "Show recruiters you're available",
  },
  {
    key: "show_contacts",
    label: "Show contact details",
    hint: "Display phone & email publicly",
  },
  { key: "job_alerts", label: "Job alerts", hint: "Email me matching jobs" },
];

// Adjust to wherever your API returns these values.
const fromApplicant = (a: any): ProfileSettings => ({
  is_public: a?.settings?.is_public ?? true,
  open_to_work: a?.settings?.open_to_work ?? false,
  show_contacts: a?.settings?.show_contacts ?? false,
  job_alerts: a?.settings?.job_alerts ?? true,
});

type Props = {
  applicant: any;
};

const ProfileSettingsCard = ({ applicant }: Props) => {
  const navigate = useNavigate();

  const isFeatured = false;

  const [settings, setSettings] = useState<ProfileSettings>(() =>
    fromApplicant(applicant),
  );
  const [saving, setSaving] = useState<keyof ProfileSettings | null>(null);

  useEffect(() => setSettings(fromApplicant(applicant)), [applicant]);

  const toggle = async (key: keyof ProfileSettings, value: boolean) => {
    const previous = settings[key];
    setSettings((s) => ({ ...s, [key]: value }));
    setSaving(key);
    try {
      //
    } catch {
      setSettings((s) => ({ ...s, [key]: previous }));
    } finally {
      setSaving(null);
    }
  };

  return (
    <>
      {isFeatured ? (
        <Dialog>
          <DialogTrigger
            render={
              <Button onClick={() => {}} className="w-full bg-Blue text-white">
                <Settings2 className="size-5" />
                Manage settings
              </Button>
            }
          />
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-Blue" />
                Profile settings
              </DialogTitle>
              <DialogDescription>
                Changes are saved automatically.
              </DialogDescription>
            </DialogHeader>

            <div className="divide-y">
              {OPTIONS.map(({ key, label, hint }) => (
                <div
                  key={key}
                  className="flex items-center justify-between gap-4 py-3"
                >
                  <div className="space-y-0.5">
                    <Label
                      htmlFor={`setting-${key}`}
                      className="text-sm font-medium"
                    >
                      {label}
                    </Label>
                    <p className="text-xs text-muted-foreground">{hint}</p>
                  </div>
                  <Switch
                    id={`setting-${key}`}
                    checked={settings[key]}
                    disabled={saving === key}
                    onCheckedChange={(v) => toggle(key, v)}
                    className="data-[state=checked]:bg-Blue"
                  />
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      ) : (
        <Dialog>
          <DialogTrigger
            render={
              <Button onClick={() => {}} className="w-full bg-Blue text-white">
                <Settings2 className="size-5" />
                Manage settings
              </Button>
            }
          />
          <DialogContent className="p-0 overflow-hidden sm:max-w-2xl">
            <div className="-mx-4 no-scrollbar max-h-[70vh] overflow-y-auto px-4">
              <div className="h-full flex flex-col md:flex-row">
                {/* Header */}
                <div className="relative overflow-hidden bg-linear-to-br from-Blue to-Blue/85 px-6 pb-8 pt-10 text-center text-white">
                  {/* Decorative elements */}
                  <div className="absolute -right-10 -top-10 size-36 rounded-full bg-white/10" />
                  <div className="absolute -bottom-14 -left-10 size-36 rounded-full bg-white/10" />

                  <div className="relative mx-auto mb-4 flex size-16 items-center justify-center rounded-2xl border border-white/20 bg-white/15">
                    <Crown className="size-8 text-white" />
                  </div>

                  <DialogHeader className="relative text-center">
                    <DialogTitle className="text-center text-xl font-bold text-white">
                      Unlock Profile
                    </DialogTitle>

                    <DialogDescription className="mt-2 text-center text-sm leading-relaxed text-white/85">
                      Upgrade to a Featured Candidate account to unlock more
                      control over your professional profile.
                    </DialogDescription>
                  </DialogHeader>
                </div>
                {/* Benefits */}
                <div className="space-y-5 px-6 pb-6 pt-5">
                  <div className="space-y-4">
                    {[
                      {
                        title: "Control your visibility",
                        description:
                          "Choose whether employers can discover your profile.",
                      },
                      {
                        title: "Show you're open to work",
                        description:
                          "Let recruiters know you're available for opportunities.",
                      },
                      {
                        title: "Manage your privacy",
                        description:
                          "Control which contact details employers can see.",
                      },
                      {
                        title: "Personalize job alerts",
                        description:
                          "Manage notifications about matching opportunities.",
                      },
                    ].map((benefit) => (
                      <div
                        key={benefit.title}
                        className="flex items-start gap-3"
                      >
                        <div className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-Blue/10 text-Blue">
                          <Sparkles className="size-3" />
                        </div>

                        <div className="space-y-0.5">
                          <p className="text-sm font-semibold">
                            {benefit.title}
                          </p>

                          <p className="text-xs leading-relaxed text-muted-foreground">
                            {benefit.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="space-y-3 pt-2">
                    <Button
                      className="w-full bg-Blue font-semibold text-white hover:bg-Blue/90"
                      onClick={() => {
                        navigate("/app/subscription");
                      }}
                    >
                      <Crown className="mr-2 size-4" />
                      Become a Featured Candidate
                      <ArrowRight className="ml-2 size-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default ProfileSettingsCard;
