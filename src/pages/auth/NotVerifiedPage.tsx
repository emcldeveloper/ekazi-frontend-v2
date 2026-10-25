import { useNavigate } from "react-router-dom";
import { MailWarning, Send } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useResendVerificationCode } from "@/hooks/auth";
import { getErrorMessage } from "@/utils/axios-helpers";

const NotVerifiedPage = () => {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("email");

  const { mutate: resendUrl } = useResendVerificationCode();

  const handleResend = async () => {
    const payload = { email: String(userEmail) };

    resendUrl(payload, {
      onSuccess: (res) => {
        toast.success(res?.message || "Verification code sent to your email");
      },
      onError: (err) => {
        toast.error(getErrorMessage(err));
      },
    });
  };

  return (
    <div className="text-Blue text-center space-y-6">
      {/* Icon */}
      <div className="flex justify-center">
        <div className="rounded-full bg-yellow-100 p-4">
          <MailWarning size={50} className=" text-yellow-600" />
        </div>
      </div>

      {/* Title */}
      <div>
        <h2 className="text-2xl font-bold">Your Account Is Not Verified</h2>

        <p className="text-muted-foreground mt-2">
          Please check your inbox for the verification email.
        </p>
      </div>

      {/* Resend section */}
      <div className="flex items-center justify-center text-sm">
        <p>Didn’t receive the email?</p>
        <Button variant="link" onClick={handleResend} className="text-Orange">
          <Send />
          Click here to resend
        </Button>
      </div>

      {/* Button */}
      <Button
        variant="outline"
        onClick={() => navigate("/")}
        className="w-full"
      >
        Back to Homepage
      </Button>
    </div>
  );
};

export default NotVerifiedPage;
