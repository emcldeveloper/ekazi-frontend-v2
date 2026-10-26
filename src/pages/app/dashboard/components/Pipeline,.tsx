import { useState, useMemo } from "react";
import { BsCalendar, BsChevronDown } from "react-icons/bs";
import {
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useApplicantPipeline } from "@/hooks/dashboard";

/* ----------------------------------------------------- */
interface PipelineStage {
  stage_name?: string;
}

interface PipelineItem {
  created_at: string;
  stage?: PipelineStage;
  [key: string]: unknown;
}

interface DateRange {
  start: string;
  end: string;
  display: string;
}

interface TempDateRange {
  start: string;
  end: string;
}

type PresetRangeValue =
  | "today"
  | "yesterday"
  | "last7"
  | "lastMonth"
  | "last90"
  | "lastYear"
  | "custom";

interface PresetRange {
  label: string;
  value: PresetRangeValue;
}

interface ChartDataItem {
  name: string;
  value: number;
}

const buildDefaultRange = (): DateRange => {
  const today = new Date();
  const start = new Date();
  start.setDate(start.getDate() - 30);

  return {
    start: start.toISOString().split("T")[0],
    end: today.toISOString().split("T")[0],
    display: "Last 30 days",
  };
};

const presetRanges: PresetRange[] = [
  { label: "Today", value: "today" },
  { label: "Yesterday", value: "yesterday" },
  { label: "Last 7 days", value: "last7" },
  { label: "Last 30 days", value: "lastMonth" },
  { label: "Last 90 days", value: "last90" },
  { label: "Last 12 months", value: "lastYear" },
  { label: "Custom", value: "custom" },
];

const COLORS = [
  "#4285F4",
  "#34A853",
  "#FBBC05",
  "#EA4335",
  "#673AB7",
  "#FF9800",
  "#9E9E9E",
];

