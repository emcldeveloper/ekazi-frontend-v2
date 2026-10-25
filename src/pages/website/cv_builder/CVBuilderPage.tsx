import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

import Navbar from "../components/Navbar";
import { TEMPLATES } from "@/pages/app/cv_builder/data";
import { Button } from "@/components/ui/button";

const CVBuilderPage = () => {
  const navigate = useNavigate();

  const [expanded, setExpanded] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleClick = () => {
    navigate("/login");
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === TEMPLATES.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? TEMPLATES.length - 1 : prev - 1));
  };

  return (
    <div>
      <Navbar />

      <div className="max-w-6xl mx-auto my-10 px-4">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          {/* LEFT */}
          <div className="lg:col-span-7">
            <h1 className="text-3xl font-semibold text-[#2E58A6] mb-2">
              Create a Job-Winning CV in Minutes
            </h1>

            <p className="text-muted-foreground font-semibold mb-2">
              Your CV is fully portable — download it for external job
              applications or use it to apply for vacancies directly within the
              platform.
            </p>

            <div className="text-muted-foreground space-y-3 mb-3">
              <p>
                Build a professional CV in minutes — at no cost. Our platform
                enables job seekers to create a complete, structured, and
                market-ready professional profile with ease.
              </p>

              <p>
                After registering or logging in, you can develop your full
                professional profile in one place. The system guides you step by
                step to capture essential details, including personal
                information, education background, work experience, professional
                skills, certifications, and referees.
              </p>

              {expanded && (
                <>
                  <p>
                    Once completed, you can select from multiple professionally
                    designed templates and instantly switch between layouts to
                    match different job applications, industries, or preferred
                    profile length.
                  </p>

                  <p>
                    Your CV is fully portable — download it or use it to apply
                    directly within the platform.
                  </p>

                  <p>
                    Create your profile today and transform your professional
                    information into a polished CV.
                  </p>
                </>
              )}

              <button
                onClick={() => setExpanded(!expanded)}
                className="text-[#2E58A6] font-semibold hover:underline"
              >
                {expanded ? "Read Less" : "Read More"}
              </button>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button onClick={handleClick}>Build Your CV Now</Button>
            </div>
          </div>

          {/* RIGHT - CUSTOM CAROUSEL */}
          <div className="lg:col-span-5">
            <div className="relative shadow-lg rounded-2xl overflow-hidden bg-white h-[450px] flex items-center justify-center">
              <img
                src={TEMPLATES[currentIndex].image}
                alt={TEMPLATES[currentIndex].name}
                className="max-h-full max-w-full object-cover cursor-pointer"
                onClick={handleClick}
              />

              {/* Controls */}
              <button
                onClick={prevSlide}
                className="absolute left-3 bg-white/80 hover:bg-white p-2 rounded-full shadow"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-3 bg-white/80 hover:bg-white p-2 rounded-full shadow"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVBuilderPage;
