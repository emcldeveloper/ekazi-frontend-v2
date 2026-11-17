import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useCompleteProfile } from "@/hooks/profile";

interface CheckCompleteProfileProps {
  showProfileCompleteModal: any;
  setShowProfileCompleteModal: any;
  setProfileComplete: any;
}

const CheckCompleteProfile = ({
  showProfileCompleteModal,
  setShowProfileCompleteModal,
  setProfileComplete,
}: CheckCompleteProfileProps) => {
  const navigate = useNavigate();

  const { data: completeCheck } = useCompleteProfile();
  const canApplyJob = completeCheck?.can_apply;
  const missingRequirements = completeCheck?.missing_requirements ?? [];
  const completionPercent = completeCheck?.profile_completion?.total_percentage;

  console.log(missingRequirements);

  const [missingFields, setMissingFields] = useState<string[]>([]);

  useEffect(() => {
    if (!completeCheck) return;

    setMissingFields(missingRequirements);

    setProfileComplete(Boolean(canApplyJob));
  }, [completeCheck, canApplyJob, missingRequirements, setProfileComplete]);

  return (
    <Dialog
      open={showProfileCompleteModal}
      onOpenChange={setShowProfileCompleteModal}
    >
      <DialogContent className="max-w-2xl!">
        <DialogHeader>
          <DialogTitle>Profile Completion Required</DialogTitle>
        </DialogHeader>

        <div className="-mx-4 no-scrollbar max-h-[65vh] overflow-y-auto px-4">
          {/* Alert */}
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex items-start gap-3 bg-yellow-50 border border-yellow-200 p-4 rounded-lg flex-1">
              <AlertTriangle className="text-yellow-600 mt-1 w-5 h-5" />
              <div>
                <p className="font-semibold">ACTION REQUIRED:</p>
                <p className="text-xs text-muted-foreground">
                  Your profile is {completionPercent}% complete. You must
                  complete {missingFields?.length || 0} essential{" "}
                  {missingFields?.length > 1 ? "sections" : "section"} before
                  applying.
                </p>
              </div>
            </div>
          </div>

          {/* Missing Sections */}
          <div className="mt-4">
            <h3 className="mb-3 font-semibold">Missing Profile Sections</h3>

            <div className="space-y-3">
              {missingFields.map((field: any) => (
                <div
                  key={field?.section}
                  className="rounded-xl border border-red-100 bg-red-50/60 p-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-red-100 p-2">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                    </div>

                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="text-sm font-semibold text-gray-900">
                          {field?.label}
                        </h4>

                        <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">
                          Incomplete
                        </span>
                      </div>

                      <p className="text-sm text-muted-foreground">
                        {field?.message}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setShowProfileCompleteModal(false)}
          >
            Cancel
          </Button>

          <Button
            onClick={() => {
              setShowProfileCompleteModal(false);
              navigate("/jobseeker/profile-preview");
            }}
          >
            Go To Profile
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CheckCompleteProfile;
