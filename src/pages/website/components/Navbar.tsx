import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Briefcase,
  Building2,
  Calculator,
  ChevronDown,
  CreditCard,
  FileText,
  Home,
  Menu,
  Newspaper,
  Users,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

type NavItem = {
  name: string;
  path: string;
  icon: React.ElementType;
  desc?: string;
};

const mainItems: NavItem[] = [
  { name: "Home", path: "/", icon: Home },
  { name: "Find Jobs", path: "/jobs", icon: Briefcase },
  { name: "Candidates", path: "/candidates", icon: Users },
  { name: "Employers", path: "/employers", icon: Building2 },
  { name: "Pricing", path: "/pricing", icon: CreditCard },
  { name: "Articles", path: "/articles", icon: Newspaper },
];

const toolItems: NavItem[] = [
  {
    name: "CV Builder",
    path: "/cv-builder",
    icon: FileText,
    desc: "Create a standout CV in minutes",
  },
  {
    name: "Salary Calculator",
    path: "/salary-calculator",
    icon: Calculator,
    desc: "Estimate your take-home pay",
  },
];

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toolsRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const toolsActive = toolItems.some((t) => pathname.startsWith(t.path));

  // Glass effect once the page scrolls
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenu(false);
    setToolsOpen(false);
  }, [pathname]);

  // Lock body scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileMenu ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenu]);

  // Close dropdown on outside click / Escape
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (toolsRef.current && !toolsRef.current.contains(e.target as Node)) {
        setToolsOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setToolsOpen(false);
        setMobileMenu(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const pillClass = (active: boolean) =>
    `relative flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium no-underline transition-all duration-300 ${
      active
        ? "bg-white text-Orange shadow-md"
        : "text-Blue hover:bg-white hover:shadow-sm"
    }`;

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "bg-white/80 shadow-lg shadow-black/5 backdrop-blur-xl"
            : "bg-white/20 backdrop-blur-xl backdrop-saturate-150 border-b border-white/30 shadow-[0_4px_30px_rgba(0,0,0,0.05)]"
        }`}
      >
        {/* Brand accent line */}
        <div className="h-1 w-full bg-gradient-to-r from-Blue via-Orange to-Blue" />

        <div className="container mx-auto px-4 sm:px-8">
          <div
            className={`flex items-center justify-between transition-all duration-300 ${
              scrolled ? "h-16" : "h-20"
            }`}
          >
            {/* LOGO */}
            <NavLink
              to="/"
              className="shrink-0 transition-transform hover:scale-105"
            >
              <img
                src="/assets/logos/logo.png"
                alt="eKazi"
                className="w-20 md:w-24"
              />
            </NavLink>

            {/* DESKTOP NAV — pill container */}
            <nav className="hidden lg:flex items-center gap-1 rounded-full border border-white/60 bg-black/5 p-1.5">
              {mainItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/"}
                  className={({ isActive }) => pillClass(isActive)}
                >
                  {item.name}
                </NavLink>
              ))}

              {/* Tools dropdown */}
              <div ref={toolsRef} className="relative">
                <button
                  type="button"
                  onClick={() => setToolsOpen((o) => !o)}
                  aria-expanded={toolsOpen}
                  aria-haspopup="true"
                  className={pillClass(toolsActive || toolsOpen)}
                >
                  Tools
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-300 ${toolsOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <div
                  className={`absolute right-0 top-full mt-3 w-72 origin-top-right rounded-2xl border border-gray-100 bg-white p-2 shadow-2xl transition-all duration-200 ${
                    toolsOpen
                      ? "visible scale-100 opacity-100"
                      : "invisible scale-95 opacity-0"
                  }`}
                >
                  {toolItems.map(({ name, path, icon: Icon, desc }) => (
                    <NavLink
                      key={path}
                      to={path}
                      className="group flex items-start gap-3 rounded-xl p-3 no-underline transition-colors hover:bg-orange-50"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-Orange transition-transform group-hover:scale-110">
                        <Icon size={20} />
                      </span>
                      <span>
                        <span className="block text-sm font-semibold text-Blue">
                          {name}
                        </span>
                        <span className="block text-xs text-gray-500">
                          {desc}
                        </span>
                      </span>
                    </NavLink>
                  ))}
                </div>
              </div>
            </nav>

            {/* AUTH BUTTONS */}
            <div className="hidden lg:flex items-center gap-2">
              <Button
                variant="ghost"
                onClick={() => navigate("/login")}
                className="rounded-full font-medium text-Blue hover:bg-white hover:text-Orange"
              >
                Log in
              </Button>

              <Button
                onClick={() => navigate("/register")}
                className="group rounded-full bg-gradient-to-r from-Orange to-orange-500 px-6 font-semibold text-white shadow-lg shadow-orange-500/30 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-orange-500/40"
              >
                Register
                <ArrowRight
                  size={16}
                  className="ml-1 transition-transform group-hover:translate-x-1"
                />
              </Button>
            </div>

            {/* MOBILE MENU BUTTON */}
            <button
              type="button"
              onClick={() => setMobileMenu(true)}
              aria-label="Open menu"
              aria-expanded={mobileMenu}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-Blue shadow-sm transition hover:text-Orange lg:hidden"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden ${mobileMenu ? "" : "pointer-events-none"}`}
        aria-hidden={!mobileMenu}
      >
        {/* Backdrop */}
        <div
          onClick={() => setMobileMenu(false)}
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
            mobileMenu ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Panel */}
        <aside
          className={`absolute right-0 top-0 flex h-full w-[85%] max-w-sm flex-col bg-white shadow-2xl transition-transform duration-300 ease-out ${
            mobileMenu ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
            <img src="/assets/logos/logo.png" alt="eKazi" className="w-20" />
            <button
              type="button"
              onClick={() => setMobileMenu(false)}
              aria-label="Close menu"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-Blue transition hover:rotate-90 hover:text-Orange"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-4 py-6">
            <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
              Menu
            </p>
            {[
              ...mainItems.slice(0, 3),
              ...toolItems,
              ...mainItems.slice(3),
            ].map(({ name, path, icon: Icon }, i) => (
              <NavLink
                key={path}
                to={path}
                end={path === "/"}
                style={{
                  transitionDelay: mobileMenu ? `${i * 40 + 100}ms` : "0ms",
                }}
                className={({ isActive }) =>
                  `mb-1 flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium no-underline transition-all duration-300 ${
                    mobileMenu
                      ? "translate-x-0 opacity-100"
                      : "translate-x-6 opacity-0"
                  } ${
                    isActive
                      ? "bg-orange-50 text-Orange"
                      : "text-Blue hover:bg-gray-50 hover:text-Orange"
                  }`
                }
              >
                <Icon size={18} />
                {name}
              </NavLink>
            ))}
          </nav>

          <div className="space-y-3 border-t border-gray-100 p-6">
            <Button
              variant="outline"
              onClick={() => navigate("/login")}
              className="w-full rounded-full border-Blue font-medium text-Blue hover:text-Orange"
            >
              Log in
            </Button>
            <Button
              onClick={() => navigate("/register")}
              className="w-full rounded-full bg-gradient-to-r from-Orange to-orange-500 font-semibold text-white shadow-lg shadow-orange-500/30"
            >
              Create free account
              <ArrowRight size={16} className="ml-1" />
            </Button>
          </div>
        </aside>
      </div>
    </>
  );
};

export default Navbar;
