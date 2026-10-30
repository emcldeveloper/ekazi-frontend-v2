import LoadingPage from "@/components/loading-state";
import { FRONTEND_URL } from "@/config";
import { useUser } from "@/hooks/auth";
import { Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const token = localStorage.getItem("token");
  const verified = localStorage.getItem("verified") === "true";

  const { data, isLoading } = useUser();
  console.log("Protected", data);

  if (!token) {
    window.location.replace(FRONTEND_URL);
    return null;
  }

  if (!verified) {
    window.location.replace(`${FRONTEND_URL}/not-verified`);
    return null;
  }

  if (isLoading && !data) {
    return <LoadingPage />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
