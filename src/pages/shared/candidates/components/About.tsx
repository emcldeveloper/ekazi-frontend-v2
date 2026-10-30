import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface AboutProps {
  candidate: any;
}

const About = ({ candidate }: AboutProps) => {
  const careerText = candidate.career_summary;
  const objectiveText = candidate.objective;

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-Blue text-lg">About</CardTitle>
          <Separator />
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            {careerText ? (
              <p className="whitespace-pre-wrap wrap-break-words text-sm leading-relaxed">
                {careerText}
              </p>
            ) : (
              <p className="text-muted-foreground text-sm">
                No career information provided.
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-Blue text-lg">Career Objectives</CardTitle>
          <Separator />
        </CardHeader>
        <CardContent>
          <div>
            {objectiveText ? (
              <p className="whitespace-pre-wrap wrap-break-words text-sm leading-relaxed">
                {objectiveText}
              </p>
            ) : (
              <p className="text-muted-foreground text-sm">
                No career objective provided.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default About;
