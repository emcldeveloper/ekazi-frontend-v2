import { useState } from "react";

import Navbar from "../components/Navbar";
import EmployerPricing from "./components/EmployerPricing";
import JobseekerPricing from "./components/JobseekerPricing";

const PricingPage = () => {
  const [activeTab, setActiveTab] = useState("applicants");

  return (
    <div>
      <Navbar />

      <div className="container mx-auto max-w-6xl my-10 px-4">
        <div className="text-center">
          {/* Heading */}
          <h1 className="text-4xl font-semibold text-Blue mb-6">
            Our Pricing Plans
          </h1>

          {/* Toggle */}
          <div className="inline-flex bg-gray-200 rounded-full p-1 mb-14">
            <button
              onClick={() => setActiveTab("applicants")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition ${
                activeTab === "applicants"
                  ? "bg-white shadow text-gray-900"
                  : "text-gray-500"
              }`}
            >
              Job Seekers
            </button>

            <button
              onClick={() => setActiveTab("employers")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition ${
                activeTab === "employers"
                  ? "bg-white shadow text-gray-900"
                  : "text-gray-500"
              }`}
            >
              Employers
            </button>
          </div>

          {/* Pricing Cards */}
          {activeTab === "applicants" && <JobseekerPricing />}

          {activeTab === "employers" && <EmployerPricing />}
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
