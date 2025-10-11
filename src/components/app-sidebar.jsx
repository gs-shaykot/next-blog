"use client"
import * as React from "react"
import {
  BookOpen,
  Bot,
  House,
  Newspaper,
  Users,
  SquareTerminal,
} from "lucide-react"
import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useSession } from "next-auth/react"
import { usePathname } from "next/navigation"

export function AppSidebar(props) {
  const { data: session } = useSession()
  const user = session?.user || {} // avoid undefined
  const imagePath = '/feather-pen.png';

  const pathname = usePathname()

  const data = {
    user: {
      name: user.name || "Guest",
      email: user.email || "No email",
      avatar: user.image || "/default-avatar.png",
    },
    teams: [
      {
        name: "BlogCrafts",
        logo: imagePath,
      },
    ],
    navMain: [
      {
        title: "Dashboard",
        url: "/AdminDashboard",
        icon: SquareTerminal,
        isActive: true,
      },
      {
        title: "AI Generate",
        url: "/AdminDashboard/ai_content_generate",
        icon: Bot,
      },
      {
        title: "Create Post",
        url: "/AdminDashboard/create_post",
        icon: BookOpen,
      },
      {
        title: "All Posts",
        url: "/AdminDashboard/all_posts",
        icon: Newspaper,
      },
      {
        title: "All Users",
        url: "/AdminDashboard/all_users",
        icon: Users,
      },
      {
        title: "Home",
        url: "/",
        icon: House,
      },
    ],
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} activePath={pathname} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
