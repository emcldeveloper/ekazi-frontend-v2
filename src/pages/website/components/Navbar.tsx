import { Button } from "@/components/ui/button";
import {
  Briefcase,
  Building2,
  Calculator,
  ChevronDown,
  CreditCard,
  FileText,
  Home,
  LogIn,
  Menu,
  Newspaper,
  PlusCircle,
  Users,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

/* ------------------------------------------------------------------ */
/* Config                                                              */
/* ------------------------------------------------------------------ */

// Adjust employer auth routes if they differ in your router.
const ROUTES = {
  candidateLogin: "/login",
  candidateRegister: "/register",
  employerLogin: "https://recruitment.ekazi.co.tz/login",
  employerRegister: "https://recruitment.ekazi.co.tz/register",
};

type NavItem = {
  name: string;
  path: string;
  icon: React.ElementType;
  desc?: string;
};

const mainItems: NavItem[] = [
  { name: "Home", path: "/", icon: Briefcase },
  { name: "Find Jobs", path: "/jobs", icon: Briefcase },
  { name: "Job Seekers", path: "/candidates", icon: Users },
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

const employerItems: NavItem[] = [
  {
    name: "Hire on eKazi",
    path: "/employers",
    icon: Building2,
    desc: "See how eKazi helps you hire",
  },
  {
    name: "Log in",
    path: ROUTES.employerLogin,
    icon: LogIn,
    desc: "Manage jobs and applicants",
  },
];

/* ------------------------------------------------------------------ */
/* Shared pieces                                                       */
/* ------------------------------------------------------------------ */

const isExternal = (path: string) => /^https?:\/\//.test(path);

// Router link for internal paths, plain <a> for external URLs
type ItemLinkProps = {
  to: string;
  end?: boolean;
  role?: string;
  className: string | ((state: { isActive: boolean }) => string);
  children: React.ReactNode;
};

const ItemLink = ({ to, end, role, className, children }: ItemLinkProps) =>
  isExternal(to) ? (
    <a
      href={to}
      role={role}
      className={
        typeof className === "function"
          ? className({ isActive: false })
          : className
      }
    >
      {children}
    </a>
  ) : (
    <NavLink to={to} end={end} role={role} className={className}>
      {children}
    </NavLink>
  );

const linkBase =
  "relative inline-flex h-full items-center gap-1 px-3 text-sm font-medium no-underline transition-colors";

// Underline indicator for the active page (industry standard vs. pills)
const indicator = (active: boolean) =>
  `after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:rounded-full after:transition-colors ${
    active
      ? "after:bg-Orange text-Blue"
      : "after:bg-transparent text-gray-600 hover:text-Blue"
  }`;

type DropdownProps = {
  label: string;
  items: NavItem[];
  active: boolean;
  open: boolean;
  onToggle: () => void;
  align?: "left" | "right";
};

const Dropdown = ({
  label,
  items,
  active,
  open,
  onToggle,
  align = "left",
}: DropdownProps) => (
  <div className="relative h-full">
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      aria-haspopup="menu"
      className={`${linkBase} ${indicator(active || open)}`}
    >
      {label}
      <ChevronDown
        size={15}
        className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      />
    </button>

    <div
      role="menu"
      className={`absolute top-full ${align === "right" ? "right-0" : "left-0"} w-72 rounded-xl border border-gray-200 bg-white p-1.5 shadow-xl transition-all duration-150 ${
        open
          ? "visible translate-y-0 opacity-100"
          : "invisible -translate-y-1 opacity-0"
      }`}
    >
      {items.map(({ name, path, icon: Icon, desc }) => (
        <ItemLink
          key={path}
          to={path}
          role="menuitem"
          className="group flex items-start gap-3 rounded-lg p-2.5 no-underline transition-colors hover:bg-gray-50"
        >
          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-orange-50 text-Orange">
            <Icon size={18} />
          </span>
          <span>
            <span className="block text-sm font-semibold text-Blue group-hover:text-Orange">
              {name}
            </span>
            {desc && (
              <span className="block text-xs text-gray-500">{desc}</span>
            )}
          </span>
        </ItemLink>
      ))}
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/* Navbar                                                              */
/* ------------------------------------------------------------------ */

type OpenMenu = "tools" | "employers" | null;

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [openMenu, setOpenMenu] = useState<OpenMenu>(null);
  const [scrolled, setScrolled] = useState(false);
  const desktopRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const toolsActive = toolItems.some((t) => pathname.startsWith(t.path));
  const employersActive = pathname.startsWith("/employers");

  const toggle = (m: Exclude<OpenMenu, null>) =>
    setOpenMenu((cur) => (cur === m ? null : m));

  // Subtle border/shadow once the page scrolls
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close everything on route change
  useEffect(() => {
    setMobileMenu(false);
    setOpenMenu(null);
  }, [pathname]);

  // Lock body scroll while the drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileMenu ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenu]);

  // Outside click / Escape
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!desktopRef.current?.contains(e.target as Node)) setOpenMenu(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenMenu(null);
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

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full border-b bg-white transition-shadow duration-200 ${
          scrolled ? "border-gray-200 shadow-sm" : "border-transparent"
        }`}
      >
        <div
          ref={desktopRef}
          className="container mx-auto flex h-20 items-center gap-6 px-4 sm:px-8"
        >
          {/* Logo */}
          <NavLink to="/" aria-label="eKazi home" className="shrink-0">
            <img
              src="/assets/logos/logo.png"
              alt="eKazi"
              className="w-20 md:w-22"
            />
          </NavLink>

          {/* Primary nav */}
          <nav aria-label="Main" className="hidden h-full items-center lg:flex">
            {mainItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `${linkBase} ${indicator(isActive)}`
                }
              >
                {item.name}
              </NavLink>
            ))}
            <Dropdown
              label="Tools"
              items={toolItems}
              active={toolsActive}
              open={openMenu === "tools"}
              onToggle={() => toggle("tools")}
            />
          </nav>

          {/* Right side */}
          <div className="ml-auto hidden h-full items-center gap-2 lg:flex">
            <Button
              variant="ghost"
              onClick={() => navigate(ROUTES.candidateLogin)}
              className="font-medium text-Blue hover:bg-gray-50 hover:text-Orange"
            >
              Sign in
            </Button>
            <Button
              onClick={() => navigate(ROUTES.candidateRegister)}
              className="bg-Orange font-semibold text-white hover:bg-orange-500"
            >
              Register
            </Button>

            <span className="mx-2 h-6 w-px bg-gray-200" aria-hidden />

            <Dropdown
              label="For employers"
              items={employerItems}
              active={employersActive}
              open={openMenu === "employers"}
              onToggle={() => toggle("employers")}
              align="right"
            />
          </div>

          {/* Mobile trigger */}
          <button
            type="button"
            onClick={() => setMobileMenu(true)}
            aria-label="Open menu"
            aria-expanded={mobileMenu}
            className="ml-auto flex h-10 w-10 items-center justify-center rounded-md text-Blue transition hover:bg-gray-100 lg:hidden"
          >
            <Menu size={22} />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-60 lg:hidden ${mobileMenu ? "" : "pointer-events-none"}`}
        aria-hidden={!mobileMenu}
      >
        <div
          onClick={() => setMobileMenu(false)}
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
            mobileMenu ? "opacity-100" : "opacity-0"
          }`}
        />

        <aside
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className={`absolute right-0 top-0 flex h-full w-[85%] max-w-sm flex-col bg-white shadow-xl transition-transform duration-300 ease-out ${
            mobileMenu ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex h-16 items-center justify-between border-b border-gray-200 px-5">
            <img src="/assets/logos/logo.png" alt="eKazi" className="w-20" />
            <button
              type="button"
              onClick={() => setMobileMenu(false)}
              aria-label="Close menu"
              className="flex h-10 w-10 items-center justify-center rounded-md text-Blue transition hover:bg-gray-100"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-3 py-4">
            <MobileSection
              title="Explore"
              items={[{ name: "Home", path: "/", icon: Home }, ...mainItems]}
            />
            <MobileSection title="Tools" items={toolItems} />
            <MobileSection title="For employers" items={employerItems} />
          </nav>

          {/* Job seeker auth */}
          <div className="space-y-2 border-t border-gray-200 p-5">
            <p className="text-xs text-gray-500">Looking for a job?</p>
            <Button
              onClick={() => navigate(ROUTES.candidateRegister)}
              className="w-full bg-Orange font-semibold text-white hover:bg-orange-500"
            >
              Register
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate(ROUTES.candidateLogin)}
              className="w-full border-gray-300 font-medium text-Blue hover:text-Orange"
            >
              Sign in
            </Button>
          </div>
        </aside>
      </div>
    </>
  );
};

