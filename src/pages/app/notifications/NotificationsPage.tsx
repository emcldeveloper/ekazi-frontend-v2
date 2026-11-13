import { Link } from "react-router-dom";
import { BellOff, CircleUser, Search, Trash2 } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  useDeleteNotification,
  useNotifications,
  useReadAllNotifications,
  useReadNotification,
} from "@/hooks/notifications";
import { formatDate } from "@/utils/helpers";
import LoadingState from "@/components/loading-state";

const JOBS_ROUTE = "/app/jobs";

const NotificationsPage = () => {
  const { data: notificationsData, isLoading } = useNotifications({});
  const notifications = notificationsData?.data ?? [];

  const { mutate: readAll, isPending: isReadingAll } =
    useReadAllNotifications();

  const { mutate: readOne } = useReadNotification();

  const { mutate: deleteNotification, isPending: isDeleting } =
    useDeleteNotification();

  const handleReadAll = () => {
    readAll();
  };

  const handleRead = (id: number) => {
    readOne(id);
  };

  const handleDelete = (id: number) => {
    deleteNotification(id);
  };

  return (
    <div className="space-y-4">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-Blue">
            Notifications
          </h1>
        </div>

        {notifications.length > 0 && (
          <Button
            size="sm"
            variant="secondary"
            disabled={isReadingAll}
            onClick={handleReadAll}
          >
            Mark all as read
          </Button>
        )}
      </header>

      {/* Empty */}
      {isLoading ? (
        <LoadingState />
      ) : notifications.length === 0 ? (
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
        <div className="mt-6">
          {notifications.map((notification: any) => (
            <div
              onClick={() => handleRead(notification.id)}
              className={`flex items-start gap-3 border-b border-border/60
        px-4 py-5 transition-colors last:border-b-0
        hover:bg-muted/30 sm:gap-4 
        ${!notification.readed ? "bg-gray-100 dark:bg-gray-800" : ""}`}
            >
              <div
                className="flex size-11 shrink-0 items-center
          justify-center rounded-xl"
              >
                <CircleUser className="size-5" />
              </div>

              <div className="min-w-0 flex-1 flex justify-between gap-2">
                <div>
                  <p className="text-sm leading-relaxed">
                    {notification.message}
                  </p>

                  <time
                    dateTime={notification.created_at}
                    className="text-xs text-muted-foreground"
                  >
                    {formatDate(notification.created_at)}
                  </time>
                </div>

                <div className="flex items-start justify-between gap-3">
                  {!notification.readed ? (
                    <span
                      className="mt-1.5 size-2 shrink-0 rounded-full
                bg-blue-600"
                      aria-label="Unread notification"
                    />
                  ) : (
                    <div>
                      <Button
                        size="sm"
                        variant="ghost"
                        disabled={isDeleting}
                        onClick={() => handleDelete(notification.id)}
                      >
                        <Trash2 />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;
