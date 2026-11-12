import { useState } from "react";

import { BellOff, Search } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

type NotificationType =
  | "application"
  | "match"
  | "deadline"
  | "message"
  | "system";

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  createdAt: string;
  isRead: boolean;
  link?: string;
}

// TODO: replace with the candidate's notifications from your API.
const SAMPLE_NOTIFICATIONS: Notification[] = [];

const JOBS_ROUTE = "/app/jobs";

const NotificationsPage = () => {
  const [notifications] = useState(SAMPLE_NOTIFICATIONS);

  return (
    <div className="space-y-4">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-Blue">
            Notifications
          </h1>
        </div>
        {/* <Button type="button" variant="outline">
          <CheckCheck className="size-4 text-primary" aria-hidden="true" />
          Mark all as read
        </Button> */}
      </header>

      {/* Tabs */}

      {/* Empty */}
      {notifications.length === 0 ? (
        <Card className="mt-6 h-full">
          <CardContent>
            <div className="flex flex-col items-center gap-4 text-center">
              <span className="flex size-16 items-center justify-center rounded-2xl bg-blue-50 text-primary">
                <BellOff className="size-8" aria-hidden="true" />
              </span>

              <h2 className="text-xl tracking-tight font-bold text-Blue">
                No notifications
              </h2>

              <p className="max-w-md text-sm text-muted-foreground">
                Updates about your applications, job matches and deadlines will
                appear here.
              </p>

              <Button>
                <Search className="size-4" aria-hidden="true" />
                <Link to={JOBS_ROUTE}>Search for jobs</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="mt-6 space-y-6">Notifications</div>
      )}
    </div>
  );
};

export default NotificationsPage;
