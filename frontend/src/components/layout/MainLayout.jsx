import Sidebar from './Sidebar';

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display">
      {/* Skip Navigation Link for Accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-primary focus:text-white focus:rounded-xl focus:font-black focus:text-sm focus:uppercase focus:tracking-widest focus:shadow-lg"
      >
        Skip to main content
      </a>

      {/* Desktop: Side-by-side layout | Mobile: Stacked layout */}
      <div className="flex">
        {/* Sidebar - hidden on mobile, visible on md+ */}
        <Sidebar />

        {/* Main Content Area */}
        <main id="main-content" className="flex-1 flex flex-col min-h-screen min-w-0">
          {/* Content scrolls independently */}
          <div className="flex-1 overflow-y-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
