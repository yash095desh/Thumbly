'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquare, History, BookTemplate as Template, Settings, Sparkles, Image } from 'lucide-react';

const navigation = [
  { name: 'Generate', href: '/dashboard', icon: MessageSquare },
  { name: 'Templates', href: '/dashboard/templates', icon: Template },
  { name: 'History', href: '/dashboard/history', icon: History },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 lg:hidden bg-black/50"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-full flex-col border-r border-white/20 glass">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <Sparkles className="mr-2 h-5 w-5 text-purple-500" />
              AI Studio
            </h2>
            
            <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 mb-4">
              <Image className="mr-2 h-4 w-4" />
              New Thumbnail
            </Button>
          </div>
          
          <ScrollArea className="flex-1 px-3">
            <nav className="space-y-2">
              {navigation.map((item) => (
                <Button
                  key={item.name}
                  variant="ghost"
                  className="w-full justify-start text-left"
                >
                  <item.icon className="mr-3 h-4 w-4" />
                  {item.name}
                </Button>
              ))}
            </nav>
          </ScrollArea>
          
          <div className="p-6 border-t border-white/20">
            <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg p-4">
              <h3 className="font-semibold text-sm mb-2">Pro Tips</h3>
              <p className="text-xs text-muted-foreground">
                Use specific keywords and emotions to get better results from AI generation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}