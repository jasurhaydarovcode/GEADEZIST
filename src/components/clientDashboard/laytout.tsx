// components/clientDashboard/Layout.tsx
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import React from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <Sidebar />

            <div className="flex-1 flex flex-col">
                {/* Navbar */}
                <Navbar />

                {/* Main Content */}
                <main className="p-8">
                    {children}
                </main>
            </div>
        </div>
    );
};``

export default Layout;