const MobileSection = ({
  title,
  items,
}: {
  title: string;
  items: NavItem[];
}) => (
  <div className="mb-4">
    <p className="mb-1 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
      {title}
    </p>
    {items.map(({ name, path, icon: Icon }) => (
      <ItemLink
        key={path}
        to={path}
        end={path === "/"}
        className={({ isActive }) =>
          `flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium no-underline transition-colors ${
            isActive ? "bg-orange-50 text-Orange" : "text-Blue hover:bg-gray-50"
          }`
        }
      >
        {name}
      </ItemLink>
    ))}
  </div>
);

export default Navbar;

// import { Button } from "@/components/ui/button";
// import {
//   ArrowRight,
//   Briefcase,
//   Building2,
//   Calculator,
//   ChevronDown,
//   CreditCard,
//   FileText,
//   Home,
//   Menu,
//   Newspaper,
//   Users,
//   X,
// } from "lucide-react";
// import { useEffect, useRef, useState } from "react";
// import { NavLink, useLocation, useNavigate } from "react-router-dom";

// type NavItem = {
//   name: string;
//   path: string;
//   icon: React.ElementType;
//   desc?: string;
// };

// const mainItems: NavItem[] = [
//   { name: "Home", path: "/", icon: Home },
//   { name: "Find Jobs", path: "/jobs", icon: Briefcase },
//   { name: "Job seekers", path: "/candidates", icon: Users },
//   { name: "Employers", path: "/employers", icon: Building2 },
//   { name: "Pricing", path: "/pricing", icon: CreditCard },
//   { name: "Articles", path: "/articles", icon: Newspaper },
// ];

