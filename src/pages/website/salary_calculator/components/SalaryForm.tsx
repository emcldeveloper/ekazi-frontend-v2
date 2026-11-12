import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useCreateInsight } from "@/hooks/calculator";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";

export interface Allowance {
  name: string;
  amount: string;
}

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
  addAllowance: () => void;
  allowances: Allowance[];
  handleAllowanceChange: (
    index: number,
    field: keyof Allowance,
    value: string,
  ) => void;
  removeAllowance: (index: number) => void;
}

const MAX_SALARY = 100_000_000_000;

const inputClass = "h-12 rounded-full px-5 text-base";

const Toggle = ({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) => (
  <div className="flex h-14 rounded-full bg-muted p-1">
    {options.map((opt) => (
      <button
        key={opt.value}
        type="button"
        onClick={() => onChange(opt.value)}
        className={cn(
          "flex-1 rounded-full text-base font-semibold transition-colors",
          value === opt.value
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        {opt.label}
      </button>
    ))}
  </div>
);

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

  const isUSD = currencyType === "usd";
  const isFromNet = salaryType === "net";
  const currency = isUSD ? "USD" : "TZS";
  const setSalary = isFromNet ? setNetPay : setBasicPay;

  return (
    <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
      <FieldGroup className="gap-4">
        <Field>
          {/* <FieldLabel>Calculate</FieldLabel> */}
          <Toggle
            value={salaryType}
            onChange={(v) => {
              setSalaryType(v);
              createInsight();
            }}
            options={[
              { value: "gross", label: "Net from gross" },
              { value: "net", label: "Gross from net" },
            ]}
          />
        </Field>

        <Field>
          {/* <FieldLabel>Currency</FieldLabel> */}
          <Toggle
            value={currencyType}
            onChange={setCurrencyType}
            options={[
              { value: "tz", label: "TZS" },
              { value: "usd", label: "USD" },
            ]}
          />
        </Field>

        {isUSD && (
          <Field>
            <FieldLabel htmlFor="rate">Exchange rate (1 USD → TZS)</FieldLabel>
            <Input
              id="rate"
              type="number"
              value={exchangeRate}
              onChange={(e) => setExchangeRate(e.target.value)}
              placeholder="e.g. 2450"
              min="1"
              step="any"
              className={inputClass}
            />
          </Field>
        )}

        <Field>
          <FieldLabel htmlFor="salary" className="text-base font-semibold">
            {isFromNet ? "Net salary" : "Basic salary"}
          </FieldLabel>
          <div className="relative">
            <Input
              id="salary"
              type="number"
              value={isFromNet ? netPay : basicPay}
              onChange={(e) =>
                setSalary(
                  Number(e.target.value) > MAX_SALARY ? "" : e.target.value,
                )
              }
              placeholder="0"
              min="1"
              max={MAX_SALARY}
              disabled={isUSD && !exchangeRate}
              className={cn(inputClass, "pr-16 text-lg font-semibold")}
            />
            <span className="pointer-events-none absolute inset-y-0 right-5 flex items-center text-sm text-muted-foreground">
              {currency}
            </span>
          </div>
        </Field>
      </FieldGroup>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-base font-semibold">Allowances</span>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addAllowance}
            className="text-base font-semibold"
          >
            <Plus />
            Add
          </Button>
        </div>

        {allowances.map((allowance, index) => (
          <div key={index} className="flex items-center gap-2">
            <Input
              type="text"
              value={allowance.name}
              onChange={(e) =>
                handleAllowanceChange(index, "name", e.target.value)
              }
              placeholder="Name (e.g. Housing)"
              className={cn(inputClass, "flex-1")}
            />
            <div className="relative flex-1">
              <Input
                type="number"
                value={allowance.amount}
                onChange={(e) =>
                  handleAllowanceChange(index, "amount", e.target.value)
                }
                placeholder="Amount"
                min="1"
                max="1000000000"
                className={cn(inputClass, "pr-14")}
              />
              <span className="pointer-events-none absolute inset-y-0 right-5 flex items-center text-sm text-muted-foreground">
                {currency}
              </span>
            </div>
            <Button
              type="button"
              variant="secondary"
              onClick={() => removeAllowance(index)}
              aria-label="Remove allowance"
              className="size-12"
            >
              <X />
            </Button>
          </div>
        ))}
      </div>
    </form>
  );
};

export default SalaryForm;
