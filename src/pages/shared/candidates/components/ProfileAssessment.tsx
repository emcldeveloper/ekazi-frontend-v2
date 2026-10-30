import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface ProfileAssessmentProps {
  candidate: any;
}

const ProfileAssessment = ({ candidate }: ProfileAssessmentProps) => {
  const featured_views = candidate?.view_number;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-Blue text-lg">Profile Assessment</CardTitle>
        <Separator />
      </CardHeader>

      <CardContent>
        <div className="flex items-center justify-between gap-4">
          {/* Views */}
          <div className="flex items-center gap-2 text-primary">
            <Eye size={16} className="text-Orange" />
            <span className="text-sm">{featured_views} Views</span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            {/* <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" /> */}
            {/* <span className="text-sm text-foreground">{ratings}</span> */}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileAssessment;
