'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  X, 
  Sparkles, 
  Eye, 
  Upload,
  Palette,
  Video,
  Type
} from 'lucide-react';

const videoContexts = [
  { value: 'gaming', label: 'Gaming', color: 'bg-red-500' },
  { value: 'tech', label: 'Tech Review', color: 'bg-blue-500' },
  { value: 'travel', label: 'Travel', color: 'bg-green-500' },
  { value: 'vlog', label: 'Vlog', color: 'bg-purple-500' },
  { value: 'educational', label: 'Educational', color: 'bg-orange-500' },
  { value: 'custom', label: 'Custom', color: 'bg-gray-500' },
];

const styles = [
  'Minimal', 'Bold', 'Professional', 'Fun', 'Cartoonish', 'Cinematic', 
  'Retro', 'Modern', 'Dramatic', 'Clean'
];

const colors = [
  { name: 'Purple', value: '#8B5CF6' },
  { name: 'Blue', value: '#3B82F6' },
  { name: 'Red', value: '#EF4444' },
  { name: 'Green', value: '#10B981' },
  { name: 'Orange', value: '#F97316' },
  { name: 'Pink', value: '#EC4899' },
];

export function PromptEnhancer({ prompt, onEnhance, onClose }) {
  const [context, setContext] = useState('gaming');
  const [style, setStyle] = useState('Bold');
  const [mood, setMood] = useState('Fun');
  const [primaryColor, setPrimaryColor] = useState('#8B5CF6');
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [logo, setLogo] = useState(null);
  const [face, setFace] = useState(null);

  const generateEnhancedPrompt = () => {
    const contextInfo = videoContexts.find(c => c.value === context);
    
    let enhancedPrompt = prompt;
    
    if (title) enhancedPrompt += `, featuring "${title}"`;
    if (subtitle) enhancedPrompt += ` with subtitle "${subtitle}"`;
    
    enhancedPrompt += `, ${style.toLowerCase()} ${mood.toLowerCase()} style`;
    enhancedPrompt += `, ${contextInfo.label.toLowerCase()} content`;
    enhancedPrompt += `, primary color ${primaryColor}`;
    enhancedPrompt += `, high quality, trending, eye-catching, YouTube thumbnail style`;
    
    if (logo) enhancedPrompt += ', include custom logo';
    if (face) enhancedPrompt += ', include person face';

    return enhancedPrompt;
  };

  const handleFileUpload = (event, type) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (type === 'logo') setLogo(e.target.result);
        if (type === 'face') setFace(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="mb-6 glass border-white/20 animate-fade-in">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-500" />
            Prompt Enhancer
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Video Context */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2">
            <Video className="h-4 w-4" />
            Video Context
          </Label>
          <div className="grid grid-cols-3 gap-2">
            {videoContexts.map((ctx) => (
              <Button
                key={ctx.value}
                variant={context === ctx.value ? "default" : "outline"}
                size="sm"
                onClick={() => setContext(ctx.value)}
                className={context === ctx.value ? "bg-gradient-to-r from-purple-500 to-blue-500" : ""}
              >
                <div className={`w-3 h-3 rounded-full ${ctx.color} mr-2`} />
                {ctx.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Style & Mood */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Style</Label>
            <Select value={style} onValueChange={setStyle}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {styles.map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Mood</Label>
            <Select value={mood} onValueChange={setMood}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {styles.map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Colors */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Primary Color
          </Label>
          <div className="flex gap-2 flex-wrap">
            {colors.map((color) => (
              <Button
                key={color.value}
                variant="outline"
                size="sm"
                onClick={() => setPrimaryColor(color.value)}
                className={`border-2 ${primaryColor === color.value ? 'border-foreground' : 'border-muted'}`}
              >
                <div 
                  className="w-4 h-4 rounded-full mr-2" 
                  style={{ backgroundColor: color.value }}
                />
                {color.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Title & Subtitle */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input 
              placeholder="Main headline text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Subtitle</Label>
            <Input 
              placeholder="Supporting text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
            />
          </div>
        </div>

        {/* Asset Uploads */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Logo</Label>
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center">
              {logo ? (
                <img src={logo} alt="Logo" className="max-h-16 mx-auto" />
              ) : (
                <div className="space-y-2">
                  <Upload className="h-6 w-6 mx-auto text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">Upload logo</p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e, 'logo')}
                className="hidden"
                id="logo-upload"
              />
              <Button variant="ghost" size="sm" asChild className="mt-2">
                <label htmlFor="logo-upload" className="cursor-pointer">
                  {logo ? 'Change' : 'Upload'}
                </label>
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Face/Person</Label>
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center">
              {face ? (
                <img src={face} alt="Face" className="max-h-16 mx-auto rounded-full" />
              ) : (
                <div className="space-y-2">
                  <Upload className="h-6 w-6 mx-auto text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">Upload face</p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e, 'face')}
                className="hidden"
                id="face-upload"
              />
              <Button variant="ghost" size="sm" asChild className="mt-2">
                <label htmlFor="face-upload" className="cursor-pointer">
                  {face ? 'Change' : 'Upload'}
                </label>
              </Button>
            </div>
          </div>
        </div>

        {/* Live Preview */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Enhanced Prompt Preview
          </Label>
          <Textarea
            value={generateEnhancedPrompt()}
            readOnly
            className="min-h-[80px] bg-muted/50 text-sm"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4 border-t border-white/20">
          <Button 
            onClick={() => onEnhance(generateEnhancedPrompt())}
            className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Generate Enhanced
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}