import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Settings } from "lucide-react";

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
  /** Persist a single setting change, e.g. call your update mutation. */
  onChange?: (
    key: keyof ProfileSettings,
    value: boolean,
  ) => Promise<void> | void;
};

const ProfileSettingsCard = ({ applicant, onChange }: Props) => {
  const [open, setOpen] = useState(false);
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
      await onChange?.(key, value);
    } catch {
      setSettings((s) => ({ ...s, [key]: previous }));
    } finally {
      setSaving(null);
    }
  };

  return (
    <>
      <Card>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex p-3 items-center justify-center rounded-full bg-Blue/10 text-Blue">
              <Settings className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <p className="font-semibold">Profile settings</p>
              <p className="text-xs text-muted-foreground">
                Control your visibility and notifications.
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => setOpen(true)}
            className="w-full border-Blue font-semibold text-Blue hover:bg-Blue/5 hover:text-Blue"
          >
            Manage settings
          </Button>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
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
    </>
  );
};

export default ProfileSettingsCard;
