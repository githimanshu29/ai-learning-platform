// // provider.jsx (Corrected Version)

// import React from 'react';
// import { SidebarProvider,SidebarInset } from "@/components/ui/sidebar";
// import AppSidebar from './_components/AppSidebar';
// import AppHeader from './_components/AppHeader';
// import AnimatedBackground from '../AnimatedBackground';

// const WorkspaceProvider = ({ children }) => {
//   return (
//     <SidebarProvider>
//       {/* This main div contains everything and fills the screen */}
//       <div className="relative h-screen w-full flex overflow-hidden">
        
//         {/* The animated background sits here, behind everything else */}
//         <AnimatedBackground />

//         {/* Your AppSidebar component. 
//           IMPORTANT: Make sure its main div has a transparent or glass background.
//           Example: className="w-64 h-full bg-slate-900/50 backdrop-blur-lg border-r border-slate-700"
//         */}
//         <AppSidebar />
        
//         {/* This container holds the header and the main content */}
//         <div className='flex-1 flex flex-col overflow-hidden'>
          
//           {/* Your AppHeader component.
//             IMPORTANT: We wrap it to give it a z-index and a glass background
//             so it's always visible and on top.
//           */}
//           <header className="relative z-10 bg-slate-900/50 backdrop-blur-lg border-b border-slate-700">
//              <AppHeader />
//           </header>
          
//           {/* This is the main content area for your cards.
//             It's now transparent and scrolls independently.
//           */}
//           <main className='flex-1 p-8 md:p-10 overflow-y-auto'>
//             {children}
//           </main>
//         </div>
//       </div>
//     </SidebarProvider>
//   );
// }

// export default WorkspaceProvider;

// provider.jsx (Final Corrected Version with Push Layout)
"use client"; 

import React from 'react';
import { SidebarProvider, useSidebar } from "@/components/ui/sidebar"; 
import AppSidebar from './_components/AppSidebar';
import AppHeader from './_components/AppHeader';
import AnimatedBackground from '../AnimatedBackground';

// This helper component is no longer needed with the new layout structure.

const WorkspaceProvider = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="relative h-screen w-full overflow-hidden">
        
        <AnimatedBackground />

        {/* The sidebar is now part of the main layout flow */}
        <AppSidebar />
        
        {/* This div will now correctly calculate its position based on the sidebar's state */}
        <MainContent />
        
      </div>
    </SidebarProvider>
  );
}

/**
 * This component contains the logic to adjust the main content's margin
 * based on the sidebar's state, ensuring a perfect fit.
 */
const MainContent = () => {
    const { state } = useSidebar();

    return (
        <div 
            className={`
                absolute top-0 left-0 h-full flex flex-col transition-all duration-300 ease-in-out
                ${state === 'expanded' ? 'w-[calc(100%-16rem)] ml-[16rem]' : 'w-[calc(100%-3rem)] ml-[3rem]'}
            `}
        >
            <header className="relative z-10 bg-slate-900/50 backdrop-blur-lg border-b border-slate-700/80">
                <AppHeader />
            </header>
            
            <main className='flex-1 p-8 md:p-10 overflow-y-auto'>
                {/* We need to pass the children down to the main content area */}
                {/* This requires a small change in how we render the provider's children */}
            </main>
        </div>
    );
}


// We need to adjust the main provider to pass children correctly
const FinalWorkspaceProvider = ({ children }) => {
    return (
        <SidebarProvider>
            <div className="relative h-screen w-full overflow-hidden">
                <AnimatedBackground />
                <AppSidebar />
                {/* We pass the children to a modified MainContent that can accept them */}
                <MainContentWithChildren>{children}</MainContentWithChildren>
            </div>
        </SidebarProvider>
    )
}


const MainContentWithChildren = ({ children }) => {
    const { state } = useSidebar();

    return (
        <div 
            className={`
                absolute top-0 h-full flex flex-col transition-all duration-300 ease-in-out
                ${state === 'expanded' ? 'left-[16rem] w-[calc(100%-16rem)]' : 'left-[3rem] w-[calc(100%-3rem)]'}
            `}
        >
            <header className="relative z-10 bg-slate-900/50 backdrop-blur-lg border-b border-slate-700/80">
                <AppHeader />
            </header>
            
            <main className='flex-1 p-8 md:p-10 overflow-y-auto'>
                {children}
            </main>
        </div>
    );
}


export default FinalWorkspaceProvider;
