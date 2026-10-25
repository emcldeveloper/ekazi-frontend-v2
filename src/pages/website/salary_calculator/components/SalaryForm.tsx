import { Plus } from "lucide-react";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateInsight } from "@/hooks/calculator";

interface SalaryFormProps {
  currencyType: any;
  setCurrencyType: any;
  exchangeRate: any;
  setExchangeRate: any;
  salaryType: any;
  setSalaryType: any;
  netPay: any;
  setNetPay: any;
  basicPay: any;
  setBasicPay: any;
  addAllowance: any;
  allowances: any;
  handleAllowanceChange: any;
  removeAllowance: any;
}

const SalaryForm = ({
  currencyType,
  setCurrencyType,
  exchangeRate,
  setExchangeRate,
  salaryType,
  setSalaryType,
  netPay,
  setNetPay,
  basicPay,
  setBasicPay,
  addAllowance,
  allowances,
  handleAllowanceChange,
  removeAllowance,
}: SalaryFormProps) => {
  const { mutate: createInsight } = useCreateInsight();

  return (
    <form className="space-y-4">
      <FieldGroup className="gap-4">
        {/* Currency Type */}
        <Field className="flex-row">
          <FieldLabel className="flex-1">Select Currency</FieldLabel>
          <Select
            value={currencyType}
            onValueChange={(value) => setCurrencyType(value)}
          >
            <SelectTrigger className="flex-2 h-9">
              <SelectValue placeholder="Select Currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tz">Tanzania (TZS)</SelectItem>
              <SelectItem value="usd">USD</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        {/* Exchange Rate */}
        {currencyType === "usd" && (
          <Field className="flex-row">
            <FieldLabel className="flex-1">
              Exchange Rate (USD to TZS)
            </FieldLabel>
            <Input
              type="number"
              value={exchangeRate}
              onChange={(e) => setExchangeRate(e.target.value)}
              placeholder="Enter Rate"
              min="1"
              step="any"
              className="flex-2 h-9"
            />
          </Field>
        )}

        {/* Salary Type */}
        <Field className="flex-row">
          <FieldLabel className="flex-1">Salary Type</FieldLabel>

          <Select
            value={salaryType}
            onValueChange={(value) => {
              setSalaryType(value);
              createInsight();
            }}
          >
            <SelectTrigger className="flex-2 h-9">
              <SelectValue placeholder="Choose Salary Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="net">Gross Salary (From Net)</SelectItem>
              <SelectItem value="gross">Net Salary (From Gross)</SelectItem>
            </SelectContent>
          </Select>
        </Field>

        {/* Salary Input */}
        <Field className="flex-row">
          <FieldLabel className="flex-1">
            {salaryType === "net" ? "Net Salary" : "Basic Salary"} (
            {currencyType === "usd" ? "USD" : "TZS"})
          </FieldLabel>
          <Input
            type="number"
            value={salaryType === "net" ? netPay : basicPay}
            onChange={(e) =>
              salaryType === "net"
                ? setNetPay(
                    Number(e.target.value) > 100000000000 ? "" : e.target.value,
                  )
                : setBasicPay(
                    Number(e.target.value) > 100000000000 ? "" : e.target.value,
                  )
            }
            placeholder={`Enter ${salaryType === "net" ? "Net" : "Basic"} Salary`}
            min="1"
            max="100000000000"
            disabled={currencyType === "usd" && !exchangeRate}
            className="flex-2 h-9"
          />
        </Field>
      </FieldGroup>

      {/* Allowances */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <Button onClick={addAllowance} className="bg-Orange text-white">
            <Plus /> Add Allowance
          </Button>
        </div>

        <div className="flex flex-col gap-2 mb-1">
          {allowances.map((allowance: any, index: any) => (
            <div key={index} className="flex gap-2 items-center">
              <Input
                type="number"
                value={allowance}
                onChange={(e) => handleAllowanceChange(index, e.target.value)}
                placeholder="Allowance amount"
                min="1"
                max="1000000000"
                className="flex-1 h-9"
              />
              <Button
                type="button"
                onClick={() => removeAllowance(index)}
                className="bg-[#D36314] text-white text-[10px] px-2 py-1 h-auto"
              >
                ✕
              </Button>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
};

export default SalaryForm;
