import LoadingPage from "@/components/loading-state";
import { FRONTEND_URL } from "@/config";
import { useUser } from "@/hooks/auth";
import { Outlet } from "react-router-dom";
import { AlertCircle, Loader2, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const ProtectedRoutes = () => {
  const token = localStorage.getItem("token");
  const verified = localStorage.getItem("verified") === "true";

  const { data, isLoading, isError, refetch, isFetching } = useUser();

  if (!token) {
    window.location.replace(FRONTEND_URL);
    return null;
  }

  if (!verified) {
    window.location.replace(`${FRONTEND_URL}/not-verified`);
    return null;
  }

  // Loading state
  if (isLoading && !data) {
    return <LoadingPage />;
  }

  // Error state
  if (isError && !data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <Card className="w-full max-w-md border-0 shadow-lg">
          <CardContent className="flex flex-col items-center px-6 py-10 text-center">
            <div className="mb-5 flex size-16 items-center justify-center rounded-full bg-red-50">
              <AlertCircle className="size-8 text-red-500" />
            </div>

            <h2 className="text-xl font-semibold text-gray-900">
              Something went wrong
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-gray-500">
              We couldn't load your account information. Please check your
              internet connection and try again.
            </p>

            <Button
              onClick={() => refetch()}
              disabled={isFetching}
              className="mt-6 w-full gap-2"
            >
              {isFetching ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Retrying...
                </>
              ) : (
                <>
                  <RefreshCw className="size-4" />
                  Try Again
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <Outlet />;
};

export default ProtectedRoutes;
