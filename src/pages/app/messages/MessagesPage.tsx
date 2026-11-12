import { Link } from "react-router-dom";
import { MessagesSquare, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const JOBS_ROUTE = "/app/jobs";

const MessagesPage = () => {
  return (
    <div className="space-y-4">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-Blue">
            Messages
          </h1>
        </div>
        {/* <Button type="button" variant="outline">
          <CheckCheck className="size-4 text-primary" aria-hidden="true" />
          Mark all as read
        </Button> */}
      </header>

      <Card className="mt-6 h-full">
        <CardContent>
          <div className="flex flex-1 items-center justify-center text-center">
            <div className="max-w-md space-y-4">
              <span className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-blue-50 text-primary">
                <MessagesSquare className="size-8" aria-hidden="true" />
              </span>

              <h2 className="text-xl font-bold tracking-tight text-Blue">
                Welcome to messages
              </h2>

              <p className="text-sm text-muted-foreground">
                Once you apply for jobs, you will be able to chat and
                collaborate here.
              </p>

              <Button>
                <Search className="size-4" aria-hidden="true" />
                <Link to={JOBS_ROUTE}>Search for jobs</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MessagesPage;
