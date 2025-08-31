'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Gamepad2, 
  Laptop, 
  MapPin, 
  Video,
  BookOpen,
  Music,
  Utensils,
  Dumbbell
} from 'lucide-react';

const templates = [
  {
    id: 'gaming',
    name: 'Gaming Thumbnail',
    description: 'Perfect for gaming videos and streams',
    icon: Gamepad2,
    color: 'from-red-500 to-orange-500',
    prompt: 'Epic gaming thumbnail with neon colors, dramatic lighting, character in action pose, bold text overlay, trending gaming aesthetic',
    tags: ['Gaming', 'Neon', 'Action'],
  },
  {
    id: 'tech',
    name: 'Tech Review',
    description: 'Clean and professional for tech content',
    icon: Laptop,
    color: 'from-blue-500 to-cyan-500',
    prompt: 'Clean tech review thumbnail with modern gadget, minimalist design, professional lighting, tech-focused layout',
    tags: ['Tech', 'Clean', 'Professional'],
  },
  {
    id: 'travel',
    name: 'Travel Vlog',
    description: 'Adventurous and vibrant travel content',
    icon: MapPin,
    color: 'from-green-500 to-emerald-500',
    prompt: 'Beautiful travel thumbnail with stunning landscape, vibrant colors, adventure theme, wanderlust aesthetic',
    tags: ['Travel', 'Adventure', 'Vibrant'],
  },
  {
    id: 'vlog',
    name: 'Personal Vlog',
    description: 'Friendly and engaging for vlogs',
    icon: Video,
    color: 'from-purple-500 to-pink-500',
    prompt: 'Friendly vlog thumbnail with warm lighting, engaging expression, personal brand colors, lifestyle aesthetic',
    tags: ['Vlog', 'Personal', 'Warm'],
  },
  {
    id: 'educational',
    name: 'Educational',
    description: 'Professional and trustworthy',
    icon: BookOpen,
    color: 'from-indigo-500 to-purple-500',
    prompt: 'Educational thumbnail with clean layout, infographic elements, professional design, knowledge-focused aesthetic',
    tags: ['Education', 'Clean', 'Trustworthy'],
  },
  {
    id: 'music',
    name: 'Music Video',
    description: 'Dynamic and artistic for music',
    icon: Music,
    color: 'from-pink-500 to-rose-500',
    prompt: 'Dynamic music thumbnail with artistic elements, vibrant colors, rhythm-inspired design, musical aesthetic',
    tags: ['Music', 'Artistic', 'Dynamic'],
  },
  {
    id: 'food',
    name: 'Cooking Show',
    description: 'Appetizing and warm for food content',
    icon: Utensils,
    color: 'from-orange-500 to-red-500',
    prompt: 'Delicious food thumbnail with appetizing presentation, warm lighting, culinary focus, mouth-watering aesthetic',
    tags: ['Food', 'Warm', 'Appetizing'],
  },
  {
    id: 'fitness',
    name: 'Fitness',
    description: 'Energetic and motivational',
    icon: Dumbbell,
    color: 'from-emerald-500 to-teal-500',
    prompt: 'High-energy fitness thumbnail with dynamic pose, motivational elements, athletic aesthetic, strength-focused design',
    tags: ['Fitness', 'Energy', 'Motivational'],
  },
];

export function PresetTemplates({ onSelectTemplate }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Quick Start Templates</h3>
        <p className="text-sm text-muted-foreground">
          Choose a template to get started quickly with proven thumbnail styles
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map((template) => (
          <Card 
            key={template.id} 
            className="group cursor-pointer hover:shadow-lg transition-all duration-300 glass border-white/20"
            onClick={() => onSelectTemplate(template)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-lg bg-gradient-to-r ${template.color}`}>
                  <template.icon className="h-5 w-5 text-white" />
                </div>
                <div className="flex gap-1">
                  {template.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <CardTitle className="text-base">{template.name}</CardTitle>
              <CardDescription className="text-sm">
                {template.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Button 
                size="sm" 
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Use Template
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}