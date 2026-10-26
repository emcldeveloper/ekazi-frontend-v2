import { useState } from "react";
import { Calendar, Clock, Link as LinkIcon, Info } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useInterviewResponse } from "@/hooks/applications";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/axios-helpers";

interface InterviewDetails {
  id: number | string;
  status: string;
  interview_type?: string | null;
  duration?: number | string | null;
  interview_date?: string | null;
  url?: string | null;
  reason?: string | null;
}

interface InterviewDetailsModalProps {
  interviewDetails: InterviewDetails | null | undefined;
  show: boolean;
  onHide: () => void;
}

const InterviewDetailsModal = ({
  interviewDetails,
  show,
  onHide,
}: InterviewDetailsModalProps) => {
  const { mutate: respondInterview, isPending } = useInterviewResponse();

  const [showRescheduleForm, setShowRescheduleForm] = useState(false);
  const [showCancelForm, setShowCancelForm] = useState(false);
  const [rescheduleReason, setRescheduleReason] = useState("");
  const [rescheduleDate, setRescheduleDate] = useState("");
  const [cancelReason, setCancelReason] = useState("");

  const isFinalStatus = ["Interested", "Not Interested"].includes(
    interviewDetails?.status ?? "",
  );

  // Handlers
  const handleInterested = async () => {
    // const result = await Swal.fire({
    //   title: "Confirm Attendance?",
    //   text: "Are you sure you are interested in attending this interview?",
    //   icon: "question",
    //   showCancelButton: true,
    //   confirmButtonText: "Yes, Confirm",
    // });

    // if (!result.isConfirmed) return;

    respondInterview(
      {
        id: interviewDetails?.id,
        status: "Interested",
      },
      {
        onSuccess: (res) => {
          toast.success(res?.message || "Confirmed!");
          onHide();
        },
        onError: (err) => {
          toast.error(getErrorMessage(err));
        },
      },
    );
  };

  const handleReschedule = async () => {
    // if (!rescheduleDate) {
    //   Swal.fire("Date required", "", "warning");
    //   return;
    // }

    // const result = await Swal.fire({
    //   title: "Reschedule Interview?",
    //   icon: "warning",
    //   showCancelButton: true,
    // });

    // if (!result.isConfirmed) return;

    respondInterview(
      {
        id: interviewDetails?.id,
        status: "Reschedule",
        reason: rescheduleReason || null,
        reschedule_date: rescheduleDate,
      },
      {
        onSuccess: (res) => {
          toast.success(res?.message || "Rescheduled!");
          setShowRescheduleForm(false);
          onHide();
        },
        onError: (err) => {
          toast.error(getErrorMessage(err));
        },
      },
    );
  };

  const handleNotInterested = async () => {
    // const result = await Swal.fire({
    //   title: "Cancel Interview?",
    //   icon: "warning",
    //   showCancelButton: true,
    // });

    // if (!result.isConfirmed) return;

    respondInterview(
      {
        id: interviewDetails?.id,
        status: "Not Interested",
        reason: cancelReason || null,
      },
      {
        onSuccess: (res) => {
          toast.success(res?.message || "Cancelled");
          setShowCancelForm(false);
          onHide();
        },
        onError: (err) => {
          toast.error(getErrorMessage(err));
        },
      },
    );
  };

  // Status
  const getStatusStyles = () => {
    switch (interviewDetails?.status) {
      case "Pending":
        return "bg-yellow-500 text-white";
      case "Interested":
        return "bg-green-600 text-white";
      case "Reschedule":
        return "bg-blue-600 text-white";
      default:
        return "bg-red-600 text-white";
    }
  };

  return (
    <Dialog open={show} onOpenChange={onHide}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Interview Details</DialogTitle>
        </DialogHeader>

        {interviewDetails && (
          <div className="-mx-4 no-scrollbar max-h-[70vh] overflow-y-auto px-4 space-y-4">
            {/* DETAILS */}
            <div className="rounded-lg border border-gray-300 p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Status</span>
                <Badge className={getStatusStyles()}>
                  {interviewDetails.status}
                </Badge>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Info size={14} />
                {interviewDetails.interview_type || "-"}
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Clock size={14} />
                {interviewDetails.duration
                  ? `${interviewDetails.duration} mins`
                  : "-"}
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Calendar size={14} />
                {interviewDetails.interview_date || "Not scheduled"}
              </div>

              {interviewDetails.url && (
                <a
                  href={interviewDetails.url}
                  target="_blank"
                  className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
                >
                  <LinkIcon size={14} />
                  Join Interview
                </a>
              )}

              {interviewDetails.reason && (
                <p className="text-sm text-muted-foreground">
                  Reason: {interviewDetails.reason}
                </p>
              )}
            </div>

            {/* RESCHEDULE */}
            {showRescheduleForm && (
              <div className="border rounded-lg p-4 space-y-3 bg-muted/40">
                <h4 className="font-semibold">Reschedule</h4>

                <Input
                  type="date"
                  value={rescheduleDate}
                  onChange={(e) => setRescheduleDate(e.target.value)}
                />

                <Textarea
                  placeholder="Reason (optional)"
                  value={rescheduleReason}
                  onChange={(e) => setRescheduleReason(e.target.value)}
                />

                <div className="flex gap-2">
                  <Button onClick={handleReschedule} disabled={isPending}>
                    Submit
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => setShowRescheduleForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {/* CANCEL */}
            {showCancelForm && (
              <div className="border rounded-lg p-4 space-y-3 bg-muted/40">
                <h4 className="font-semibold">Cancel Interview</h4>

                <Textarea
                  placeholder="Reason (optional)"
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                />

                <div className="flex gap-2">
                  <Button
                    variant="destructive"
                    onClick={handleNotInterested}
                    disabled={isPending}
                  >
                    Submit
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => setShowCancelForm(false)}
                  >
                    Back
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* FOOTER */}
        {!isFinalStatus && (
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setShowRescheduleForm(false);
                setShowCancelForm(true);
              }}
            >
              Not Interested
            </Button>

            <Button
              variant="outline"
              onClick={() => {
                setShowCancelForm(false);
                setShowRescheduleForm(true);
              }}
            >
              Reschedule
            </Button>

            <Button onClick={handleInterested} disabled={isPending}>
              Interested
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default InterviewDetailsModal;
