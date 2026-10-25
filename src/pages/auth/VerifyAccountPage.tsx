import { Card, CardContent } from "@/components/ui/card";
import AuthLogo from "./components/AuthLogo";
import VerifyAccountForm from "./components/VerifyAccountForm";

export default function VerifyAccountPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-md space-y-4">
        <AuthLogo />

        <Card>
          <CardContent>
            <VerifyAccountForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
