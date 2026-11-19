import { BriefcaseBusiness } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { capitalizeText } from "@/utils/helpers";

export interface JobCategory {
  category_id: number;
  category_name: string;
  total_positions: number;
}

interface JobsCategorySidebarProps {
  categories: JobCategory[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
  isLoading?: boolean;
}

const JobsCategorySidebar = ({
  categories,
  selectedCategory,
  onCategoryChange,
  isLoading = false,
}: JobsCategorySidebarProps) => {
  const totalPositions = categories.reduce(
    (sum, category) => sum + category.total_positions,
    0,
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Jobs by Category</CardTitle>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="h-10 w-full rounded-lg" />
            ))}
          </div>
        ) : categories.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 py-10 text-center">
            <BriefcaseBusiness className="size-8 text-muted-foreground/50" />
            <p className="text-sm text-muted-foreground">
              No job categories available
            </p>
          </div>
        ) : (
          <div className="space-y-1">
            {/* All categories */}
            <button
              type="button"
              onClick={() => onCategoryChange("")}
              className={cn(
                "flex w-full cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-3 text-left transition-colors",
                selectedCategory === ""
                  ? "bg-Blue/10 font-semibold text-Blue dark:text-white"
                  : "text-muted-foreground hover:bg-muted",
              )}
            >
              <span className="flex items-center gap-2 text-sm">
                All Categories
              </span>

              <span className="rounded-md bg-background px-2 py-1 text-xs font-semibold text-muted-foreground">
                {totalPositions}
              </span>
            </button>

            <div className="my-2 border-t" />

            {/* Category list */}
            {categories.map((category) => {
              const isActive =
                selectedCategory === String(category.category_id);

              return (
                <button
                  key={category.category_id}
                  type="button"
                  onClick={() => onCategoryChange(String(category.category_id))}
                  className={cn(
                    "group flex w-full cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-3 text-left transition-all",
                    isActive
                      ? "bg-Blue/10 font-medium text-Blue dark:text-white"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <span className="min-w-0 flex-1 text-sm leading-5">
                    {capitalizeText(category.category_name)}
                  </span>

                  <span
                    className={cn(
                      "shrink-0 rounded-md px-2 py-1 text-xs font-semibold",
                      isActive
                        ? "bg-Blue text-white"
                        : "bg-muted text-muted-foreground group-hover:bg-background",
                    )}
                  >
                    {category.total_positions}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default JobsCategorySidebar;
