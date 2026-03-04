import Sidebar from './Sidebar';

const MainLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-background-light dark:bg-background-dark overflow-hidden font-display">
      {/* Skip Navigation Link for Accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-primary focus:text-white focus:rounded-xl focus:font-black focus:text-sm focus:uppercase focus:tracking-widest focus:shadow-lg"
      >
        Skip to main content
      </a>

      {/* Functional responsive Sidebar */}
      <Sidebar />

      <main id="main-content" className="flex-1 flex flex-col overflow-hidden relative min-w-0">
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
