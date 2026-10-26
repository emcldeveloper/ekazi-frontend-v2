import { AlertTriangleIcon, CheckCircle2, XCircle } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useJobMatchData } from "@/hooks/jobs";
import type { Dispatch, SetStateAction } from "react";

interface JobMatchRequirement {
  name: string;
  status: boolean;
}

interface JobMatchCategory {
  category: string;
  item: JobMatchRequirement[];
}

interface JobMatchModalProps {
  onValidateAndOpen: () => void;
  handleSubmit: () => void;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  isSubmitting: boolean;
}

const JobMatchModal = ({
  onValidateAndOpen,
  handleSubmit,
  show,
  setShow,
  isSubmitting,
}: JobMatchModalProps) => {
  const { data, isPending: isLoading } = useJobMatchData({
    applicantId: 1,
    jobId: 1,
  });

  const percentage = data?.requirements?.percentage ?? 0;
  const categories = data?.requirements?.categories ?? [];

  const totalRequired = data?.total_required;
  const totalMatch = data?.total_match;
  const missing = totalRequired - totalMatch;

  if (isLoading) {
    return (
      <div className="flex justify-center py-4">
        <Spinner className="size-8" />
      </div>
    );
  }

  return (
    <>
      {/* Trigger */}
      <div className="text-center">
        <Button
          type="button"
          onClick={onValidateAndOpen}
          disabled={isSubmitting}
          className="bg-Blue text-white hover:bg-blue-900"
        >
          {isSubmitting ? "Submitting..." : "Submit Application"}
        </Button>
      </div>

      {/* Modal */}
      <Dialog open={show} onOpenChange={(val) => !val && setShow(false)}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Application Match Status</DialogTitle>
          </DialogHeader>

          <div className="-mx-4 scrollbar max-h-[70vh] overflow-y-auto px-4 space-y-4">
            <Alert className=" border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-50">
              <AlertTriangleIcon />
              <AlertTitle>Notes</AlertTitle>
              <AlertDescription>
                You matched {totalMatch} out of {totalRequired} requirements.
                Missing {missing} requirements.{" "}
                {percentage < 80 &&
                  "Improve your profile to increase your score."}
              </AlertDescription>
            </Alert>

            <div className="text-sm text-muted-foreground">
              Requirements Analysis
            </div>

            {/* Breakdown */}
            <div className="space-y-4">
              {categories.map((cat: JobMatchCategory, i: number) => (
                <div key={i}>
                  <h5 className="font-semibold text-sm mb-2">{cat.category}</h5>

                  <div className="space-y-2">
                    {cat.item.map((req: JobMatchRequirement, idx: number) => (
                      <div
                        key={idx}
                        className={`p-2 rounded-md border flex justify-between items-center ${
                          req.status
                            ? "bg-green-50 border-green-200"
                            : "bg-red-50 border-red-200"
                        }`}
                      >
                        <div className="flex items-center gap-2 text-sm">
                          {req.status ? (
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-600" />
                          )}
                          <span>{req.name}</span>
                        </div>

                        <span
                          className={`text-xs font-medium ${
                            req.status ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {req.status ? "Matched" : "Not Matched"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShow(false)}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>

            <Button
              type="button"
              variant={percentage >= 70 ? "default" : "destructive"}
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full sm:w-auto"
            >
              {isSubmitting ? "Applying..." : "Apply Anyway"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default JobMatchModal;
