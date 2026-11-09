import { Link } from "react-router-dom";
import { MailPlus, Send } from "lucide-react";

const APPLY_BY_EMAIL_ROUTE = "/app/external-applications/email";

const ExternalApplicationsPage = () => {
  return (
    <div className="space-y-4">
      <header className="max-w-2xl">
        <h1 className="text-2xl font-bold tracking-tight text-Blue">
          My external applications
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Keep track of the jobs you apply for outside ekazi.
        </p>
      </header>

      <section className="mt-6 flex flex-1 items-center justify-center rounded-3xl border border-slate-200/70 bg-white px-6 py-16 text-center">
        <div className="max-w-md">
          <span className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-blue-50 text-[#1D4FA3]">
            <Send className="size-8" aria-hidden="true" />
          </span>

          <h2 className="mt-6 text-xl font-bold text-Blue">
            No external applications yet
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Found a job outside ekazi? Apply by email and it will appear here.
          </p>

          <Link
            to={APPLY_BY_EMAIL_ROUTE}
            className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#1D4FA3] px-5 text-sm font-semibold text-white shadow-lg shadow-blue-900/20 transition-colors hover:bg-[#18428A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4FA3] focus-visible:ring-offset-2"
          >
            <MailPlus className="size-4" aria-hidden="true" />
            Apply by email
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ExternalApplicationsPage;
