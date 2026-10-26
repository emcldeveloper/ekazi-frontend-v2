import { useState, useEffect } from "react";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useIndustries } from "@/hooks/universals";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { SearchIcon } from "lucide-react";

interface JobFilterValues {
  search: string;
  industry: string;
}

interface InitialJobFilters {
  search?: string;
  industry?: string;
}

interface JobFiltersProps {
  onFilterChange: (filters: JobFilterValues) => void;
  initialFilters?: InitialJobFilters;
}

const JobFilters = ({ onFilterChange, initialFilters }: JobFiltersProps) => {
  const { data: industries } = useIndustries({});
  console.log(industries);

  const [search, setSearch] = useState(initialFilters?.search || "");
  const [industry, setIndustry] = useState(initialFilters?.industry || "");

  useEffect(() => {
    const timeout = setTimeout(() => {
      onFilterChange({
        search,
        industry,
      });
    }, 400);

    return () => clearTimeout(timeout);
  }, [search, industry]);

  return (
    <div className="w-full mb-6">
      <div className="flex items-center gap-4">
        {/* Industry Select */}
        <div className="flex-1 ">
          <Select
            value={industry || "all"}
            onValueChange={(value) => {
              setIndustry(value === "all" ? "" : (value ?? ""));
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All Industries" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All Industries</SelectItem>
              {industries?.map((industry: any) => (
                <SelectItem key={industry.id} value={industry?.name}>
                  {industry?.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Search Input */}
        <div className="flex-2 w-full">
          <InputGroup className="w-full">
            <InputGroupInput
              placeholder="Search jobs..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
          </InputGroup>
        </div>
      </div>
    </div>
  );
};

export default JobFilters;
