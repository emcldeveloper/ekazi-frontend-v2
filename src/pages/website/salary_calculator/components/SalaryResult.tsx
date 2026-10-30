import type { Allowance } from "./SalaryForm";

interface SalaryResultProps {
  salaryType: string;
  currencyType: string;
  basicPay: string;
  allowances: Allowance[];
  totalAllowance: number;
  totalGross: number | null;
  sscEmployee: number;
  pay: number | null;
  netPay: string;
}

/*
 * Plain hex colours are used on purpose: html2pdf (html2canvas) can't parse
 * the oklch() colours that Tailwind v4 / shadcn theme tokens produce, which
 * would break the PDF download.
 */

const fmt = (n: number) =>
  (n || 0).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const Row = ({
  label,
  value,
  currency,
  muted,
}: {
  label: string;
  value: number;
  currency: string;
  muted?: boolean;
}) => (
  <div className="flex items-center justify-between py-1.5 text-sm">
    <span className={muted ? "text-[#64748b]" : "text-[#334155]"}>{label}</span>
    <span className="font-medium tabular-nums text-[#0f172a]">
      {fmt(value)} <span className="text-xs text-[#94a3b8]">{currency}</span>
    </span>
  </div>
);

const Section = ({
  title,
  total,
  totalLabel,
  currency,
  negative,
  children,
}: {
  title: string;
  total: number;
  totalLabel: string;
  currency: string;
  negative?: boolean;
  children: React.ReactNode;
}) => (
  <div className="rounded-2xl border border-[#e2e8f0] bg-white px-5 py-4">
    <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-[#94a3b8]">
      {title}
    </p>
    {children}
    <div className="mt-2 flex items-center justify-between border-t border-dashed border-[#e2e8f0] pt-3 text-sm font-semibold">
      <span className="text-[#0f172a]">{totalLabel}</span>
      <span
        className={`tabular-nums ${negative ? "text-[#dc2626]" : "text-[#0f172a]"}`}
      >
        {negative && "− "}
        {fmt(total)} <span className="text-xs text-[#94a3b8]">{currency}</span>
      </span>
    </div>
  </div>
);

const SalaryResult = ({
  salaryType,
  currencyType,
  basicPay,
  allowances,
  totalAllowance,
  totalGross,
  sscEmployee,
  pay,
  netPay,
}: SalaryResultProps) => {
  const currency = currencyType === "usd" ? "USD" : "TZS";
  const gross = Number(totalGross || 0);
  const net = Number(netPay || 0);
  const paye = Number(pay || 0);
  const totalDeductions = sscEmployee + paye;

  const employerSSC = gross * 0.1;
  const sdl = gross * 0.035;
  const wcf = gross * 0.005;
  const companyTotal = gross + employerSSC + sdl + wcf;

  const isFromNet = salaryType === "net";
  const headlineLabel = isFromNet ? "Gross salary" : "Net salary";
  const headlineValue = isFromNet ? gross : net;

  const namedAllowances = allowances.filter((a) => Number(a.amount) > 0);

  return (
    <div id="result" className="space-y-3 bg-white text-left">
      {/* Headline */}
      <div className="rounded-3xl bg-[#D36314] px-6 py-5 text-white">
        <p className="text-sm text-white/80">{headlineLabel}</p>
        <p className="mt-1 text-3xl font-bold tabular-nums tracking-tight">
          {fmt(headlineValue)}
          <span className="ml-2 text-base font-medium text-white/80">
            {currency}
          </span>
        </p>
        <div className="mt-4 flex gap-6 text-sm">
          <div>
            <p className="text-white/70">Gross</p>
            <p className="font-semibold tabular-nums">{fmt(gross)}</p>
          </div>
          <div>
            <p className="text-white/70">Deductions</p>
            <p className="font-semibold tabular-nums">{fmt(totalDeductions)}</p>
          </div>
          <div>
            <p className="text-white/70">Net</p>
            <p className="font-semibold tabular-nums">{fmt(net)}</p>
          </div>
        </div>
      </div>

      {/* Earnings */}
      <Section
        title="Earnings"
        totalLabel="Gross earnings"
        total={gross}
        currency={currency}
      >
        <Row label="Basic" value={Number(basicPay || 0)} currency={currency} />
        {namedAllowances.length > 0 ? (
          namedAllowances.map((a, i) => (
            <Row
              key={i}
              label={a.name || `Allowance ${i + 1}`}
              value={Number(a.amount)}
              currency={currency}
            />
          ))
        ) : (
          <Row
            label="Allowances"
            value={totalAllowance}
            currency={currency}
            muted
          />
        )}
      </Section>

      {/* Deductions */}
      <Section
        title="Deductions"
        totalLabel="Total deductions"
        total={totalDeductions}
        currency={currency}
        negative
      >
        <Row
          label="SSC (Employee 10%)"
          value={sscEmployee}
          currency={currency}
        />
        <Row label="PAYE" value={paye} currency={currency} />
      </Section>

      {/* Net pay */}
      <div className="flex items-center justify-between rounded-2xl bg-[#fdf3ec] px-5 py-4">
        <div>
          <p className="text-sm font-semibold text-[#0f172a]">Net pay</p>
          <p className="text-xs text-[#64748b]">Gross − deductions</p>
        </div>
        <p className="text-xl font-bold tabular-nums text-[#D36314]">
          {fmt(net)} <span className="text-sm font-medium">{currency}</span>
        </p>
      </div>

      {/* Company cost */}
      <Section
        title="Cost to company"
        totalLabel="Grand total"
        total={companyTotal}
        currency={currency}
      >
        <Row label="Gross salary" value={gross} currency={currency} />
        <Row
          label="SSC (Employer 10%)"
          value={employerSSC}
          currency={currency}
        />
        <Row label="SDL (3.5%)" value={sdl} currency={currency} />
        <Row label="WCF (0.5%)" value={wcf} currency={currency} />
      </Section>
    </div>
  );
};

export default SalaryResult;
