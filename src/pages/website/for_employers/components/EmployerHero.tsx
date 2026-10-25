// import DashboardMockup from "./DashboardMockup";
import { Button } from "@/components/ui/button";

export default function EmployerHero() {
  return (
    <div className="relative mx-auto max-w-7xl px-6 flex flex-col items-center gap-10 text-center">
      <div>
        <h1 className="mt-8 text-3xl md:text-5xl text-Blue capitalize font-bold">
          Hire smarter
          <br />
          Manage recruitment
          <br />
          <span className="text-Orange"> effortlessly</span>
        </h1>

        <p className="mt-8 max-w-3xl text-base leading-8 text-gray-600">
          Everything employers need to publish jobs, manage applicants,
          collaborate with hiring teams and recruit exceptional talent from one
          powerful dashboard.
        </p>

        <div className="flex items-center justify-center gap-4 mt-10">
          <Button
            onClick={() =>
              (window.location.href = `https://recruitment.ekazi.co.tz/register`)
            }
            className="px-10 py-6 text-base"
          >
            Get Started
          </Button>

          <Button
            variant="outline"
            onClick={() =>
              (window.location.href = `https://recruitment.ekazi.co.tz/request-demo`)
            }
            className="px-10 py-6 text-base"
          >
            Request Demo
          </Button>
        </div>
      </div>

      {/* <DashboardMockup /> */}
    </div>
  );
}
