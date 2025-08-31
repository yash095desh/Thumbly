'use client';

import { useState } from 'react';
import { UserButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { Sidebar } from '@/components/sidebar';
import { 
  Zap, 
  Menu,
  X
} from 'lucide-react';

export function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-gray-200 dark:from-black dark:via-neutral-900 dark:to-neutral-800">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-white/20 glass">
        <div className="flex h-16 items-center px-4 lg:px-6">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden mr-2"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
          
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Thumbly
            </span>
          </div>
          
          <div className="ml-auto flex items-center space-x-4">
            <ThemeToggle />
            <UserButton 
              appearance={{
                elements: {
                  avatarBox: "h-8 w-8"
                }
              }}
            />
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        {/* Main Content */}
        <main className="flex-1 overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}