import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { BellIcon, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQueryClient } from "@tanstack/react-query";
import { BASE_URL, FRONTEND_URL } from "@/config";
import { useUser } from "@/hooks/auth";
import { useNotifications } from "@/hooks/notifications";

export default function AppLayout() {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { data: notifications } = useNotifications({});
  const unReadNotifications = notifications?.unread_count ?? 0;

  const { data: user } = useUser();

  const accountImage = user?.profile_picture
    ? `${BASE_URL}/${user?.profile_picture.replace(/^\//, "")}`
    : `${BASE_URL}/uploads/picture/pre_photo.jpg`;

  // logout
  const handleLogout = () => {
    localStorage.clear();

    queryClient.clear();

    window.location.href = FRONTEND_URL;
  };

  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <header className="sticky top-0 z-50 bg-background flex h-16 shrink-0 items-center justify-between gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2" />
          </div>

          <div className="flex items-center gap-2 px-4">
            <Button
              variant="outline"
              size="icon"
              className="relative"
              render={<Link to="/app/notifications" />}
            >
              <BellIcon size={20} />

              {unReadNotifications > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-3 min-w-3 items-center justify-center rounded-full bg-Orange px-1 text-[10px] font-semibold text-white">
                  {unReadNotifications > 99 ? "99+" : unReadNotifications}
                </span>
              )}
            </Button>

            <ThemeToggle />

            <div className="hidden sm:block">
              <Button variant="secondary" size="icon" onClick={handleLogout}>
                <LogOut />
              </Button>
            </div>

            <div className="block sm:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button
                    variant="ghost"
                    className="relative h-9 w-9 rounded-full p-0"
                  >
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={accountImage} alt={user.username} />
                      <AvatarFallback>
                        {" "}
                        {user?.username?.charAt(0)?.toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => navigate("/app/settings")}>
                    Account
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 sm:px-8">
          <Outlet />
        </div>

        <footer className="mb-4 flex items-center justify-center w-full text-xs text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Powered by ekazi. All rights reserved.
          </p>
        </footer>
      </SidebarInset>
    </SidebarProvider>
  );
}
