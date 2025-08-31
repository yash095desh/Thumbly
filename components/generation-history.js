'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { 
  History, 
  RotateCcw, 
  Heart, 
  Download,
  Clock
} from 'lucide-react';

export function GenerationHistory({ images, onRegenerate }) {
  const formatTime = (timestamp) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(timestamp);
  };

  return (
    <Card className="h-full glass border-white/20">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <History className="h-5 w-5" />
          Recent History
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-0">
        <ScrollArea className="h-[calc(100vh-12rem)]">
          <div className="space-y-3 p-6">
            {images.length === 0 ? (
              <div className="text-center py-12">
                <Clock className="h-8 w-8 mx-auto text-muted-foreground mb-3" />
                <p className="text-sm text-muted-foreground">
                  Your generation history will appear here
                </p>
              </div>
            ) : (
              images.map((image) => (
                <div key={image.id} className="group space-y-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="aspect-video rounded-lg overflow-hidden border border-white/20">
                    <img 
                      src={image.url} 
                      alt="Generated thumbnail"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {formatTime(image.timestamp)}
                      </span>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="h-6 w-6"
                          onClick={() => onRegenerate(image.prompt)}
                        >
                          <RotateCcw className="h-3 w-3" />
                        </Button>
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="h-6 w-6"
                        >
                          <Download className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    
                    <p className="text-xs leading-relaxed text-muted-foreground line-clamp-3">
                      {image.prompt}
                    </p>
                    
                    {image.liked && (
                      <Badge variant="secondary" className="bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400">
                        <Heart className="h-3 w-3 mr-1 fill-current" />
                        Liked
                      </Badge>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}