// const toolItems: NavItem[] = [
//   {
//     name: "CV Builder",
//     path: "/cv-builder",
//     icon: FileText,
//     desc: "Create a standout CV in minutes",
//   },
//   {
//     name: "Salary Calculator",
//     path: "/salary-calculator",
//     icon: Calculator,
//     desc: "Estimate your take-home pay",
//   },
// ];

// const Navbar = () => {
//   const [mobileMenu, setMobileMenu] = useState(false);
//   const [toolsOpen, setToolsOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const toolsRef = useRef<HTMLDivElement>(null);

//   const navigate = useNavigate();
//   const { pathname } = useLocation();
//   const toolsActive = toolItems.some((t) => pathname.startsWith(t.path));

//   // Glass effect once the page scrolls
//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 8);
//     onScroll();
//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   // Close menus on route change
//   useEffect(() => {
//     setMobileMenu(false);
//     setToolsOpen(false);
//   }, [pathname]);

//   // Lock body scroll while the mobile drawer is open
//   useEffect(() => {
//     document.body.style.overflow = mobileMenu ? "hidden" : "";
//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [mobileMenu]);

//   // Close dropdown on outside click / Escape
//   useEffect(() => {
//     const onClick = (e: MouseEvent) => {
//       if (toolsRef.current && !toolsRef.current.contains(e.target as Node)) {
//         setToolsOpen(false);
//       }
//     };
//     const onKey = (e: KeyboardEvent) => {
//       if (e.key === "Escape") {
//         setToolsOpen(false);
//         setMobileMenu(false);
//       }
//     };
//     document.addEventListener("mousedown", onClick);
//     document.addEventListener("keydown", onKey);
//     return () => {
//       document.removeEventListener("mousedown", onClick);
//       document.removeEventListener("keydown", onKey);
//     };
//   }, []);

//   const pillClass = (active: boolean) =>
//     `relative flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium no-underline transition-all duration-300 ${
//       active
//         ? "bg-white text-Orange shadow-md"
//         : "text-Blue hover:bg-white hover:shadow-sm"
//     }`;

//   return (
//     <>
//       <header
//         className={`sticky top-0 z-50 w-full transition-all duration-300 ${
//           scrolled
//             ? "bg-white/80 shadow-lg shadow-black/5 backdrop-blur-xl"
//             : "bg-white/20 backdrop-blur-xl backdrop-saturate-150 border-b border-white/30 shadow-[0_4px_30px_rgba(0,0,0,0.05)]"
//         }`}
//       >
//         {/* Brand accent line */}
//         <div className="h-0.5 w-full bg-linear-to-r from-Blue via-Orange to-Blue" />

//         <div className="container mx-auto px-4 sm:px-8">
//           <div
//             className={`flex items-center justify-between transition-all duration-300 ${
//               scrolled ? "h-16" : "h-20"
//             }`}
//           >
//             {/* LOGO */}
//             <NavLink
//               to="/"
//               className="shrink-0 transition-transform hover:scale-105"
//             >
//               <img
//                 src="/assets/logos/logo.png"
//                 alt="eKazi"
//                 className="w-20 md:w-24"
//               />
//             </NavLink>

//             {/* DESKTOP NAV — pill container */}
//             <nav className="hidden lg:flex items-center gap-1 rounded-full border border-white/60  p-1.5">
//               {mainItems.map((item) => (
//                 <NavLink
//                   key={item.path}
//                   to={item.path}
//                   end={item.path === "/"}
//                   className={({ isActive }) => pillClass(isActive)}
//                 >
//                   {item.name}
//                 </NavLink>
//               ))}

//               {/* Tools dropdown */}
//               <div ref={toolsRef} className="relative">
//                 <button
//                   type="button"
//                   onClick={() => setToolsOpen((o) => !o)}
//                   aria-expanded={toolsOpen}
//                   aria-haspopup="true"
//                   className={pillClass(toolsActive || toolsOpen)}
//                 >
//                   Tools
//                   <ChevronDown
//                     size={16}
//                     className={`transition-transform duration-300 ${toolsOpen ? "rotate-180" : ""}`}
//                   />
//                 </button>

