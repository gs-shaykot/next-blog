"use client";

import Sidebar from "@/app/(Routes)/(profile)/Sidebar";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react"; 

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "loading") return; 

    if (status === "unauthenticated") {
      router.push("/login"); 
      return;
    }

    // if user exists but not an admin
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
      <div className="grid grid-cols-12 gap-4">
        <Sidebar />
        {/* other admin content here */}
      </div>
    );
  }

  return null;  
}
