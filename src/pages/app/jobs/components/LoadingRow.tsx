export function LoadingRow() {
  return (
    <li className="flex animate-pulse items-center gap-4 rounded-3xl border border-slate-200/70 bg-white p-4 transition-colors dark:border-slate-700/70 dark:bg-slate-900 sm:p-5">
      {/* Icon skeleton */}
      <div className="size-12 shrink-0 rounded-2xl bg-[#ECECF3] dark:bg-slate-700" />

      {/* Content skeleton */}
      <div className="min-w-0 flex-1 space-y-2.5">
        <div className="h-4 w-1/2 rounded-full bg-[#ECECF3] dark:bg-slate-700" />
        <div className="h-3 w-1/3 rounded-full bg-[#ECECF3] dark:bg-slate-700" />
        <div className="h-3 w-3/5 rounded-full bg-[#ECECF3] dark:bg-slate-700" />
      </div>
    </li>
  );
}