//                 <div
//                   className={`absolute right-0 top-full mt-3 w-72 origin-top-right rounded-2xl border border-gray-100 bg-white p-2 shadow-2xl transition-all duration-200 ${
//                     toolsOpen
//                       ? "visible scale-100 opacity-100"
//                       : "invisible scale-95 opacity-0"
//                   }`}
//                 >
//                   {toolItems.map(({ name, path, icon: Icon, desc }) => (
//                     <NavLink
//                       key={path}
//                       to={path}
//                       className="group flex items-start gap-3 rounded-xl p-3 no-underline transition-colors hover:bg-orange-50"
//                     >
//                       <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-Orange transition-transform group-hover:scale-110">
//                         <Icon size={20} />
//                       </span>
//                       <span>
//                         <span className="block text-sm font-semibold text-Blue">
//                           {name}
//                         </span>
//                         <span className="block text-xs text-gray-500">
//                           {desc}
//                         </span>
//                       </span>
//                     </NavLink>
//                   ))}
//                 </div>
//               </div>
//             </nav>

//             {/* AUTH BUTTONS */}
//             <div className="hidden lg:flex items-center gap-2">
//               <Button
//                 variant="ghost"
//                 onClick={() => navigate("/login")}
//                 className="rounded-full font-medium text-Blue hover:bg-white hover:text-Orange"
//               >
//                 Log in
//               </Button>

//               <Button
//                 size="lg"
//                 onClick={() => navigate("/register")}
//                 className="bg-Orange hover:bg-orange-500"
//               >
//                 Register
//                 <ArrowRight
//                   size={16}
//                   className="ml-1 transition-transform group-hover:translate-x-1"
//                 />
//               </Button>
//             </div>

//             {/* MOBILE MENU BUTTON */}
//             <button
//               type="button"
//               onClick={() => setMobileMenu(true)}
//               aria-label="Open menu"
//               aria-expanded={mobileMenu}
//               className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-Blue shadow-sm transition hover:text-Orange lg:hidden"
//             >
//               <Menu size={22} />
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* MOBILE DRAWER */}
//       <div
//         className={`fixed inset-0 z-60 lg:hidden ${mobileMenu ? "" : "pointer-events-none"}`}
//         aria-hidden={!mobileMenu}
//       >
//         {/* Backdrop */}
//         <div
//           onClick={() => setMobileMenu(false)}
//           className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
//             mobileMenu ? "opacity-100" : "opacity-0"
//           }`}
//         />

//         {/* Panel */}
//         <aside
//           className={`absolute right-0 top-0 flex h-full w-[85%] max-w-sm flex-col bg-white shadow-2xl transition-transform duration-300 ease-out ${
//             mobileMenu ? "translate-x-0" : "translate-x-full"
//           }`}
//         >
//           <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
//             <img src="/assets/logos/logo.png" alt="eKazi" className="w-20" />
//             <button
//               type="button"
//               onClick={() => setMobileMenu(false)}
//               aria-label="Close menu"
//               className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-Blue transition hover:rotate-90 hover:text-Orange"
//             >
//               <X size={20} />
//             </button>
//           </div>

//           <nav className="flex-1 overflow-y-auto px-4 py-6">
//             <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
//               Menu
//             </p>
//             {[
//               ...mainItems.slice(0, 3),
//               ...toolItems,
//               ...mainItems.slice(3),
//             ].map(({ name, path }, i) => (
//               <NavLink
//                 key={path}
//                 to={path}
//                 end={path === "/"}
//                 style={{
//                   transitionDelay: mobileMenu ? `${i * 40 + 100}ms` : "0ms",
//                 }}
//                 className={({ isActive }) =>
//                   `mb-1 flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium no-underline transition-all duration-300 ${
//                     mobileMenu
//                       ? "translate-x-0 opacity-100"
//                       : "translate-x-6 opacity-0"
//                   } ${
//                     isActive
//                       ? "bg-orange-50 text-Orange"
//                       : "text-Blue hover:bg-gray-50 hover:text-Orange"
//                   }`
//                 }
//               >
//                 {name}
//               </NavLink>
//             ))}
//           </nav>

//           <div className="space-y-3 border-t border-gray-100 p-6">
//             <Button
//               variant="outline"
//               onClick={() => navigate("/login")}
//               className="w-full rounded-full border-Blue font-medium text-Blue hover:text-Orange"
//             >
//               Log in
//             </Button>
//             <Button
//               onClick={() => navigate("/register")}
//               className="bg-Orange hover:bg-orange-500 w-full"
//             >
//               Create account
//               <ArrowRight size={16} className="ml-1" />
//             </Button>
//           </div>
//         </aside>
//       </div>
//     </>
//   );
// };

// export default Navbar;
