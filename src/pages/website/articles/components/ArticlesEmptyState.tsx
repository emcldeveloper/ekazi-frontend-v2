import { FileSearch, Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ArticlesEmptyStateProps {
  isSearching?: boolean;
  onClearSearch?: () => void;
}

const ArticlesEmptyState = ({
  isSearching = false,
  onClearSearch,
}: ArticlesEmptyStateProps) => {
  return (
    <div className="flex min-h-[350px] flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-16 text-center">
      <div className="mb-5 flex size-16 items-center justify-center rounded-2xl bg-orange-50 text-Orange">
        {isSearching ? (
          <FileSearch size={28} strokeWidth={1.5} />
        ) : (
          <Newspaper size={28} strokeWidth={1.5} />
        )}
      </div>

      <h3 className="text-xl font-bold text-gray-900">
        {isSearching
          ? "No matching articles found"
          : "No articles available yet"}
      </h3>

      <p className="mt-2 max-w-sm text-sm leading-relaxed text-gray-500">
        {isSearching
          ? "We couldn't find any articles matching your search. Try another keyword or clear your search."
          : "We're preparing helpful career tips, guides and insights. Check back soon for new articles."}
      </p>

      {isSearching && (
        <Button
          type="button"
          onClick={onClearSearch}
          className="mt-6 rounded-full bg-Orange px-6 text-white hover:bg-Orange/90"
        >
          Clear search
        </Button>
      )}
    </div>
  );
};

export default ArticlesEmptyState;
