"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Bot,
  SquarePen,
  FileText,
  Users,
  LayoutDashboard,
  ChevronRight,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const navItems = [
  {
    title: "Dashboard",
    url: "/AdminDashboard",
    icon: LayoutDashboard,
  },
  {
    title: "AI",
    url: "/AdminDashboard/ai",
    icon: Bot,
  },
  {
    title: "Create",
    url: "/AdminDashboard/create",
    icon: SquarePen,
  },
  {
    title: "Posts",
    url: "/AdminDashboard/posts",
    icon: FileText,
  },
  {
    title: "Users",
    url: "/AdminDashboard/users",
    icon: Users,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold">
            A
          </div>
          <div>
            <p className="text-sm font-semibold">Admin Panel</p>
            <p className="text-xs text-muted-foreground">Manage your site</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    tooltip={item.title}
                  >
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        <div className="px-4 py-2 text-xs text-muted-foreground">
          © 2025 Admin Dashboard
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}