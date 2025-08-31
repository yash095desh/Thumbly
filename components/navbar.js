'use client';

import { SignInButton, SignUpButton, useAuth } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { Zap } from 'lucide-react';

export function Navbar() {
  const { isSignedIn } = useAuth();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/20 glass">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Thumbly
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            {!isSignedIn && (
              <>
                <SignInButton redirectUrl="/sign-in">
                  <Button variant="ghost" className="text-foreground">
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton redirectUrl="/sign-up">
                  <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
                    Get Started
                  </Button>
                </SignUpButton>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
