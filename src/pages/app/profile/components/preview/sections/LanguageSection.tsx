import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { capitalizeText } from "@/utils/helpers";
import { Separator } from "@/components/ui/separator";

interface LanguageSectionProps {
  languages: any;
}

const LanguageSection = ({ languages }: LanguageSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="capitalize">Language</CardTitle>
        <Separator />
      </CardHeader>
      <CardContent>
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
            {languages.map((item: any) => (
              <TableRow key={item.id}>
                <TableCell>{capitalizeText(item.language?.name)}</TableCell>
                <TableCell>{capitalizeText(item.read?.name)}</TableCell>
                <TableCell>{capitalizeText(item.write?.name)}</TableCell>
                <TableCell>{capitalizeText(item.speak?.name)}</TableCell>
                <TableCell>{capitalizeText(item.understand?.name)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default LanguageSection;
