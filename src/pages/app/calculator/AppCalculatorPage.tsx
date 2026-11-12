import SalaryCalculator from "@/pages/website/salary_calculator/components/SalaryCalculator";

const AppCalculatorPage = () => {
  return (
    <div className="space-y-4">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-Blue">
            Salary calculator
          </h1>
        </div>
      </header>

      <SalaryCalculator />
    </div>
  );
};

export default AppCalculatorPage;
