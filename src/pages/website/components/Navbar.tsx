import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Building2,
  Calculator,
  ChevronDown,
  FileText,
  LogIn,
  Menu,
  UserPlus,
} from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

/* ------------------------------------------------------------------ */
/* Config                                                              */
/* ------------------------------------------------------------------ */

const ROUTES = {
  candidateLogin: "/login",
  candidateRegister: "/register",
  employerLogin: "https://recruitment.ekazi.co.tz/login",
  employerRegister: "https://recruitment.ekazi.co.tz/register",
};

type NavItem = {
  name: string;
  path: string;
  desc?: string;
  icon?: React.ElementType;
};

const mainItems: NavItem[] = [
  { name: "Home", path: "/" },
  { name: "Find Jobs", path: "/jobs" },
  { name: "Job Seekers", path: "/candidates" },
  { name: "Pricing", path: "/pricing" },
  { name: "Articles", path: "/articles" },
];

const toolItems: NavItem[] = [
  {
    name: "CV Builder",
    path: "/cv-builder",
    desc: "Create a standout CV in minutes",
    icon: FileText,
  },
  {
    name: "Salary Calculator",
    path: "/salary-calculator",
    desc: "Estimate your take-home pay",
    icon: Calculator,
  },
];

const employerItems: NavItem[] = [
  {
    name: "Hire on eKazi",
    path: "/employers",
    desc: "See how eKazi helps you hire",
    icon: Building2,
  },
  {
    name: "Employer log in",
    path: ROUTES.employerLogin,
    desc: "Manage jobs and applicants",
    icon: LogIn,
  },
  {
    name: "Create employer account",
    path: ROUTES.employerRegister,
    desc: "Start posting jobs today",
    icon: UserPlus,
  },
];

const isExternal = (path: string) => /^https?:\/\//.test(path);

/* ------------------------------------------------------------------ */
/* Desktop pieces                                                      */
/* ------------------------------------------------------------------ */

const linkBase =
  "relative inline-flex h-full items-center gap-1 px-3 text-base font-semibold no-underline transition-colors outline-none focus-visible:text-foreground after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:rounded-full after:transition-colors";

const linkState = (active: boolean) =>
  active
    ? "text-foreground after:bg-Orange"
    : "text-muted-foreground hover:text-foreground after:bg-transparent";

const Logo = () => (
  <>
    <img
      src="/assets/logos/logo.png"
      alt="eKazi"
      className="w-20 dark:hidden md:w-22"
    />
    <img
      src="/assets/logos/ekazi-white.png"
      alt="eKazi"
      className="hidden w-20 dark:block md:w-22"
    />
  </>
);

const MenuEntry = ({ item }: { item: NavItem }) => {
  const Icon = item.icon;
  const body = (
    <span className="flex items-start gap-3 py-0.5">
      {Icon && (
        <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md bg-muted text-Orange">
          <Icon size={16} />
        </span>
      )}
      <span className="flex flex-col gap-0.5">
        <span className="text-base font-semibold text-foreground">
          {item.name}
        </span>
        {item.desc && (
          <span className="text-xs text-muted-foreground">{item.desc}</span>
        )}
      </span>
    </span>
  );

  return isExternal(item.path) ? (
    <DropdownMenuItem render={<a href={item.path} />}>{body}</DropdownMenuItem>
  ) : (
    <DropdownMenuItem render={<NavLink to={item.path} />}>
      {body}
    </DropdownMenuItem>
  );
};

type NavDropdownProps = {
  label: string;
  items: NavItem[];
  active: boolean;
};

const NavDropdown = ({ label, items, active }: NavDropdownProps) => (
  <DropdownMenu>
    <DropdownMenuTrigger
      render={
        <button
          type="button"
          className={`group ${linkBase} ${linkState(active)} cursor-pointer data-popup-open:text-foreground`}
        />
      }
    >
      {label}
      <ChevronDown
        size={15}
        className="transition-transform duration-200 group-data-popup-open:rotate-180"
      />
    </DropdownMenuTrigger>
    <DropdownMenuContent align="start" sideOffset={0} className="w-full p-4">
      <DropdownMenuGroup>
        {items.map((item) => (
          <MenuEntry key={item.path} item={item} />
        ))}
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
);

/* ------------------------------------------------------------------ */
/* Mobile pieces                                                       */
/* ------------------------------------------------------------------ */

const mobileLink = (active: boolean) =>
  `block rounded-md px-3 py-2.5 text-base font-semibold no-underline transition-colors ${
    active
      ? "bg-muted text-foreground"
      : "text-muted-foreground hover:bg-muted hover:text-foreground"
  }`;

const MobileSection = ({
  title,
  items,
}: {
  title: string;
  items: NavItem[];
}) => (
  <section className="flex flex-col gap-0.5">
    <h2 className="px-3 pb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
      {title}
    </h2>
    {items.map((item) =>
      isExternal(item.path) ? (
        <a key={item.path} href={item.path} className={mobileLink(false)}>
          {item.name}
        </a>
      ) : (
        <NavLink
          key={item.path}
          to={item.path}
          end={item.path === "/"}
          className={({ isActive }) => mobileLink(isActive)}
        >
          {item.name}
        </NavLink>
      ),
    )}
  </section>
);

/* ------------------------------------------------------------------ */
/* Navbar                                                              */
/* ------------------------------------------------------------------ */

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const toolsActive = toolItems.some((t) => pathname.startsWith(t.path));
  const employersActive = pathname.startsWith("/employers");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu after navigating
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b bg-background transition-shadow duration-200 ${
        scrolled ? "border-border shadow-sm" : "border-transparent"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center gap-6 px-4 sm:px-8 lg:h-18">
        <div className="flex flex-1 items-center">
          <NavLink to="/" aria-label="eKazi home" className="shrink-0">
            <Logo />
          </NavLink>
        </div>

        {/* Primary navigation */}
        <nav
          aria-label="Main"
          className="hidden h-full items-center justify-center lg:flex"
        >
          {mainItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) => `${linkBase} ${linkState(isActive)}`}
            >
              {item.name}
            </NavLink>
          ))}
          <NavDropdown label="Tools" items={toolItems} active={toolsActive} />
          <NavDropdown
            label="For employers"
            items={employerItems}
            active={employersActive}
          />
        </nav>

        {/* Job seeker auth */}
        <div className="hidden flex-1 items-center justify-end gap-2 lg:flex">
          <Button
            variant="ghost"
            onClick={() => navigate(ROUTES.candidateLogin)}
            className="text-base font-semibold"
          >
            Log in
          </Button>
          <Button
            onClick={() => navigate(ROUTES.candidateRegister)}
            className="text-base font-semibold bg-Orange hover:bg-Orange/80"
          >
            Register
          </Button>
        </div>

        {/* Mobile menu */}
        <div className="lg:hidden">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              render={<Button variant="ghost" size="icon" />}
              aria-label="Open menu"
            >
              <Menu />
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>

              <nav
                aria-label="Mobile"
                className="flex flex-1 flex-col gap-6 overflow-y-auto px-4"
              >
                <MobileSection title="Explore" items={mainItems} />
                <MobileSection title="Tools" items={toolItems} />
                <MobileSection title="For employers" items={employerItems} />
              </nav>

              <div className="flex flex-col gap-3 px-4 pb-6">
                <Separator />
                <p className="text-xs text-muted-foreground">
                  Looking for a job?
                </p>
                <Button
                  onClick={() => navigate(ROUTES.candidateRegister)}
                  className=" bg-Orange hover:bg-Orange/80"
                >
                  Register
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate(ROUTES.candidateLogin)}
                >
                  Log in
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
