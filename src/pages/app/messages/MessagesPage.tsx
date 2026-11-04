import { Link } from "react-router-dom";
import { MessagesSquare, Search } from "lucide-react";

const JOBS_ROUTE = "/app/jobs";

const MessagesPage = () => {
  return (
    <div className="space-y-4">
      <section className="flex flex-1 items-center justify-center rounded-3xl border border-slate-200/70 bg-white px-6 py-16 text-center">
        <div className="max-w-md">
          <span className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-blue-50 text-[#1D4FA3]">
            <MessagesSquare className="size-8" aria-hidden="true" />
          </span>

          <h1 className="mt-6 text-2xl font-bold tracking-tight text-Blue">
            Welcome to messages
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Once you apply for jobs, you will be able to chat and collaborate
            here.
          </p>

          <Link
            to={JOBS_ROUTE}
            className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#1D4FA3] px-5 text-sm font-semibold text-white shadow-lg shadow-blue-900/20 transition-colors hover:bg-[#18428A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4FA3] focus-visible:ring-offset-2"
          >
            <Search className="size-4" aria-hidden="true" />
            Search for jobs
          </Link>
        </div>
      </section>
    </div>
  );
};

export default MessagesPage;
