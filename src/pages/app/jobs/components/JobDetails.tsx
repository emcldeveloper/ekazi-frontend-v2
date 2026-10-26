import { useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Users, Briefcase, Banknote, Calendar, Share } from "lucide-react";
import { FaFacebook, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { toast } from "sonner";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { DEFAULT_IMG, IMG_BASE } from "@/config";
import { getErrorMessage } from "@/utils/axios-helpers";
import { useSaveJob } from "@/hooks/jobs";
import CheckCompleteProfile from "../../profile/components/CheckCompleteProfile";

interface JobDetailsProps {
  job: any;
  appliedJobIds?: number[];
}

const JobDetails = ({ job, appliedJobIds = [] }: JobDetailsProps) => {
  const navigate = useNavigate();
  const { mutate: saveJobMutate, isPending } = useSaveJob();

  const [profileComplete, setProfileComplete] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const applicantId = localStorage.getItem("applicantId");
  const isLoggedIn = !!applicantId;

  const hasApplied = appliedJobIds.includes(job?.id);
  const isExpired = job?.dead_line
    ? new Date(job?.dead_line) < new Date()
    : false;

  const shareTitle = `Job Opening: ${
    job?.job_position?.position_name
  } at ${job?.client?.client_name ?? ""}`;

  const shareLink = `${job?.job_position?.position_name}`;

  const encodedTitle = encodeURIComponent(shareTitle);
  const encodedLink = encodeURIComponent(shareLink);
  const shareUrl = `${window.location.origin}/jobs?search=${encodedLink}`;
  const encodedUrl = encodeURIComponent(shareUrl);

  const handleApply = () => {
    localStorage.setItem("jobId", job?.id);

    if (job.job_email) {
      navigate(isLoggedIn ? "/app/apply-job-email" : "/apply-job-email", {
        state: { jobId: job?.id },
      });
      return;
    }

    if (job.job_external_url) {
      window.open(job?.job_external_url?.external_url, "_blank");
      return;
    }

    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    if (profileComplete === null) {
      // still loading
      return;
    }

    if (!profileComplete) {
      setShowProfileModal(true);
      return;
    }

    navigate("/app/apply-job", {
      state: { jobId: job?.id },
    });
  };

  const handleSaveJob = () => {
    if (!isLoggedIn) {
      navigate("/login");
    }

    saveJobMutate(
      {
        applicant_id: applicantId,
        job_id: job?.id,
      },
      {
        onSuccess: (res) => {
          toast.success(res?.message ?? "Job saved");
        },
        onError: (err) => {
          toast.error(getErrorMessage(err));
        },
      },
    );
  };

  return (
    <div className="space-y-4 my-5">
      {/* Header */}
      <div className="flex gap-4 items-center">
        <img
          src={`${IMG_BASE}${job?.client?.logo || ""}`}
          alt={job?.client?.client_name || "Company Logo"}
          className="object-contain max-w-[120px] max-h-[75px]"
          onError={(e) => (e.currentTarget.src = DEFAULT_IMG)}
        />

        <div className="text-start">
          <h2 className="font-semibold text-lg">
            {job?.position?.position_name}
          </h2>
          <p className="text-sm text-muted-foreground">
            {job?.client?.client_name}
          </p>
        </div>
      </div>

      <Separator />

      {/* Top Stats */}
      <div className="grid grid-cols-3 text-start gap-4">
        <div className="flex gap-1 items-center text-sm">
          <Eye size={16} className="text-orange-500" />
          <span>{job?.jobStatistics?.job_views ?? 0}</span>
          <span>Views</span>
        </div>

        <div className="flex gap-1 items-center text-sm">
          <Users size={16} className="text-orange-500" />
          <span>
            {job?.applied_count ?? job?.indirect_applicant?.length ?? 0}
          </span>
          <span>Applicants</span>
        </div>

        <div className="flex gap-1 items-center text-sm">
          <Briefcase size={16} className="text-orange-500" />
          <span>{job?.job_type?.type_name}</span>
        </div>

        <div className="flex gap-1 items-center text-sm">
          <Banknote size={16} className="text-orange-500" />
          <span>
            {job?.entry_salary || job?.exit_salary
              ? `${job?.entry_salary ?? 0} - ${job.exit_salary}`
              : "Negotiable"}
          </span>
        </div>

        <div className="flex gap-1 items-center text-sm">
          <Calendar size={16} className="text-orange-500" />
          <span>{new Date(job?.dead_line).toDateString() ?? "Deadline"}</span>
        </div>
      </div>

      <Separator />

      {/* Details */}
      <div className="space-y-4 text-sm">
        <Section title="Reporting Structure">
          {job?.job_report_to?.report_to && (
            <Item label="Report To" value={job?.job_report_to.report_to} />
          )}
          {job?.job_report_to?.supervises && (
            <Item label="Supervision" value={job?.job_report_to.supervises} />
          )}
          {job?.job_report_to?.interacts_with && (
            <Item
              label="Interacts With"
              value={job?.job_report_to.interacts_with}
            />
          )}
        </Section>

        <Section title="Job Requirements">
          {job?.position_level?.position_name && (
            <Item label="Job Level" value={job?.position_level.position_name} />
          )}
          {job?.job_gender?.gender_name && (
            <Item label="Gender" value={job?.job_gender.gender_name} />
          )}
          {job?.years_experience && (
            <Item label="Experience" value={`${job?.years_experience} Years`} />
          )}
        </Section>
      </div>

      <Separator />

      {/* Duties */}
      <div>
        <h3 className="font-semibold mb-2">Main Duties</h3>
        <div
          className="prose prose-sm max-w-none
                 prose-headings:font-semibold
                 prose-ul:list-disc
                 prose-ul:pl-6 dark:text-white"
          dangerouslySetInnerHTML={{
            __html: job?.job_duties?.main_duties,
          }}
        />
      </div>

      <div>
        <h3 className="font-semibold mb-2">Other Requirements</h3>
        <div
          className="prose prose-sm max-w-none
                 prose-headings:font-semibold
                 prose-ul:list-disc
                 prose-ul:pl-6 dark:text-white"
          dangerouslySetInnerHTML={{
            __html: job?.job_other_requirement?.other_requirement,
          }}
        />
      </div>

      <Separator />

      {/* Social + Actions */}
      <div className="flex justify-between items-center gap-4">
        <div className="flex gap-2">
          {isExpired || hasApplied ? null : (
            <>
              <Button
                variant="outline"
                className=""
                onClick={isLoggedIn ? handleSaveJob : () => navigate("/login")}
              >
                Save Job
              </Button>

              <Button
                onClick={handleApply}
                className=" bg-Blue hover:bg-blue-900"
              >
                Apply Now
              </Button>
            </>
          )}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={<Button variant="outline" className="rounded-full" />}
          >
            <Share /> Share
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <FaWhatsapp color="#25D366" />
                <a
                  href={`https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`}
                  target="_blank"
                >
                  WhatsApp
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FaLinkedin color="#0077b5" />
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                  target="_blank"
                >
                  Linkedin
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FaFacebook color="#3b5998" />
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                  target="_blank"
                >
                  Facebook
                </a>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {isLoggedIn && (
        <CheckCompleteProfile
          showProfileCompleteModal={showProfileModal}
          setShowProfileCompleteModal={setShowProfileModal}
          setProfileComplete={setProfileComplete}
        />
      )}
    </div>
  );
};

const Section = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => (
  <div>
    <h3 className="font-semibold mb-2">{title}</h3>
    <div className="space-y-1">{children}</div>
  </div>
);

const Item = ({ label, value }: { label: string; value: string }) => (
  <div className="grid grid-cols-3">
    <span className="font-medium">{label}:</span>
    <span className="col-span-2 text-muted-foreground">{value}</span>
  </div>
);

export default JobDetails;
