import { Card, CardContent } from "@/components/ui/card";
import AuthLogo from "./components/AuthLogo";
import LoginForm from "./components/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-md space-y-4">
        <AuthLogo />

        <Card>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
