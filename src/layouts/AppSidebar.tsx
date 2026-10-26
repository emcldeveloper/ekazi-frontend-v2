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
  SquareUser,
  MessageCircle,
  Calculator,
  LibraryBig,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { isRouteActive } from "@/utils/helpers";

type NavItem = {
  title: string;
  url: string;
  icon: LucideIcon;
  items?: {
    title: string;
    url: string;
  }[];
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
    url: "#",
    icon: Folder,
    items: [
      {
        title: "Applied Jobs",
        url: "/app/applications",
      },
      {
        title: "Saved Jobs",
        url: "/app/saved-jobs",
      },
      {
        title: "Matched Jobs",
        url: "/app/matched-jobs",
      },
    ],
  },
  {
    title: "CV Builder",
    url: "#",
    icon: SquareUser,
    items: [
      {
        title: "Templates",
        url: "#",
      },
      {
        title: "Bookmarked",
        url: "#",
      },
      {
        title: "Cover Letter",
        url: "/app/cover-letter",
      },
      {
        title: "My CVs",
        url: "#",
      },
    ],
  },
  {
    title: "Messages",
    url: "#",
    icon: MessageCircle,
  },
  {
    title: "Salary Calculator",
    url: "#",
    icon: Calculator,
  },
  {
    title: "Resources",
    url: "#",
    icon: LibraryBig,
    items: [
      {
        title: "Articles",
        url: "#",
      },
    ],
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation();

  // Custom Logo for each company
  //   const { data: companyProfile } = useProfile();
  //   const profile = companyProfile?.data;

  const [openMenus, setOpenMenus] = React.useState<string[]>(() => {
    // auto open parent if child route is active
    return navItems
      .filter((item) =>
        item.items?.some((subItem) => subItem.url === location.pathname),
      )
      .map((item) => item.title);
  });

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
                  isRouteActive(item.url) ||
                  item.items?.some((subItem) => isRouteActive(subItem.url));

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
                            const isSubActive =
                              location.pathname === subItem.url;

                            return (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton isActive={isSubActive}>
                                  <Link to={subItem.url}>
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
