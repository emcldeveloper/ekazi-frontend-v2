import { Loader } from "lucide-react";

const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-background">
      <Loader size={20} className="animate-spin" />
    </div>
  );
};

export default LoadingPage;