const Pipeline = () => {
  const { data: jobseekerpipeline = [] }: { data?: PipelineItem[] } =
    useApplicantPipeline();

  console.log(jobseekerpipeline);

  const [filterType, setFilterType] = useState<PresetRangeValue>("lastMonth");
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  const [dateRange, setDateRange] = useState<DateRange>(buildDefaultRange());
  const [tempDateRange, setTempDateRange] = useState<TempDateRange>({
    start: "",
    end: "",
  });

  const handlePresetRange = (range: PresetRangeValue): void => {
    const today = new Date();
    let start = new Date();
    let displayText = "";

    switch (range) {
      case "today":
        displayText = "Today";
        break;
      case "yesterday":
        start.setDate(start.getDate() - 1);
        displayText = "Yesterday";
        break;
      case "last7":
        start.setDate(start.getDate() - 7);
        displayText = "Last 7 days";
        break;
      case "lastMonth":
        start.setDate(start.getDate() - 30);
        displayText = "Last 30 days";
        break;
      case "last90":
        start.setDate(start.getDate() - 90);
        displayText = "Last 90 days";
        break;
      case "lastYear":
        start.setFullYear(start.getFullYear() - 1);
        displayText = "Last 12 months";
        break;
      case "custom":
        setFilterType("custom");
        setShowDatePicker(true);
        return;
      default:
        break;
    }

    setFilterType(range);

    setDateRange({
      start: start.toISOString().split("T")[0],
      end: today.toISOString().split("T")[0],
      display: displayText,
    });
  };

  const handleCustomRangeApply = (): void => {
    if (!tempDateRange.start || !tempDateRange.end) return;

    const sDate = new Date(tempDateRange.start);
    const eDate = new Date(tempDateRange.end);

    setDateRange({
      start: tempDateRange.start,
      end: tempDateRange.end,
      display: `${sDate.toLocaleDateString()} - ${eDate.toLocaleDateString()}`,
    });

    setShowDatePicker(false);
  };

  const filteredData = useMemo<PipelineItem[]>(() => {
    if (!dateRange.start || !dateRange.end) return [];

    const startDate = new Date(dateRange.start);
    const endDate = new Date(dateRange.end);
    endDate.setHours(23, 59, 59, 999);

    return jobseekerpipeline.filter((item: PipelineItem) => {
      const created = new Date(item.created_at);
      return created >= startDate && created <= endDate;
    });
  }, [jobseekerpipeline, dateRange]);

  const chartData = useMemo<ChartDataItem[]>(() => {
    const totals: Record<string, number> = {
      Applied: 0,
      Shortlisted: 0,
      Screening: 0,
      Interview: 0,
      Selected: 0,
      Declined: 0,
      Employed: 0,
    };

    filteredData.forEach((item: PipelineItem) => {
      const stageName = item.stage?.stage_name;
      if (stageName && totals[stageName] !== undefined) {
        totals[stageName] += 1;
      }
    });

    return Object.keys(totals).map(
      (stage: string): ChartDataItem => ({
        name: stage,
        value: totals[stage],
      }),
    );
  }, [filteredData]);

  const totalCount: number = chartData.reduce(
    (total: number, item: ChartDataItem) => total + item.value,
    0,
  );

  return (
    <div className="p-2">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm">Showing data for: {dateRange.display}</div>

        <Button
          variant="outline"
          onClick={() => setShowDatePicker(true)}
          className="flex items-center gap-2 text-sm text-Blue border-Blue"
        >
          <BsCalendar />
          {dateRange.display}
          <BsChevronDown size={14} />
        </Button>
      </div>

      {/* Dialog */}
      <Dialog open={showDatePicker} onOpenChange={setShowDatePicker}>
        <DialogContent className="max-w-2xl!">
          <DialogHeader>
            <DialogTitle>Select Date Range</DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Presets */}
            <div className="md:col-span-1 border-r pr-3">
              <h6 className="mb-3 font-semibold">Preset Ranges</h6>

              <div className="flex flex-col gap-2">
                {presetRanges.map((p) => (
                  <Button
                    key={p.value}
                    variant={filterType === p.value ? "default" : "outline"}
                    onClick={() => handlePresetRange(p.value)}
                    className="justify-start"
                  >
                    {p.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Custom */}
            <div className="md:col-span-2">
              <h6 className="mb-3 font-semibold">Custom Range</h6>

              <div className="space-y-3">
                <div>
                  <label className="text-sm mb-1 block">Start Date</label>
                  <Input
                    type="date"
                    value={tempDateRange.start}
                    onChange={(e) =>
                      setTempDateRange({
                        ...tempDateRange,
                        start: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label className="text-sm mb-1 block">End Date</label>
                  <Input
                    type="date"
                    value={tempDateRange.end}
                    onChange={(e) =>
                      setTempDateRange({
                        ...tempDateRange,
                        end: e.target.value,
                      })
                    }
                  />
                </div>

                <Button onClick={handleCustomRangeApply}>Apply</Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Chart */}
      <Card className="mt-4">
        <CardHeader>
          <CardTitle className="text-Blue">
            Applicant Pipeline Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          {totalCount === 0 ? (
            <div className="text-center py-10">
              <img
                src="/assets/images/sample-bargraph.jpg"
                alt="No Data"
                className="w-48 opacity-70 mx-auto"
              />
              <h6 className="mt-3 text-muted-foreground">
                No applicant activity found for the selected date range.
              </h6>
              <p className="text-sm text-muted-foreground">
                Try another date range.
              </p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={350}>
              <BarChart
                data={chartData}
                margin={{ top: 20, bottom: 60, left: 20 }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="name"
                  interval={0}
                  angle={-45}
                  textAnchor="end"
                  axisLine={false}
                  tickLine={false}
                />
                {/* <YAxis allowDecimals={false} /> */}
                <Tooltip />

                <Bar dataKey="value">
                  {chartData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}

                  <LabelList
                    position="top"
                    offset={12}
                    className="fill-foreground"
                    fontSize={12}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Pipeline;
