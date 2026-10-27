import { useState, useEffect } from "react";
import { FaUser, FaWhatsapp } from "react-icons/fa";
import html2pdf from "html2pdf.js";

import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import TaxRatesModal from "./TaxRatesModal";
import SalaryForm from "./SalaryForm";
import { useSalaryData } from "@/hooks/calculator";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const SalaryCalculator = () => {
  // fetching salary data
  const { data } = useSalaryData();
  const taxData = data?.tax_rate;
  const usageCount = data?.insight;

  // State variables
  const [currencyType, setCurrencyType] = useState("");
  const [exchangeRate, setExchangeRate] = useState("");
  const [salaryType, setSalaryType] = useState("");
  const [netPay, setNetPay] = useState("");
  const [basicPay, setBasicPay] = useState("");
  const [allowances, setAllowances] = useState<any[]>([]);
  const [totalGross, setTotalGross] = useState<number | null>(null);
  const [totalAllowance, setTotalAllowance] = useState(0);
  const [sscEmployee, setSscEmployee] = useState(0);
  const [pay, setPay] = useState<number | null>(null);

  const [showCompanyCost, setShowCompanyCost] = useState(false);

  // Calculate total allowance whenever allowances change
  useEffect(() => {
    const sum = allowances.reduce(
      (total, amount) => total + parseFloat(amount || 0),
      0,
    );
    setTotalAllowance(sum);
  }, [allowances]);

  // Main calculation effect
  useEffect(() => {
    calculateTaxableAmount();
  }, [
    basicPay,
    netPay,
    totalAllowance,
    salaryType,
    exchangeRate,
    currencyType,
  ]);

  // Add new allowance field
  const addAllowance = () => {
    setAllowances([...allowances, 0]);
  };

  // Remove allowance field
  const removeAllowance = (index: any) => {
    const newAllowances = [...allowances];
    newAllowances.splice(index, 1);
    setAllowances(newAllowances);
  };

  // Handle allowance amount change
  const handleAllowanceChange = (index: any, value: any) => {
    const newAllowances = [...allowances];
    newAllowances[index] = value > 100000000000 ? 0 : value;
    setAllowances(newAllowances);
  };

  // Calculate total gross salary
  const calculateTotalGross = () => {
    const gross = Number(basicPay || 0) + Number(totalAllowance || 0);
    setTotalGross(gross);
    return gross;
  };

  // Calculate taxable amount
  const calculateTaxableAmount = () => {
    if (salaryType === "gross") {
      const gross = calculateTotalGross();
      const ssc = gross * 0.1;
      setSscEmployee(ssc);
      const taxable = gross - ssc;
      const payAmount = calculatePayAmount(taxable);
      setNetPay(String(taxable - payAmount));
    } else if (salaryType === "net" && netPay) {
      estimateGrossSalary(parseFloat(netPay));
    }
  };

  // Calculate PAYE amount
  const calculatePayAmount = (taxableAmount: number) => {
    let payAmount = 0;

    if (currencyType === "usd" && Number(exchangeRate) > 0) {
      const rate = parseFloat(exchangeRate);
      const payoneReduction = taxData.payone_reduction / rate;
      const paytwoReduction = taxData.paytwo_reduction / rate;
      const paythreeReduction = taxData.paythree_reduction / rate;
      const payfourReduction = taxData.payfour_reduction / rate;

      const paytwoAddition = taxData.paytwo_addition / rate;
      const paythreeAddition = taxData.paythree_addition / rate;
      const payfourAddition = taxData.payfour_addition / rate;

      if (taxableAmount > payoneReduction && taxableAmount <= paytwoReduction) {
        payAmount =
          (taxableAmount - payoneReduction) * taxData.payone_percentage;
      } else if (
        taxableAmount > paytwoReduction &&
        taxableAmount <= paythreeReduction
      ) {
        payAmount =
          (taxableAmount - paytwoReduction) * taxData.paytwo_percentage +
          paytwoAddition;
      } else if (
        taxableAmount > paythreeReduction &&
        taxableAmount <= payfourReduction
      ) {
        payAmount =
          (taxableAmount - paythreeReduction) * taxData.paythree_percentage +
          paythreeAddition;
      } else if (taxableAmount > payfourReduction) {
        payAmount =
          (taxableAmount - payfourReduction) * taxData.payfour_percentage +
          payfourAddition;
      }
    } else {
      if (
        taxableAmount > taxData.payone_reduction &&
        taxableAmount <= taxData.paytwo_reduction
      ) {
        payAmount =
          (taxableAmount - taxData.payone_reduction) *
          taxData.payone_percentage;
      } else if (
        taxableAmount > taxData.paytwo_reduction &&
        taxableAmount <= taxData.paythree_reduction
      ) {
        payAmount =
          (taxableAmount - taxData.paytwo_reduction) *
            taxData.paytwo_percentage +
          taxData.paytwo_addition;
      } else if (
        taxableAmount > taxData.paythree_reduction &&
        taxableAmount <= taxData.payfour_reduction
      ) {
        payAmount =
          (taxableAmount - taxData.paythree_reduction) *
            taxData.paythree_percentage +
          taxData.paythree_addition;
      } else if (taxableAmount > taxData.payfour_reduction) {
        payAmount =
          (taxableAmount - taxData.payfour_reduction) *
            taxData.payfour_percentage +
          taxData.payfour_addition;
      }
    }

    setPay(payAmount);
    return payAmount;
  };

  // Estimate gross salary from net pay
  const estimateGrossSalary = (targetNetPay: any) => {
    const tolerance = 0.01;
    const maxIterations = 100;
    let minGross = targetNetPay;
    let maxGross = targetNetPay * 2.0;
    let iteration = 0;
    let calculatedNetPay = 0;
    let grossSalary = 0;
    let paye = 0;
    let taxableIncome = 0;
    let sscDeduction = 0;

    do {
      iteration++;
      grossSalary = (minGross + maxGross) / 2.0;
      sscDeduction = grossSalary * 0.1;
      taxableIncome = grossSalary - sscDeduction;

      paye = calculatePayAmount(taxableIncome);
      calculatedNetPay = grossSalary - sscDeduction - paye;

      if (calculatedNetPay < targetNetPay) {
        minGross = grossSalary;
      } else {
        maxGross = grossSalary;
      }
    } while (
      Math.abs(calculatedNetPay - targetNetPay) > tolerance &&
      iteration < maxIterations
    );

    setSscEmployee(sscDeduction);
    setTotalGross(grossSalary);
    setPay(paye);
    setBasicPay(String(grossSalary - totalAllowance));
  };

  // Format number with commas
  const formatNumber = (num: number) => {
    return num
      ? num.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      : "0.00";
  };

  // Add this function to calculate company costs
  const calculateCompanyCost = () => {
    if (!totalGross) return null;

    const employerSSC = totalGross * 0.1; // 10% of gross salary
    const sdl = totalGross * 0.035; // 3.5% of gross salary
    const wcf = totalGross * 0.005; // 0.5% of gross salary
    const grandTotal = totalGross + employerSSC + sdl + wcf;

    return {
      grossSalary: totalGross,
      employerSSC,
      sdl,
      wcf,
      grandTotal,
    };
  };

  // Download PDF
  const downloadPDF = () => {
    const element = document.getElementById("result");
    if (!element) return;
    const opt = {
      margin: 10,
      filename: `salary_estimation_${new Date().getTime()}.pdf`,
      image: { type: "jpeg" as const, quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: {
        unit: "mm" as const,
        format: "a4" as const,
        orientation: "portrait" as const,
      },
    };
    html2pdf().from(element).set(opt).save();
  };
  // Add this useEffect hook to your component

  // Share on WhatsApp
  const shareOnWhatsApp = () => {
    const grossValue = Number(totalGross ?? 0);
    const netValue = Number(netPay ?? 0);
    const salaryTypeText = salaryType === "net" ? "Gross Salary" : "Net Salary";
    const salaryValue = salaryType === "net" ? grossValue : netValue;
    const taxableValue = grossValue - sscEmployee;

    let message = `💰 *Salary Breakdown* 💰\n\n`;
    message += `✅ ${salaryTypeText}: ${formatNumber(salaryValue)} ${currencyType === "usd" ? "USD" : "TZS"}\n`;
    message += `📌 Basic Pay: ${formatNumber(Number(basicPay || 0))} ${currencyType === "usd" ? "USD" : "TZS"}\n`;
    message += `📌 Allowances: ${formatNumber(totalAllowance)} ${currencyType === "usd" ? "USD" : "TZS"}\n`;
    message += `💵 Gross Payable: ${formatNumber(grossValue)} ${currencyType === "usd" ? "USD" : "TZS"}\n`;
    message += `🔻 SSC (Employee) Deduction: ${formatNumber(sscEmployee)} ${currencyType === "usd" ? "USD" : "TZS"}\n`;
    message += `📊 Taxable Amount: ${formatNumber(taxableValue)} ${currencyType === "usd" ? "USD" : "TZS"}\n`;
    message += `💳 PAYE: ${formatNumber(Number(pay ?? 0))} ${currencyType === "usd" ? "USD" : "TZS"}\n`;
    message += `🧾 Total Deductions: ${formatNumber(sscEmployee + Number(pay ?? 0))} ${currencyType === "usd" ? "USD" : "TZS"}\n`;
    message += `💰 Net Salary: *${formatNumber(netValue)}* ${currencyType === "usd" ? "USD" : "TZS"}\n\n`;
    message += `Shared via Salary Calculator`;

    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  // Format large numbers
  const formatLargeNumber = (num: number) => {
    if (!num) return "0";
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div>
      <Card>
        <CardContent className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h4 className="text-Blue font-semibold m-0">SALARY CALCULATOR</h4>
          </div>

          <Separator />

          {/* Form */}
          <SalaryForm
            addAllowance={addAllowance}
            allowances={allowances}
            basicPay={basicPay}
            currencyType={currencyType}
            exchangeRate={exchangeRate}
            handleAllowanceChange={handleAllowanceChange}
            netPay={netPay}
            removeAllowance={removeAllowance}
            salaryType={salaryType}
            setBasicPay={setBasicPay}
            setCurrencyType={setCurrencyType}
            setExchangeRate={setExchangeRate}
            setNetPay={setNetPay}
            setSalaryType={setSalaryType}
          />

          <Separator />

          {/* Results */}
          <div id="result" className="relative w-full p-2 text-center bg-white">
            {/* Salary Type Result */}
            <div className="mb-2">
              <div className="flex justify-end items-center">
                <div className="text-right">
                  <h4 className="text-sm md:text-base text-Blue m-0">
                    {salaryType === "net" ? "Gross Salary" : "Net Salary"} ={" "}
                    {formatNumber(
                      salaryType === "net"
                        ? Number(totalGross || 0)
                        : Number(netPay || 0),
                    )}{" "}
                    {currencyType === "usd" ? "USD" : "TZS"}
                  </h4>
                </div>
              </div>
            </div>

            {/* Earnings Section */}
            <div className="mb-1.5">
              <div className="flex justify-between w-full border-t border-b border-black py-1 font-bold text-[12px] md:text-sm">
                <h4 className="m-0 text-[15px] md:text-base">EARNING</h4>
                <span>AMOUNT</span>
              </div>
              <div className="flex justify-between text-[12px] md:text-[14px]">
                <span>Basic</span>
                <span>
                  {formatNumber(parseFloat(basicPay || "0"))}{" "}
                  {currencyType === "usd" ? "USD" : "TZS"}
                </span>
              </div>
              <div className="flex justify-between text-[12px] md:text-[14px]">
                <span>Total Allowances</span>
                <span>
                  {formatNumber(Number(totalAllowance || 0))}{" "}
                  {currencyType === "usd" ? "USD" : "TZS"}
                </span>
              </div>
            </div>

            {/* Gross Earnings */}
            <div className="mb-1.5">
              <div className="flex justify-between text-[12px] md:text-[14px]">
                <h4 className="font-bold text-[12px] md:text-[14px] m-0">
                  Gross Earning
                </h4>
                <span>
                  {formatNumber(Number(totalGross || 0))}{" "}
                  {currencyType === "usd" ? "USD" : "TZS"}
                </span>
              </div>
            </div>

            {/* Deductions */}
            <div className="mb-1.5">
              <div className="full-line flex justify-between w-full border-t border-b border-black py-1 font-bold text-[12px] md:text-[14px]">
                <h4 className="m-0 text-[15px] md:text-[16px]">DEDUCTIONS</h4>
                <span>AMOUNT</span>
              </div>
              <div className="flex justify-between text-[12px] md:text-[14px]">
                <span>SSC (Employee)</span>
                <span>
                  {formatNumber(Number(sscEmployee || 0))}{" "}
                  {currencyType === "usd" ? "USD" : "TZS"}
                </span>
              </div>
              <div className="flex justify-between text-[12px] md:text-[14px]">
                <span>PAYE</span>
                <span>
                  {formatNumber(Number(pay || 0))}{" "}
                  {currencyType === "usd" ? "USD" : "TZS"}
                </span>
              </div>
            </div>

            {/* Total Deductions */}
            <div className="mb-1.5">
              <div className="flex justify-between w-full border-t border-b-2 border-black border-dotted py-1 font-bold text-[12px] md:text-[14px]">
                <h4 className="m-0 text-[15px] md:text-[16px]">
                  TOTAL DEDUCTIONS
                </h4>
                <span>
                  {formatNumber(Number(sscEmployee || 0) + Number(pay || 0))}{" "}
                  {currencyType === "usd" ? "USD" : "TZS"}
                </span>
              </div>
            </div>

            {/* Net Salary */}
            <div className="mb-1.5">
              <div className="flex justify-between w-full border-t-2 border-b-[3px] border-black border-double py-1 font-bold text-[12px] md:text-[14px]">
                <h4 className="m-0 text-[15px] md:text-[16px]">
                  NET PAY{" "}
                  <span className="font-normal text-[14px] md:text-[16px]">
                    (Gross Earnings - Total Deductions)
                  </span>
                </h4>
                <span>
                  {formatNumber(Number(netPay || 0))}{" "}
                  {currencyType === "usd" ? "USD" : "TZS"}
                </span>
              </div>
            </div>

            {/* Company Cost Section */}
            {showCompanyCost && (
              <>
                <div className="mb-1.5 mt-4">
                  <div className="full-line flex justify-between w-full border-t border-b border-black py-1 font-bold text-[12px] md:text-[14px]">
                    <h4 className="m-0 text-[15px] md:text-[16px]">
                      {" "}
                      TOTOAL COST TO COMPANY{" "}
                    </h4>
                    <span>AMOUNT</span>
                  </div>
                  <div className="flex justify-between text-[12px] md:text-[14px]">
                    <span>Gross Salary</span>
                    <span>
                      {formatNumber(calculateCompanyCost()?.grossSalary ?? 0)}{" "}
                      {currencyType === "usd" ? "USD" : "TZS"}
                    </span>
                  </div>
                  <div className="flex justify-between text-[12px] md:text-[14px]">
                    <span>SSC (Employer)</span>
                    <span>
                      {formatNumber(calculateCompanyCost()?.employerSSC ?? 0)}{" "}
                      {currencyType === "usd" ? "USD" : "TZS"}
                    </span>
                  </div>
                  <div className="flex justify-between text-[12px] md:text-[14px]">
                    <span>SDL (3.5%)</span>
                    <span>
                      {formatNumber(calculateCompanyCost()?.sdl ?? 0)}{" "}
                      {currencyType === "usd" ? "USD" : "TZS"}
                    </span>
                  </div>
                  <div className="flex justify-between text-[12px] md:text-[14px]">
                    <span>WCF (0.5%)</span>
                    <span>
                      {formatNumber(calculateCompanyCost()?.wcf ?? 0)}{" "}
                      {currencyType === "usd" ? "USD" : "TZS"}
                    </span>
                  </div>
                </div>

                {/* Grand Total */}
                <div className="mb-1.5">
                  <div className="flex justify-between w-full border-t-2 border-b-[3px] border-black border-double py-1 font-bold text-[12px] md:text-[14px]">
                    <h4 className="m-0 text-[15px] md:text-[16px]">
                      GRAND TOTAL
                    </h4>
                    <span>
                      {formatNumber(calculateCompanyCost()?.grandTotal ?? 0)}{" "}
                      {currencyType === "usd" ? "USD" : "TZS"}
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Company Cost Button */}
          <div className="mb-1.5 no-print">
            <Button
              variant="outline"
              onClick={() => setShowCompanyCost(!showCompanyCost)}
              className="w-full"
            >
              {showCompanyCost ? (
                <>
                  <span>Hide Total Cost To Company</span>
                  <ChevronUp />
                </>
              ) : (
                <>
                  <span>Show Total Cost To Company</span>
                  <ChevronDown />
                </>
              )}
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2.5 py-2.5">
            {/* Top Row: User Icon Left, Count Right */}
            <div className="flex items-center justify-between">
              <div></div>

              <div className="flex items-center gap-1">
                <FaUser size={14} className="text-Orange" />
                <span className="text-Blue text-lg font-bold">
                  {formatLargeNumber(usageCount?.no_uses)}
                </span>
              </div>
            </div>

            {/* Button Row */}
            <div className="flex flex-wrap items-center justify-start gap-2">
              <Button onClick={downloadPDF}>Download</Button>

              <Button onClick={shareOnWhatsApp}>
                <FaWhatsapp /> Share on WhatsApp
              </Button>

              {/* Tax Rate Modal */}
              <TaxRatesModal taxData={taxData} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalaryCalculator;
