import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

import { useApplicantProfile } from "@/hooks/profile";
import { useApplyJobInternal, useJobDetails } from "@/hooks/jobs";
import { getErrorMessage } from "@/utils/axios-helpers";
import { Loader } from "lucide-react";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import JobMatchModal from "./JobMatchModal";
import { useLocation } from "react-router-dom";

type LetterFormData = {
  notes: string;
};

const ApplyJobPage = () => {
  const location = useLocation();

  const jobId = location.state?.jobId;

  const [showModal, setShowModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LetterFormData>();

  const { data: applicant, isLoading: isLoadingProfile } =
    useApplicantProfile();

  const { data: jobDetails, isLoading: isLoadingJob } = useJobDetails(jobId);

  const applicantInfo = applicant?.profile?.applicant_profile;
  const applicantAddress = applicant?.profile?.address?.[0];

  const { mutate: submitApplication, isPending: isSubmitting } =
    useApplyJobInternal();

  const validateAndOpenModal = handleSubmit(() => {
    setShowModal(true);
  });

  const onSubmit = (data: LetterFormData) => {
    const payload = {
      applicant_id: applicant.id,
      jobId,
      notes: data.notes,
    };

    submitApplication(payload, {
      onSuccess: (res) => {
        toast.success(res?.message || "Application Sent succesfully");
        setShowModal(false);
      },

      onError: (err) => {
        toast.error(getErrorMessage(err));
        setShowModal(false);
      },
    });
  };

  if (isLoadingProfile || isLoadingJob) {
    return (
      <div className="flex justify-center items-center">
        <Loader className="animate-spin" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-Blue font-semibold">
          Cover Letter Application Form
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Card className="shadow-md">
          <CardHeader className="space-y-4">
            {/* Applicant */}
            <div className="text-right text-sm">
              <div className="font-medium">
                {applicantInfo?.first_name} {applicantInfo?.last_name}
              </div>

              <div className="text-muted-foreground">
                {applicantAddress.region_name}, {applicantAddress.name}
              </div>

              <div className="text-xs text-muted-foreground mt-2">
                {new Date().toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </div>
            </div>

            {/* Employer */}
            <div className="text-sm">
              <div className="space-y-1">
                <div className="font-semibold">
                  {jobDetails?.client?.client_name}
                </div>
                <div className="font-medium">
                  {jobDetails?.position?.position_name}
                </div>
                <div className="text-muted-foreground">
                  {jobDetails?.addresses?.[0]?.region?.name}
                </div>
                <div className="text-muted-foreground">
                  {jobDetails?.addresses?.[0]?.region?.country?.name}
                </div>
              </div>
            </div>

            <p className="text-sm">Dear Sir/Madam,</p>
          </CardHeader>

          {/* Body */}
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* REF */}
              <div className="bg-primary/10 text-primary rounded-lg p-3 text-center text-sm font-medium">
                REF: APPLICATION FOR THE POST OF
                <div className="mt-1 font-semibold">
                  {jobDetails?.position?.position_name?.toUpperCase()}
                </div>
              </div>

              {/* Textarea */}
              <FieldGroup>
                <Field>
                  <Textarea
                    placeholder="Write your cover letter here..."
                    className="min-h-[200px]"
                    {...register("notes", {
                      required: "Cover letter is required",
                    })}
                  />
                  {errors.notes && (
                    <FieldError>{errors.notes.message}</FieldError>
                  )}
                </Field>
              </FieldGroup>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <JobMatchModal
                  isSubmitting={isSubmitting}
                  onValidateAndOpen={validateAndOpenModal}
                  handleSubmit={handleSubmit(onSubmit)}
                  show={showModal}
                  setShow={setShowModal}
                />
              </div>
            </form>
          </CardContent>

          {/* Footer */}
          <CardFooter className="flex flex-col items-start text-sm">
            <div>Thank you</div>
            <div>Regards</div>

            <div className="font-semibold">
              {applicantInfo?.first_name} {applicantInfo?.last_name}
            </div>
          </CardFooter>
        </Card>
      </CardContent>
    </Card>
  );
};

export default ApplyJobPage;
