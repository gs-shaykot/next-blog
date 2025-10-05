
import Sidebar from './Sidebar';
import React from 'react'; 

export default function AdminDashboardLayout({ children }) {
    return (
        <div className="flex min-h-screen">
            <Sidebar className="w-64 fixed h-full" />
            <main className="ml-64 flex-1 p-6">
                {children}
            </main>
        </div>
    );
}
