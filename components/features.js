'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, Palette, MessageSquare, History, Upload, Wand2 } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: Zap,
    title: 'AI-Powered Generation',
    description: 'Advanced AI creates stunning thumbnails in seconds based on your content and style preferences.',
  },
  {
    icon: MessageSquare,
    title: 'Smart Chat Interface',
    description: 'Describe your vision in natural language. Our AI understands context and creates accordingly.',
  },
  {
    icon: Palette,
    title: 'Style Customization',
    description: 'Choose from multiple styles, moods, and color schemes to match your brand perfectly.',
  },
  {
    icon: Upload,
    title: 'Asset Integration',
    description: 'Upload your logos, faces, or brand assets to be seamlessly integrated into thumbnails.',
  },
  {
    icon: Wand2,
    title: 'Prompt Enhancement',
    description: 'Our system automatically enhances short prompts with relevant context and style details.',
  },
  {
    icon: History,
    title: 'History & Templates',
    description: 'Save favorite prompts, reuse successful templates, and build your thumbnail library.',
  },
];

export function Features() {
  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Everything You Need
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed to help you create professional thumbnails that drive clicks and engagement.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-white/20 bg-white/50 dark:bg-black/20 glass hover:shadow-lg transition-all duration-300 group">
                <CardHeader>
                  <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20 w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-6 w-6 text-purple-500" />
                  </div>
                  <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}