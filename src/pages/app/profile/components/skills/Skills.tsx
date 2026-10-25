import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import AddSkillsModal from "./AddSkillsModal";
import SectionTitle from "../SectionTitle";

interface SkillsProps {
  applicant: any;
}

const Skills = ({ applicant }: SkillsProps) => {
  const skills = applicant?.profile?.knowledge ?? [];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-0">
        <SectionTitle>Key Skills & Competencies</SectionTitle>

        <AddSkillsModal skills={skills} />
      </div>

      <Separator />

      <div>
        {skills.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill: any) => (
              <Badge key={skill.id} variant="secondary">
                {skill.knowledge?.name}
              </Badge>
            ))}
          </div>
        ) : (
          <p className="py-4 text-sm text-muted-foreground">
            No skills added yet
          </p>
        )}
      </div>
    </div>
  );
};

export default Skills;
