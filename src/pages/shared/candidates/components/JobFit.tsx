import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface JobFitProps {
  candidate: any;
}

const JobFit = ({ candidate }: JobFitProps) => {
  const applicant_tag = candidate?.applicant_tags || [];

  if (applicant_tag.length === 0) {
    return null;
  }

  // SAFELY GROUP TAGS BY INDUSTRY
  const grouped = applicant_tag.reduce((acc: any, tag: any) => {
    const industryName =
      tag?.industry?.industry_name?.trim() || "Unknown Industry";

    if (!acc[industryName]) acc[industryName] = [];

    acc[industryName].push(tag);

    return acc;
  }, {});

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-Blue text-lg">Job You May Fit</CardTitle>
        <Separator />
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-4">
          {Object.entries(grouped).map(
            ([industryName, tags]: [string, any], index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row gap-3 text-sm"
              >
                {/* Industry */}
                <div className="min-w-[150px]">
                  <h6 className="font-semibold">{industryName}:</h6>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag: any, i: any) => (
                    <Badge
                      key={i}
                      variant="outline"
                      className="text-sm capitalize"
                    >
                      {tag.tag_name}
                    </Badge>
                  ))}
                </div>
              </div>
            ),
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default JobFit;
