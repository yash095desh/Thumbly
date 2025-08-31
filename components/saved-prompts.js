'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Bookmark, 
  Search, 
  RotateCcw, 
  Trash2,
  Heart,
  Clock
} from 'lucide-react';

// Mock saved prompts
const mockSavedPrompts = [
  {
    id: 1,
    name: 'Epic Gaming Setup',
    prompt: 'Gaming thumbnail with RGB setup, neon colors, dramatic lighting, shocked expression',
    category: 'Gaming',
    uses: 12,
    lastUsed: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    liked: true,
  },
  {
    id: 2,
    name: 'Tech Review Clean',
    prompt: 'Clean tech review thumbnail with modern gadget, minimalist design, professional lighting',
    category: 'Tech',
    uses: 8,
    lastUsed: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    liked: false,
  },
  {
    id: 3,
    name: 'Travel Adventure',
    prompt: 'Beautiful travel thumbnail with stunning mountain landscape, adventure theme, wanderlust colors',
    category: 'Travel',
    uses: 15,
    lastUsed: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    liked: true,
  },
];

export function SavedPrompts({ onSelectPrompt }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [savedPrompts, setSavedPrompts] = useState(mockSavedPrompts);

  const filteredPrompts = savedPrompts.filter(prompt => 
    prompt.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prompt.prompt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prompt.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatLastUsed = (date) => {
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  const toggleLike = (id) => {
    setSavedPrompts(prev => 
      prev.map(prompt => 
        prompt.id === id ? { ...prompt, liked: !prompt.liked } : prompt
      )
    );
  };

  const deletePrompt = (id) => {
    setSavedPrompts(prev => prev.filter(prompt => prompt.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <Bookmark className="h-5 w-5" />
          Saved Prompts
        </h3>
        <p className="text-sm text-muted-foreground">
          Reuse your favorite prompts and successful thumbnail styles
        </p>
      </div>
      
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search saved prompts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>
      
      <ScrollArea className="h-[400px]">
        <div className="space-y-3">
          {filteredPrompts.length === 0 ? (
            <div className="text-center py-8">
              <Bookmark className="h-8 w-8 mx-auto text-muted-foreground mb-3" />
              <p className="text-sm text-muted-foreground">
                {searchTerm ? 'No prompts match your search' : 'No saved prompts yet'}
              </p>
            </div>
          ) : (
            filteredPrompts.map((savedPrompt) => (
              <Card key={savedPrompt.id} className="group glass border-white/20">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">
                      {savedPrompt.name}
                    </CardTitle>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button 
                        size="icon"
                        variant="ghost"
                        className="h-6 w-6"
                        onClick={() => toggleLike(savedPrompt.id)}
                      >
                        <Heart className={`h-3 w-3 ${savedPrompt.liked ? 'fill-red-500 text-red-500' : ''}`} />
                      </Button>
                      <Button 
                        size="icon"
                        variant="ghost"
                        className="h-6 w-6 text-red-500 hover:text-red-600"
                        onClick={() => deletePrompt(savedPrompt.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {savedPrompt.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      Used {savedPrompt.uses} times
                    </span>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                    {savedPrompt.prompt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {formatLastUsed(savedPrompt.lastUsed)}
                    </div>
                    
                    <Button 
                      size="sm"
                      variant="outline"
                      onClick={() => onSelectPrompt(savedPrompt.prompt)}
                      className="text-xs"
                    >
                      <RotateCcw className="mr-1 h-3 w-3" />
                      Use Again
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}