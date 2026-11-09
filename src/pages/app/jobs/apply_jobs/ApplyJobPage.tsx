import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { CheckCircle2, Loader, XCircle } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { useApplicantProfile } from "@/hooks/profile";
import {
  useApplyJobInternal,
  useJobDetails,
  useJobMatchData,
} from "@/hooks/jobs";
import { getErrorMessage } from "@/utils/axios-helpers";
import LoadingState from "@/components/loading-state";
import { Progress } from "@/components/ui/progress";

type LetterFormData = {
  notes: string;
};

const MATCH_THRESHOLD = 70;

const ApplyJobPage = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const job_id = Number(jobId);

  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<LetterFormData>();

  const { data: applicant, isLoading: isLoadingProfile } =
    useApplicantProfile();
  const applicantInfo = applicant?.applicant_profile;
  const applicantAddress = applicant?.address?.[0];

  const { data: jobDetails, isLoading: isLoadingJob } = useJobDetails(job_id);

  const { data: checkMatch } = useJobMatchData(job_id);

  const percentage = checkMatch?.match?.percentage ?? 0;
  const recommendation = checkMatch?.match?.recommendation;
  const requirements = checkMatch?.requirements ?? [];
  const requiredItems = requirements.filter((r: any) => r.required);
  const optionalItems = requirements.filter((r: any) => !r.required);

  const { mutate: submitApplication, isPending: isSubmitting } =
    useApplyJobInternal();

  const sendApplication = (notes: string) => {
    submitApplication(
      { jobId: job_id, notes },
      {
        onSuccess: (res) => {
          toast.success(res?.message || "Application sent successfully");
          setShowModal(false);
          navigate("/app/jobs");
          reset;
        },
        onError: (err) => toast.error(getErrorMessage(err)),
      },
    );
  };

  const onSubmit = (data: LetterFormData) => {
    if (percentage >= MATCH_THRESHOLD) {
      sendApplication(data.notes);
    } else {
      setShowModal(true);
    }
  };

  // "Apply Anyway" in the modal
  const handleApplyAnyway = () => {
    sendApplication(getValues("notes"));
  };

  if (isLoadingProfile || isLoadingJob) {
    return <LoadingState />;
  }

  return (
    <div className="space-y-4">
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-Blue">
          Submit Application
        </h1>
      </header>

      <div className="text-base font-semibold text-muted-foreground">
        Cover Letter
      </div>

      <Card className="shadow-md">
        <CardHeader className="space-y-4">
          {/* Applicant */}
          <div className="text-right text-sm">
            <div className="font-medium">
              {applicantInfo?.first_name} {applicantInfo?.last_name}
            </div>

            <div className="text-muted-foreground">
              {applicantAddress.region?.name},{" "}
              {applicantAddress.region?.country?.name}
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
              <div className="font-semibold">{jobDetails?.client?.name}</div>
              <div className="font-medium">{jobDetails?.position?.name}</div>
              {jobDetails.region && (
                <div className="text-muted-foreground">
                  {jobDetails.region?.name}
                </div>
              )}
              {jobDetails.country && (
                <div className="text-muted-foreground">
                  {jobDetails.country?.name}
                </div>
              )}
            </div>
          </div>

          <p className="text-sm">Dear Sir/Madam,</p>
        </CardHeader>

        {/* Body */}
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* REF */}
            <div className="bg-primary/10 text-primary rounded-lg p-3 text-center text-sm font-medium">
              REF: APPLICATION FOR THE POST OF{" "}
              {jobDetails?.position?.name?.toUpperCase()}
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

            <div className="flex flex-col items-start text-sm">
              <div>Thank you</div>
              <div>Regards</div>

              <div className="font-semibold">
                {applicantInfo?.first_name} {applicantInfo?.last_name}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader className="animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Application"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-2xl!">
          <DialogHeader>
            <DialogTitle>Application Match Status</DialogTitle>
          </DialogHeader>

          <div className="-mx-4 scrollbar max-h-[70vh] overflow-y-auto px-4 space-y-4">
            <div className="text-sm text-muted-foreground">
              Requirements Analysis
            </div>

            {/* Breakdown */}
            <div className="space-y-5">
              {/* Percentage summary */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">
                    {recommendation ?? "Match"}
                  </span>
                  <span className="font-semibold">{percentage}%</span>
                </div>
                <Progress value={percentage} className="h-2" />
              </div>

              {/* Required */}
              {requiredItems.length > 0 && (
                <div>
                  <h5 className="font-semibold text-sm mb-2">
                    Required (
                    {requiredItems.filter((r: any) => r.matched).length}/
                    {requiredItems.length})
                  </h5>
                  <div className="space-y-2">
                    {requiredItems.map((req: any) => (
                      <RequirementRow key={req.name} req={req} />
                    ))}
                  </div>
                </div>
              )}

              {/* Optional */}
              {optionalItems.length > 0 && (
                <div>
                  <h5 className="font-semibold text-sm mb-2">
                    Nice to have (
                    {optionalItems.filter((r: any) => r.matched).length}/
                    {optionalItems.length})
                  </h5>
                  <div className="space-y-2">
                    {optionalItems.map((req: any) => (
                      <RequirementRow key={req.name} req={req} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowModal(false)}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>

            <Button
              type="button"
              onClick={handleApplyAnyway}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader className="animate-spin" />
                  Applying...
                </>
              ) : (
                "Apply Anyway"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ApplyJobPage;

function RequirementRow({ req }: { req: any }) {
  const detail = getRequirementDetail(req);

  return (
    <div
      className={`p-2 rounded-md border flex justify-between items-center gap-3 ${
        req.matched
          ? "bg-green-50 border-green-200"
          : "bg-red-50 border-red-200"
      }`}
    >
      <div className="flex items-start gap-2 text-sm min-w-0">
        {req.matched ? (
          <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-green-600" />
        ) : (
          <XCircle className="w-4 h-4 mt-0.5 shrink-0 text-red-600" />
        )}
        <div className="min-w-0">
          <span className="font-medium">{req.label}</span>
          {detail && (
            <p className="text-xs text-muted-foreground truncate">{detail}</p>
          )}
        </div>
      </div>

      <span
        className={`text-xs font-medium shrink-0 ${
          req.matched ? "text-green-600" : "text-red-600"
        }`}
      >
        {req.matched ? "Matched" : "Not Matched"}
      </span>
    </div>
  );
}

// Shows what the job needs, e.g. "Required: Assistant Accountant" or "2+ years"
function getRequirementDetail(req: any): string | null {
  if (req.required_value?.name) return `Required: ${req.required_value.name}`;
  if (req.required_years) return `Required: ${req.required_years}+ years`;
  return null;
}
