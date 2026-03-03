import React from 'react';
import Sidebar from './Sidebar';

const MainLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-background-light dark:bg-background-dark overflow-hidden font-display">
      {/* Functional responsive Sidebar */}
      <Sidebar />

      <main className="flex-1 flex flex-col overflow-hidden relative min-w-0">
        {/* 
                  * Note: Mobile Header is now integrated into Sidebar's hamburger toggle 
                  * for a cleaner, unified navigation experience.
                  */}
        <div className="flex-1 overflow-y-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
