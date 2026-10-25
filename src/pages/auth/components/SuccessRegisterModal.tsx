import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface SuccessRegisterModalProps {
  show: boolean;
  onHide: () => void;
}

const SuccessRegisterModal = ({ show, onHide }: SuccessRegisterModalProps) => {
  const navigate = useNavigate();

  return (
    <Dialog
      open={show}
      onOpenChange={(val) => {
        if (!val) onHide();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <div className="flex flex-col items-center gap-2">
            <CheckCircle className="w-10 h-10 text-green-500" />
            <DialogTitle className="text-lg font-semibold">
              Registration Successful
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="text-sm text-muted-foreground mt-2">
          Your registration was successful. Check your email for a confirmation
          link.
        </div>

        <DialogFooter className="flex justify-center mt-4">
          <Button
            onClick={() => {
              onHide();
              navigate("/login");
            }}
            className="bg-Blue hover:bg-blue-900"
          >
            OK
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessRegisterModal;
