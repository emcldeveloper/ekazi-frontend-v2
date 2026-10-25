import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import { Separator } from "@/components/ui/separator";
import AddLanguageModal from "./AddLanguage";
import EditLanguage from "./EditLanguage";
import DeleteLanguage from "./DeleteLanguage";
import SectionTitle from "../SectionTitle";

interface LanguageProps {
  applicant: any;
}

const Language = ({ applicant }: LanguageProps) => {
  const languages = applicant?.profile?.language ?? [];

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <SectionTitle>Languages</SectionTitle>

        <AddLanguageModal />
      </div>

      <Separator />

      {/* Table */}
      {languages.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Language</TableHead>
              <TableHead>Read</TableHead>
              <TableHead>Write</TableHead>
              <TableHead>Speak</TableHead>
              <TableHead>Understand</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {languages.map((language: any) => (
              <TableRow key={language.id}>
                <TableCell>{language.language?.name}</TableCell>
                <TableCell>{language.read?.name}</TableCell>
                <TableCell>{language.write?.name}</TableCell>
                <TableCell>{language.speak?.name}</TableCell>
                <TableCell>{language.understand?.name}</TableCell>
                <TableCell className="text-right space-x-2">
                  <EditLanguage language={language} />
                  <DeleteLanguage languageId={language.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-sm text-muted-foreground">No languages added</div>
      )}
    </div>
  );
};

export default Language;
