import { Card, CardContent } from "@/components/ui/card";
import AuthLogo from "./components/AuthLogo";
import RegisterForm from "./components/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-2xl space-y-4">
        <AuthLogo />

        <Card>
          <CardContent>
            <RegisterForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
