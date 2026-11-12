import * as React from "react";

import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  ChevronDown,
  type LucideIcon,
  LayoutDashboardIcon,
  UserIcon,
  SearchIcon,
  Folder,
  MessageCircle,
  Calculator,
  LibraryBig,
  SquareArrowOutUpRight,
  Archive,
  Settings,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

type NavItem = {
  title: string;
  url: string;
  icon: LucideIcon;
  items?: {
    title: string;
    url: string;
  }[];
};

/**
 * A route is active when the current path is exactly the url
 * OR is nested under it (e.g. /app/cover-letters/create).
 * The trailing "/" prevents /app/cover from matching /app/cover-letters.
 */
const isPathActive = (url: string, pathname: string) => {
  if (!url || url === "#") return false;
  return pathname === url || pathname.startsWith(url + "/");
};

// This is sample data.
const navItems: NavItem[] = [
  {
    title: "Dashboard",
    url: "/app/dashboard",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Profile",
    url: "/app/profile",
    icon: UserIcon,
  },
  {
    title: "Find Jobs",
    url: "/app/jobs",
    icon: SearchIcon,
  },
  {
    title: "My Applications",
    url: "/app/applications",
    icon: Folder,
  },
  {
    title: "External Applications",
    url: "/app/external-applications",
    icon: SquareArrowOutUpRight,
  },
  {
    title: "Career Briefcase",
    url: "#",
    icon: Archive,
    items: [
      {
        title: "CVs",
        url: "/app/templates",
      },
      {
        title: "Cover Letters",
        url: "/app/cover-letters",
      },
      {
        title: "Other Files",
        url: "/app/other-files",
      },
    ],
  },
  {
    title: "Messages",
    url: "/app/messages",
    icon: MessageCircle,
  },
  {
    title: "Salary Calculator",
    url: "/app/salary-calculator",
    icon: Calculator,
  },
  {
    title: "Resources",
    url: "#",
    icon: LibraryBig,
    items: [
      {
        title: "Articles",
        url: "/app/articles",
      },
    ],
  },
  {
    title: "Settings",
    url: "/app/settings",
    icon: Settings,
  },
];

// Titles of parent menus that contain the currently active child route
const getActiveParentTitles = (pathname: string) =>
  navItems
    .filter((item) =>
      item.items?.some((subItem) => isPathActive(subItem.url, pathname)),
    )
    .map((item) => item.title);

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation();

  const [openMenus, setOpenMenus] = React.useState<string[]>(() =>
    // auto open parent if child route is active (including nested routes)
    getActiveParentTitles(location.pathname),
  );

  // Keep the parent open when navigating to a nested route from elsewhere
  React.useEffect(() => {
    const activeParents = getActiveParentTitles(location.pathname);
    if (activeParents.length === 0) return;

    setOpenMenus((prev) => {
      const missing = activeParents.filter((title) => !prev.includes(title));
      return missing.length ? [...prev, ...missing] : prev;
    });
  }, [location.pathname]);

  const toggleMenu = (title: string) => {
    setOpenMenus((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title],
    );
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<Link to="/dashboard" />}>
              <div className="flex size-20 items-center justify-center overflow-hidden rounded-lg ">
                <img
                  src="/assets/logos/logo.png"
                  alt="logo"
                  className="w-full"
                />
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const Icon = item.icon;

                const isParentActive =
                  isPathActive(item.url, location.pathname) ||
                  item.items?.some((subItem) =>
                    isPathActive(subItem.url, location.pathname),
                  );

                // ITEMS WITH CHILDREN
                if (item.items) {
                  const isOpen = openMenus.includes(item.title);

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        onClick={() => toggleMenu(item.title)}
                        isActive={isParentActive}
                        className="cursor-pointer"
                      >
                        <Icon />

                        <span className="flex-1">{item.title}</span>

                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </SidebarMenuButton>

                      {isOpen && (
                        <SidebarMenuSub>
                          {item.items.map((subItem) => {
                            const isSubActive = isPathActive(
                              subItem.url,
                              location.pathname,
                            );

                            return (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton isActive={isSubActive}>
                                  <Link to={subItem.url} className="w-full">
                                    <span>{subItem.title}</span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            );
                          })}
                        </SidebarMenuSub>
                      )}
                    </SidebarMenuItem>
                  );
                }

                // NORMAL NAV ITEM
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      isActive={isParentActive}
                      render={<Link to={item.url} />}
                    >
                      <Icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
