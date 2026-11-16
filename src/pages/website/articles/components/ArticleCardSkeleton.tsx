const ArticleCardSkeleton = () => {
  return (
    <div className="animate-pulse rounded-xl border border-gray-100 bg-white p-3 shadow-sm sm:p-4">
      <div className="aspect-[16/9] rounded-lg bg-gray-200" />

      <div className="space-y-3 px-1 pt-4">
        <div className="flex items-center gap-2">
          <div className="size-2 rounded-full bg-gray-200" />
          <div className="h-3 w-20 rounded bg-gray-200" />
        </div>

        <div className="space-y-2">
          <div className="h-5 w-full rounded bg-gray-200" />
          <div className="h-5 w-3/4 rounded bg-gray-200" />
        </div>

        <div className="space-y-2 pt-1">
          <div className="h-3 w-full rounded bg-gray-100" />
          <div className="h-3 w-full rounded bg-gray-100" />
          <div className="h-3 w-2/3 rounded bg-gray-100" />
        </div>

        <div className="flex items-center justify-between pt-4">
          <div className="h-3 w-24 rounded bg-gray-100" />
          <div className="h-3 w-16 rounded bg-gray-100" />
        </div>
      </div>
    </div>
  );
};

export default ArticleCardSkeleton;
