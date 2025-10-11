"use client";
import { useSession } from "next-auth/react";
import { useRouter, usePathname, useParams } from "next/navigation";
import { useEffect } from "react";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function AdminDashboardLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const segments = pathname.split('/').filter(Boolean)

  const currentPage = segments.length > 1
    ? segments[segments.length - 1]
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase())
    : "Overview";


  useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }
    if (session?.user?.role !== "admin") {
      router.push("/unauthorized");
    }
  }, [status, session, router, pathname]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin h-10 w-10 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Checking admin authentication...</p>
        </div>
      </div>
    );
  }

  if (session?.user?.role === "admin") {
    return (
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar />
          <SidebarInset>
            <header
              className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href="/AdminDashboard">
                        BlogCrafts
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>{currentPage}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>
            <main className="flex-1 p-6 bg-gray-50">
              {children}
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    );
  }

  return null;
}
