"use client"

import { ChevronRight } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavMain({ items }) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const isActive = pathname === item.url;
          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={isActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <Link href={item.url}>
                  <SidebarMenuButton
                    tooltip={item.title}
                    className={`cursor-pointer flex items-center gap-2 
                      ${isActive
                        ? "bg-blue-600 text-white hover:bg-blue-700 hover:text-white"
                        : "hover:bg-gray-100 text-gray-800"
                      }`}
                  >
                    {item.icon && <item.icon className="h-4 w-4" />}
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </Link>

                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => {
                      const subIsActive = pathname === subItem.url;
                      return (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            asChild
                            className={`cursor-pointer ${subIsActive
                              ? "text-blue-600 font-semibold"
                              : "text-gray-700 hover:text-blue-500"
                              }`}
                          >
                            <Link href={subItem.url}>{subItem.title}</Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      );
                    })}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}