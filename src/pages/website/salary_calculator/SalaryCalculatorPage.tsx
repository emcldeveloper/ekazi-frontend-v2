import TemplateSlider from "@/components/template-slider";
import Navbar from "../components/Navbar";
import SalaryCalculator from "./components/SalaryCalculator";

const SalaryCalculatorPage = () => {
  return (
    <div>
      <Navbar />

      <div className="container mx-auto max-w-6xl my-10 px-4">
        <div className="grid md:grid-cols-4 gap-4">
          <div className="col-span-3">
            <SalaryCalculator />
          </div>
          <div className="col-span-1">
            <TemplateSlider />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalaryCalculatorPage;
