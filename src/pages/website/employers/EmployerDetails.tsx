import { Building2, Clock, MapPin, Phone, Mail, Globe } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { DEFAULT_IMG, IMG_BASE } from "@/config";
import JoinModal from "./components/JoinModal";
import MessageModal from "./components/MessageModal";
import RateModal from "./components/RateModal";
import EmployerJobs from "./EmployerJobs";

interface EmployerDetailsProps {
  employer: any;
}

const EmployerDetails = ({ employer }: EmployerDetailsProps) => {
  const logoUrl = employer.logo
    ? `${IMG_BASE}${employer.logo}`
    : `${DEFAULT_IMG}`;

  const createdAt = employer.created_at
    ? new Date(employer.created_at).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "";

  const region = employer.client_location?.region?.region_name;
  const country = employer.client_location?.region?.country?.name;
  const location = employer.client_location?.sub_location;

  const phone = employer.client_phones?.[0]?.phone_number;
  const email = employer.client_emails?.[0]?.client_email;
  const website = employer.client_description?.website;

  const additionalInfo =
    employer.additional_info || "No additional info provided.";
  const description =
    employer.client_description?.description || "No description available.";

  return (
    <div className="py-10 space-y-4">
      <Card>
        <CardContent className="space-y-4">
          <div className="flex gap-6">
            <div className="w-40 h-40">
              <img
                src={logoUrl}
                alt="Client Logo"
                className="w-full object-contain"
              />
            </div>

            <div className="w-full flex justify-between text-sm text-muted-foreground">
              {/* Info */}
              <div className="space-y-1">
                <h5 className="text-lg text-Blue font-bold uppercase">
                  {employer.client_name}
                </h5>

                <div className="flex items-center gap-2">
                  <Building2 size={16} />
                  <p>
                    {employer.industry?.industry_name ||
                      "Industry not available"}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <p>{createdAt}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 items-center justify-between">
            <JoinModal employer={employer} />

            <MessageModal clientId={employer.id} />

            <RateModal clientId={employer.id} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-Orange">Contact Information</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Contact */}
          <div className="space-y-1">
            <p className=" flex items-center gap-2">
              <MapPin size={16} />
              {location}, {region}, {country}
            </p>

            {phone && (
              <p className=" flex items-center gap-2">
                <Phone size={16} />
                {phone}
              </p>
            )}
            {email && (
              <p className="flex items-center gap-2">
                <Mail size={16} />
                {email}
              </p>
            )}
            {website && (
              <p className="flex items-center gap-2">
                <Globe size={16} />
                <a
                  href={`https://${website}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline"
                >
                  {website}
                </a>
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-Orange">About Company</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="fw-bold text-primary mb-3">{additionalInfo}</p>
          <p className="text-muted">{description}</p>
        </CardContent>
      </Card>

      <EmployerJobs employer={employer} />
    </div>
  );
};

export default EmployerDetails;
