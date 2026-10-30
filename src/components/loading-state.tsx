import { Loader } from "lucide-react";

const LoadingState = () => {
  return (
    <div className="flex items-center justify-center h-40">
      <div className="flex flex-col items-center">
        <Loader className="animate-spin" />
        <p>Loading...</p>
      </div>
    </div>
  );
};

export default LoadingState;
