import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, Info, X } from "lucide-react";

import {
  Dialog,
  DialogContent,
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

  const [missingFields, setMissingFields] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [currentField] = useState(null);

  useEffect(() => {
    if (!completeCheck) return;

    const missing = completeCheck.profilecheck || [];

    if (missing.length > 0) {
      setMissingFields(missing);
      setShowProfileCompleteModal(true);
      setProfileComplete(false);
    } else {
      setProfileComplete(true);
    }
  }, [completeCheck]);

  const completionPercent = completeCheck?.sections
    ? Math.round(
        ((completeCheck.sections.length - (missingFields?.length || 0)) /
          completeCheck.sections.length) *
          100,
      )
    : 0;

  return (
    <>
      <Dialog
        open={showProfileCompleteModal}
        onOpenChange={setShowProfileCompleteModal}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-center">
              Profile Completion Required
            </DialogTitle>
          </DialogHeader>

          {/* Alert */}
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex items-start gap-3 bg-yellow-50 border border-yellow-200 p-4 rounded-lg flex-1">
              <AlertTriangle className="text-yellow-600 mt-1 w-5 h-5" />
              <div>
                <p className="font-semibold">ACTION REQUIRED:</p>
                <p className="text-sm text-muted-foreground">
                  Your profile is {completionPercent}% complete. You must
                  complete {missingFields?.length || 0} essential{" "}
                  {missingFields?.length > 1 ? "sections" : "section"} before
                  applying.
                </p>
              </div>
            </div>

            {/* Progress Circle */}
            <div className="flex flex-col items-center">
              <div className="relative w-20 h-20">
                <div className="absolute inset-0 rounded-full border-4 border-muted" />
                <div
                  className="absolute inset-0 rounded-full border-4 border-blue-600"
                  style={{
                    clipPath: `inset(${100 - completionPercent}% 0 0 0)`,
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center font-semibold text-blue-600">
                  {completionPercent}%
                </div>
              </div>
              <p className="text-xs mt-2 text-blue-600">Profile Completion</p>
            </div>
          </div>

          {/* Missing Sections */}
          <div className="mt-4">
            <h3 className="font-semibold mb-3">Missing Profile Sections:</h3>

            <div className="max-h-[300px] overflow-y-auto space-y-2 pr-2">
              {missingFields?.map((field, index) => (
                <div
                  key={index}
                  className="p-3 bg-red-50 border-l-4 border-red-500 rounded-md"
                >
                  <div className="flex flex-col gap-1">
                    <span className="font-medium text-sm">
                      {(completeCheck?.sections &&
                        completeCheck.sections[
                          `applicant_${field?.toLowerCase()}`
                        ]) ||
                        field}
                      :<span className="text-red-600 ml-2">Not completed</span>
                    </span>

                    <div className="flex items-center text-xs text-muted-foreground">
                      <Info className="w-3 h-3 mr-1" />
                      Complete this section to continue
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-between mt-6">
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
          </div>
        </DialogContent>
      </Dialog>

      {/* Legacy modal fallback */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 w-full max-w-md">
            <div className="flex justify-between items-center mb-2">
              <h5 className="font-semibold">Complete: {currentField}</h5>
              <button onClick={() => setShowModal(false)}>
                <X />
              </button>
            </div>

            <div className="text-sm mb-4">
              Form for <strong>{currentField}</strong> goes here.
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowModal(false)}>
                Close
              </Button>
              <Button>Save</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CheckCompleteProfile;
