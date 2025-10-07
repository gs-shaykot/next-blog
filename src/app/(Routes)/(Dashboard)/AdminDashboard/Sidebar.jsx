"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  RiDashboardLine,
  RiArticleLine,
  RiAddLine,
  RiRobotLine,
  RiUserLine,
  RiMenuLine,
  RiArrowLeftSLine,
  RiArrowRightSLine
} from "react-icons/ri";
import { useState } from "react";

const links = [
  { href: "/AdminDashboard", label: "Dashboard", icon: RiDashboardLine },
  { href: "/AdminDashboard/posts", label: "All Posts", icon: RiArticleLine },
  { href: "/AdminDashboard/create", label: "Create Post", icon: RiAddLine },
  { href: "/AdminDashboard/ai", label: "AI Content", icon: RiRobotLine },
  { href: "/AdminDashboard/users", label: "All Users", icon: RiUserLine },
];

export default function Sidebar({ children }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 h-screen bg-white border-r border-gray-200 
          transition-all duration-300 ease-in-out z-40
          ${collapsed ? "lg:w-52" : "lg:w-64"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {!collapsed && (
            <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <RiArrowRightSLine className="w-5 h-5" />
            ) : (
              <RiArrowLeftSLine className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {links.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`
                  flex items-center px-4 py-3 rounded-lg transition-all duration-200
                  ${collapsed ? "justify-center" : ""}
                  ${
                    isActive
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-gray-700 hover:bg-gray-100"
                  }
                `}
                aria-label={collapsed ? link.label : undefined}
                title={collapsed ? link.label : undefined}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 ${!collapsed && "mr-3"}`} />
                {!collapsed && <span className="font-medium">{link.label}</span>}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Mobile header */}
        <header className="lg:hidden sticky top-0 z-20 bg-white border-b border-gray-200 p-4">
          <button
            onClick={() => setMobileOpen(true)}
            className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Open menu"
          >
            <RiMenuLine className="w-6 h-6" />
          </button>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}