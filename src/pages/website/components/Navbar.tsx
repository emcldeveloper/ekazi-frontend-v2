import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);

  const navigate = useNavigate();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Find Jobs", path: "/jobs" },
    { name: "Employers", path: "/employers" },
    { name: "CV Builder", path: "/cv-builder" },
    { name: "Salary Calculator", path: "/salary-calculator" },
    { name: "Pricing", path: "/pricing" },
    { name: "Articles", path: "/articles" },
    { name: "For employers", path: "/for-employers" },
  ];

  return (
    <header className="w-full bg-[#DFE3E2] shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-8 py-4">
        <div className="flex items-center justify-between h-12">
          {/* LOGO */}
          <NavLink to="/">
            <img
              src="/assets/logos/logo.png"
              alt="eKazi"
              className="w-20 md:w-24"
            />
          </NavLink>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `relative text-sm font-medium text-Blue text-decoration-none
                  after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 
                  after:bg-Orange after:transition-all after:duration-300
                  hover:after:w-full
                  ${isActive ? "after:w-1/2" : ""}`
                }
              >
                {item.name}
              </NavLink>
            ))}

            {/* <ForEmployersNav /> */}
          </nav>

          {/* AUTH BUTTONS */}
          <div className="hidden text-sm lg:flex items-center gap-4">
            <Button
              variant="link"
              onClick={() => navigate("/login")}
              className="text-Blue hover:text-Orange font-medium"
            >
              Log in
            </Button>

            <Button
              onClick={() => navigate("/register")}
              className="bg-Orange hover:bg-orange-500"
            >
              Register
            </Button>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="lg:hidden"
          >
            {mobileMenu ? (
              <X size={28} className="text-Orange" />
            ) : (
              <Menu size={28} className="text-Blue" />
            )}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileMenu && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <div className="flex flex-col px-6 py-4 space-y-4">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenu(false)}
                className="text-Blue text-sm text-decoration-none font-medium hover:text-Orange"
              >
                {item.name}
              </NavLink>
            ))}

            {/* <ForEmployersNav /> */}

            <Separator />

            <Button
              variant="outline"
              onClick={() => navigate("/login")}
              className="text-Blue hover:text-Orange font-medium"
            >
              Log in
            </Button>

            <Button
              onClick={() => navigate("/register")}
              className="bg-Orange hover:bg-orange-500"
            >
              Register
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
