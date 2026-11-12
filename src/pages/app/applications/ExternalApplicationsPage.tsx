import { Link } from "react-router-dom";
import { MailPlus, Send } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const APPLY_BY_EMAIL_ROUTE = "/app/external-applications/email";

const ExternalApplicationsPage = () => {
  return (
    <div className="space-y-4">
      <header className="max-w-2xl">
        <h1 className="text-2xl font-bold tracking-tight text-Blue">
          My external applications
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Keep track of the jobs you apply for outside ekazi.
        </p>
      </header>

      <Card className="mt-6 h-full">
        <CardContent>
          <section className="flex flex-1 items-center justify-center text-center">
            <div className="max-w-md space-y-4">
              <span className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-blue-50 text-primary">
                <Send className="size-8" aria-hidden="true" />
              </span>

              <h2 className="text-xl font-bold text-Blue">
                No external applications
              </h2>

              <p className=" text-sm text-muted-foreground">
                Found a job outside ekazi? Apply by email and it will appear
                here.
              </p>

              <Button>
                <MailPlus className="size-4" />
                <Link to={APPLY_BY_EMAIL_ROUTE}>Apply by email</Link>
              </Button>
            </div>
          </section>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExternalApplicationsPage;
