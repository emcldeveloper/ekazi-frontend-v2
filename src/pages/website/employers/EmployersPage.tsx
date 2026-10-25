import { useEmployers } from "@/hooks/employers";
import Navbar from "../components/Navbar";
import { Loader } from "lucide-react";
import EmployerCard from "./EmployerCard";
import TemplateSlider from "@/components/template-slider";

const EmployersPage = () => {
  const { data: employersData, isLoading } = useEmployers({});
  const employers = employersData?.data ?? [];

  return (
    <div>
      <Navbar />

      <div className="container mx-auto max-w-6xl p-10">
        <div className="grid md:grid-cols-4 gap-6">
          {/* EMPLOYER LIST */}
          <div className="col-span-3 space-y-4">
            <div className="space-y-4">
              {isLoading ? (
                <div className="h-20 flex items-center justify-center">
                  <Loader className="animate-spin" />
                </div>
              ) : employers.length === 0 ? (
                <div className="h-20 flex items-center justify-center">
                  No employers found
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {employers.map((employer: any) => (
                    <EmployerCard employer={employer} />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ADS */}
          <div className="col-span-1">
            <TemplateSlider />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployersPage;
