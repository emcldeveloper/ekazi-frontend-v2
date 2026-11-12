import { useLocation, useNavigate } from "react-router-dom";
import { MailWarning } from "lucide-react";

import { Button } from "@/components/ui/button";
import AuthLogo from "./components/AuthLogo";
import { Card, CardContent } from "@/components/ui/card";

const NotVerifiedPage = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const email = location.state?.email;

  const handleVerify = () => {
    navigate("/verify", { state: { email }, replace: true });
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-md space-y-4">
        <AuthLogo />

        <Card>
          <CardContent className="flex flex-col items-center gap-6 text-center">
            {/* Icon */}
            <div className="rounded-full bg-yellow-100 p-4">
              <MailWarning size={28} className="text-yellow-600" />
            </div>

            {/* Title + message */}
            <div>
              <h2 className="text-xl font-bold">Verify Your Account</h2>
              <p className="text-muted-foreground mt-2">
                Your account hasn't been verified yet. Please verify your email
                to continue.
              </p>
            </div>

            {/* Actions */}
            <div className="flex w-full flex-col gap-3">
              <Button onClick={handleVerify} className="w-full">
                Verify my account
              </Button>

              <Button
                variant="outline"
                onClick={() => navigate("/")}
                className="w-full"
              >
                Back to Homepage
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NotVerifiedPage;
