import { Eye, Globe } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import ProfilePreview from "../components/preview/ProfilePreview";

type Props = {
  applicant: any;
};

const PublicProfileCard = ({ applicant }: Props) => {
  return (
    <Card className="relative overflow-hidden border-0 bg-linear-to-br from-Blue to-Blue/80 text-white">
      <Globe className="pointer-events-none absolute -right-4 -top-4 h-24 w-24 opacity-15" />
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex p-3 items-center justify-center rounded-full bg-white/20">
            <Eye className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <p className="font-semibold">Public profile</p>
            <p className="text-xs text-white/85">
              See your profile exactly as employers see it.
            </p>
          </div>
        </div>
        <ProfilePreview applicant={applicant} />
      </CardContent>
    </Card>
  );
};

export default PublicProfileCard;
