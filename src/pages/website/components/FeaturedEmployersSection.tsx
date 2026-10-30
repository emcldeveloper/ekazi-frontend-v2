import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { DEFAULT_IMG, IMG_BASE } from "@/config";
import { useEmployers } from "@/hooks/employers";

// Repeat the list until a row is long enough to scroll seamlessly,
// then double it so the -50% translate loops without a visible jump.
const buildLoop = (items: any[], minItems = 10) => {
  if (!items.length) return [];
  let base = [...items];
  while (base.length < minItems) base = [...base, ...items];
  return [...base, ...base];
};

const FeaturedEmployersSection = () => {
  const navigate = useNavigate();
  const { data: jobCompanies, isLoading } = useEmployers({});

  const companies = jobCompanies?.data ?? [];

  // Two rows moving in opposite directions when there are enough logos.
  const rows = useMemo(() => {
    if (companies.length < 8) return [buildLoop(companies)];
    const mid = Math.ceil(companies.length / 2);
    return [
      buildLoop(companies.slice(0, mid)),
      buildLoop(companies.slice(mid)),
    ];
  }, [companies]);

  const openEmployer = (employer: any) =>
    navigate(`/employer/details`, { state: { client: employer } });

  return (
    <section className="relative overflow-hidden bg-white py-16">
      {/* soft background accents */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-linear-to-r from-transparent via-gray-200 to-transparent" />
        <div className="absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-Orange/10 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-Blue/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 sm:px-10">
        {/* Heading */}
        <div className="max-w-2xl">
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-Blue sm:text-4xl">
            Featured <span className="text-Orange">Employers</span>
          </h2>
        </div>
      </div>

      {/* Logos */}
      <div className="relative mt-10 space-y-5 lg:mt-12">
        {isLoading ? (
          <div className="mx-auto flex max-w-7xl gap-4 overflow-hidden px-4 sm:px-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-20 w-36 shrink-0 animate-pulse rounded-2xl bg-gray-100 sm:h-24 sm:w-44"
              />
            ))}
          </div>
        ) : companies.length === 0 ? (
          <p className="mx-auto max-w-7xl px-4 text-sm text-gray-500 sm:px-6">
            Featured employers will appear here soon.
          </p>
        ) : (
          rows.map((row, rowIdx) => (
            <div
              key={rowIdx}
              className="marquee-mask group/row relative overflow-hidden"
            >
              <div
                className={`marquee-track flex w-max gap-4 py-2 sm:gap-5 ${
                  rowIdx % 2 === 1 ? "marquee-reverse" : ""
                }`}
                style={{
                  animationDuration: `${Math.max(row.length * 2.5, 30)}s`,
                }}
              >
                {row.map((employer: any, idx: number) => {
                  const name = employer.client_name || "Employer";
                  const logoURL = employer.logo
                    ? `${IMG_BASE}/${employer.logo}`
                    : DEFAULT_IMG;
                  // Second half is the visual duplicate; hide it from screen readers.
                  const isDuplicate = idx >= row.length / 2;

                  return (
                    <button
                      key={`${employer.id}-${idx}`}
                      type="button"
                      onClick={() => openEmployer(employer)}
                      title={name}
                      aria-label={`View ${name}`}
                      aria-hidden={isDuplicate || undefined}
                      tabIndex={isDuplicate ? -1 : 0}
                      className="group relative flex h-20 w-36 shrink-0 items-center justify-center rounded-2xl border border-gray-100 bg-white px-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-lg hover:shadow-orange-500/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-Orange sm:h-24 sm:w-44"
                    >
                      <img
                        src={logoURL}
                        alt={name}
                        loading="lazy"
                        onError={(e) => {
                          if (e.currentTarget.src !== DEFAULT_IMG)
                            e.currentTarget.src = DEFAULT_IMG;
                        }}
                        className="max-h-12 max-w-full object-contain opacity-70 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0 sm:max-h-14"
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>

      <style>{`
        .marquee-track { animation: marquee-left linear infinite; }
        .marquee-reverse { animation-name: marquee-right; }
        .group\\/row:hover .marquee-track,
        .group\\/row:focus-within .marquee-track { animation-play-state: paused; }

        .marquee-mask {
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
                  mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }

        @keyframes marquee-left  { from { transform: translateX(0); }    to { transform: translateX(-50%); } }
        @keyframes marquee-right { from { transform: translateX(-50%); } to { transform: translateX(0); } }

        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; flex-wrap: wrap; justify-content: center; width: auto; }
        }
      `}</style>
    </section>
  );
};

export default FeaturedEmployersSection;

// import { useNavigate } from "react-router-dom";

// import { DEFAULT_IMG, IMG_BASE } from "@/config";
// import { useEmployers } from "@/hooks/employers";

// const FeaturedEmployersSection = () => {
//   const navigate = useNavigate();

//   const { data: jobCompanies, isLoading } = useEmployers({});

//   const safeCompanies = jobCompanies?.data ?? [];

//   const employers = [
//     ...safeCompanies,
//     ...safeCompanies,
//     ...safeCompanies,
//     ...safeCompanies,
//   ];

//   return (
//     <section className="bg-white  overflow-hidden">
//       <div className="container mx-auto px-10 py-16">
//         {/* Title */}
//         <h2 className="text-center text-3xl font-semibold text-Blue mb-10">
//           Featured Employers
//         </h2>

//         {/* Loader */}
//         {isLoading ? (
//           <div className="flex justify-center">
//             <div className="h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//           </div>
//         ) : (
//           <div className="relative w-full overflow-hidden">
//             {/* Scroll container */}
//             <div className="flex gap-4 employer-scroll">
//               {employers.map((employer, idx) => {
//                 const logoURL = employer.logo
//                   ? `${IMG_BASE}/${employer.logo}`
//                   : DEFAULT_IMG;

//                 return (
//                   <div
//                     key={`${employer.id}-${idx}`}
//                     onClick={() =>
//                       navigate(`/employer/details`, {
//                         state: { client: employer },
//                       })
//                     }
//                     className="shrink-0"
//                   >
//                     <div className="w-24 h-24 md:w-28 md:h-28 bg-white border border-white rounded-xl flex items-center justify-center hover:shadow-md transition hover:-translate-y-1 cursor-pointer">
//                       <img
//                         src={logoURL}
//                         alt={employer.client_name || "Employer"}
//                         className="max-w-full max-h-full object-contain"
//                       />
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Animation */}
//       <style>{`
//         .employer-scroll {
//           animation: scrollLeft 35s linear infinite;
//           width: max-content;
//         }

//         @keyframes scrollLeft {
//           0% {
//             transform: translateX(0);
//           }
//           100% {
//             transform: translateX(-50%);
//           }
//         }
//       `}</style>
//     </section>
//   );
// };

// export default FeaturedEmployersSection;
