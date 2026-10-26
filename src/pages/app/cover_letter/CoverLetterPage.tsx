import { useState, type ChangeEvent } from "react";
import { jsPDF } from "jspdf";
import { CheckCircle, Download } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

import PreviewCoverLetter from "./PreviewCoverLetter";

interface CoverLetterFormData {
  firstName: string;
  lastName: string;
  yourAddress: string;
  email: string;
  phone: string;
  date: string;
  hiringManagerName: string;
  position: string;
  companyName: string;
  companyAddress: string;
  letterContent: string;
}

const CoverLetterPage = () => {
  const [formData, setFormData] = useState<CoverLetterFormData>({
    firstName: "",
    lastName: "",
    yourAddress: "",
    email: "",
    phone: "",
    date: "",
    hiringManagerName: "",
    position: "",
    companyName: "",
    companyAddress: "",
    letterContent: "",
  });

  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.position) newErrors.position = "Position is required";
    if (!formData.hiringManagerName)
      newErrors.hiringManagerName = "Hiring manager name is required";
    if (!formData.letterContent)
      newErrors.letterContent = "Letter content is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleDownload = () => {
    if (!validateForm()) {
      return;
    }

    try {
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const marginLeft = 20;
      const marginTop = 20;
      const lineHeight = 10;
      const pageWidth = 210 - marginLeft * 2;
      const pageHeight = 297;

      const positionHeader = `RE: APPLICATION FOR ${formData.position.toUpperCase()} POSITION`;

      const content = `
        ${formData.firstName} ${formData.lastName}
        ${formData.yourAddress}
        ${formData.email}
        ${formData.phone}
        ${formData.date}

        ${formData.hiringManagerName}
        ${formData.companyName}
        ${formData.companyAddress}

        Dear Mr/Mrs ${formData.hiringManagerName},
      `;

      const lines = doc.splitTextToSize(content, pageWidth);

      let cursorY = marginTop;

      doc.setFont("helvetica", "normal");
      lines.forEach((line: string) => {
        if (cursorY + lineHeight > pageHeight - marginTop) {
          doc.addPage();
          cursorY = marginTop;
        }
        doc.text(line, marginLeft, cursorY);
        cursorY += lineHeight;
      });

      cursorY += 2;

      doc.setFont("helvetica", "bold");
      doc.text(positionHeader, marginLeft, cursorY);

      const positionHeaderWidth = doc.getTextWidth(positionHeader);
      doc.line(
        marginLeft,
        cursorY + 1,
        marginLeft + positionHeaderWidth,
        cursorY + 1,
      );

      cursorY += lineHeight + 2;

      doc.setFont("helvetica", "normal");

      const letterContent = `${formData.letterContent}\n\nSincerely,\n${formData.firstName} ${formData.lastName}`;
      const letterLines = doc.splitTextToSize(letterContent, pageWidth);

      letterLines.forEach((line: string) => {
        if (cursorY + lineHeight > pageHeight - marginTop) {
          doc.addPage();
          cursorY = marginTop;
        }
        doc.text(line, marginLeft, cursorY);
        cursorY += lineHeight;
      });

      doc.save("Cover_Letter.pdf");
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-Blue font-semibold">
          Build your cover letter
        </CardTitle>
        <CardDescription>
          Fill in the form to generate your professional cover letter
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {downloadSuccess && (
          <Alert className="mb-4">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              Cover letter downloaded successfully!
            </AlertDescription>
          </Alert>
        )}

        <Accordion defaultValue={["personal"]}>
          {/* Personal Info */}
          <AccordionItem value="personal">
            <AccordionTrigger>Your Information</AccordionTrigger>
            <AccordionContent className="space-y-4 p-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  placeholder="First Name*"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
                <Input
                  placeholder="Last Name*"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                <Input
                  placeholder="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  placeholder="Address"
                  name="yourAddress"
                  value={formData.yourAddress}
                  onChange={handleInputChange}
                />
                <Input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                />
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Recipient */}
          <AccordionItem value="recipient">
            <AccordionTrigger>Recipient Information</AccordionTrigger>
            <AccordionContent className="space-y-4 p-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  placeholder="Hiring Manager Name*"
                  name="hiringManagerName"
                  value={formData.hiringManagerName}
                  onChange={handleInputChange}
                />
                <Input
                  placeholder="Position Applying For*"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  placeholder="Company Name"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                />
                <Input
                  placeholder="Company Address"
                  name="companyAddress"
                  value={formData.companyAddress}
                  onChange={handleInputChange}
                />
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Letter */}
          <AccordionItem value="letter">
            <AccordionTrigger>Letter Content</AccordionTrigger>
            <AccordionContent className="p-4">
              <Textarea
                rows={12}
                name="letterContent"
                value={formData.letterContent}
                onChange={handleInputChange}
                placeholder="Write your professional cover letter here..."
              />
              <p className="text-xs text-muted-foreground mt-2">
                Tip: Keep it concise (3–4 paragraphs)
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Actions */}
        <div className="flex items-center gap-4 mt-6">
          <PreviewCoverLetter formData={formData} />

          <Button
            onClick={handleDownload}
            className=" bg-Blue hover:bg-blue-900"
          >
            <Download size={16} />
            Download
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CoverLetterPage;
