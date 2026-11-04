import { Bookmark } from "lucide-react";

const SavedJobsPage = () => {
  return (
    <div className="space-y-4">
      <section className="mt-6 flex flex-1 items-center justify-center rounded-3xl border border-slate-200/70 bg-white px-6 py-16 text-center">
        <div className="max-w-md">
          <span className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-blue-50 text-[#1D4FA3]">
            <Bookmark className="size-8" aria-hidden="true" />
          </span>

          <h2 className="mt-6 text-xl font-bold text-Blue">
            No saved jobs yet
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            When you save a job, it will appear here.
          </p>
        </div>
      </section>
    </div>
  );
};

export default SavedJobsPage;
