import { useNavigate } from "react-router-dom";
import { ArrowRight, Users } from "lucide-react";

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Button } from "@/components/ui/button";

import CandidateCard from "./candidates/CandidateCard";
import { useFeaturedCandidates } from "@/hooks/candidates";

const MAX_CANDIDATES = 9;

const CandidateCardSkeleton = () => (
  <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
    <div className="flex items-center gap-4">
      <div className="h-14 w-14 animate-pulse rounded-full bg-gray-100" />
      <div className="flex-1 space-y-2">
        <div className="h-4 w-2/3 animate-pulse rounded bg-gray-100" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-gray-100" />
      </div>
    </div>
    <div className="mt-5 flex gap-2">
      <div className="h-6 w-16 animate-pulse rounded-full bg-gray-100" />
      <div className="h-6 w-20 animate-pulse rounded-full bg-gray-100" />
      <div className="h-6 w-14 animate-pulse rounded-full bg-gray-100" />
    </div>
    <div className="mt-5 h-9 w-full animate-pulse rounded-xl bg-gray-100" />
  </div>
);

const FeaturedCandidateSection = () => {
  const navigate = useNavigate();

  const { data: candidatesData, isLoading } = useFeaturedCandidates({});
  const candidates = candidatesData?.data ?? [];

  const goToCandidates = () => navigate("/candidates");

  return (
    <section className="relative overflow-hidden bg-white py-16">
      {/* background accents */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        <div className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-Orange/10 blur-3xl" />
        <div className="absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-Blue/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-10">
        {/* Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-Blue sm:text-4xl">
              Featured <span className="text-Orange">Candidates</span>
            </h2>
          </div>

          <Button
            onClick={goToCandidates}
            variant="outline"
            className="hidden h-11 rounded-full border-Blue/20 px-6 text-Blue transition hover:border-Orange hover:bg-Orange hover:text-white md:inline-flex"
          >
            Browse all candidates
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="mt-10 lg:mt-12">
          {isLoading ? (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <CandidateCardSkeleton key={i} />
              ))}
            </div>
          ) : candidates.length === 0 ? (
            <div className="rounded-3xl border-2 border-dashed border-gray-200 bg-white/60 py-12">
              <Empty>
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <Users />
                  </EmptyMedia>
                  <EmptyTitle>No Featured Candidates Yet</EmptyTitle>
                  <EmptyDescription>
                    Featured candidate profiles will appear here soon. In the
                    meantime, you can browse all candidates.
                  </EmptyDescription>
                </EmptyHeader>
              </Empty>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {candidates
                .slice(0, MAX_CANDIDATES)
                .map((candidate: any, i: number) => (
                  <div
                    key={candidate.id}
                    className="candidate-card-in h-full transition-transform duration-300 hover:-translate-y-1 [&>*]:h-full"
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    <CandidateCard candidate={candidate} />
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* Mobile "browse all" (header button is hidden on small screens) */}
        {!isLoading && (
          <div className="mt-8 md:hidden">
            <Button
              onClick={goToCandidates}
              variant="outline"
              className="h-11 w-full rounded-full border-Blue/20 text-Blue hover:border-Orange hover:bg-Orange hover:text-white"
            >
              Browse all candidates
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      <style>{`
        .candidate-card-in { animation: candidate-card-in 0.5s ease-out both; }
        @keyframes candidate-card-in {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) { .candidate-card-in { animation: none; } }
      `}</style>
    </section>
  );
};

export default FeaturedCandidateSection;

// import { useNavigate } from "react-router-dom";
// import { ArrowRight } from "lucide-react";

// import { Button } from "@/components/ui/button";

// import CandidateCard from "./candidates/CandidateCard";
// import { useFeaturedCandidates } from "@/hooks/candidates";
// import LoadingState from "@/components/loading-state";

// const FeaturedCandidateSection = () => {
//   const navigate = useNavigate();

//   const { data: candidatesData, isLoading } = useFeaturedCandidates();
//   const candidates = candidatesData?.data ?? [];

//   return (
//     <section className="w-full">
//       <div className="container mx-auto px-4 sm:px-10 py-8">
//         <div className="flex items-center justify-between">
//           <div>
//             <span className="text-Orange text-sm">Talent</span>
//             <h2 className="text-center text-3xl font-semibold text-Blue mb-10">
//               Featured Candidates
//             </h2>
//           </div>

//           {/* Browse All */}

//           <div>
//             <Button
//               variant="link"
//               onClick={() => navigate("/candidates")}
//               className="text-Blue text-base"
//             >
//               Browse all candidates <ArrowRight size={14} />
//             </Button>
//           </div>
//         </div>

//         {isLoading ? (
//           <LoadingState />
//         ) : candidates.length === 0 ? (
//           <div className="h-20 text-center">No featured candidates found</div>
//         ) : (
//           <>
//             <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//               {candidates.slice(0, 9).map((candidate: any) => (
//                 <div key={candidate.id}>
//                   <CandidateCard candidate={candidate} />
//                 </div>
//               ))}
//             </div>
//           </>
//         )}
//       </div>
//     </section>
//   );
// };

// export default FeaturedCandidateSection;
