import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const ForEmployersNav = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on ESC
  useEffect(() => {
    const handleEsc = (e: any) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <div ref={ref} className="relative">
      {/* NAV ITEM */}
      <span
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-1 cursor-pointer text-sm font-medium text-Blue
        after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 
        after:bg-Orange after:transition-all after:duration-300
        hover:after:w-full"
      >
        For Employers
        <ChevronDown
          className={`w-4 h-4 transition ${open ? "rotate-180" : ""}`}
        />
      </span>

      {/* DROPDOWN */}
      <div
        className={`absolute left-0 mt-3 w-52 bg-white shadow-lg rounded-xl z-50 transition-all duration-200 origin-top
        ${
          open
            ? "opacity-100 scale-100 visible"
            : "opacity-0 scale-95 invisible"
        }`}
      >
        <div className="flex flex-col p-2">
          <a
            href="https://api.ekazi.co.tz/login"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 rounded-md text-sm text-Blue hover:bg-gray-100 hover:text-Orange"
            onClick={() => setOpen(false)}
          >
            Employer Login
          </a>

          <a
            href="https://api.ekazi.co.tz/register"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 rounded-md text-sm text-Blue hover:bg-gray-100 hover:text-Orange"
            onClick={() => setOpen(false)}
          >
            Employer Register
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForEmployersNav;
