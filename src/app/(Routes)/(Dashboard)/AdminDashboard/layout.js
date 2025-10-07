"use client";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { AppSidebar } from "./Sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

export default function AdminDashboardLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

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
            <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center gap-2 border-b bg-background px-4">
              <SidebarTrigger />
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center gap-2">
                <span className="font-semibold">Admin Dashboard</span>
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
