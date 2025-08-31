'use client';

import { useAuth } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Sparkles, Zap, Image } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export function Hero() {
  const { isSignedIn } = useAuth();

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="flex justify-center mb-8">
            <div className="p-4 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30">
              <Sparkles className="h-12 w-12 text-purple-500" />
            </div>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-emerald-600 bg-clip-text text-transparent leading-tight">
            Create Stunning Thumbnails with AI
          </h1>
          
          <p className="text-xl lg:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Transform your content with eye-catching thumbnails generated instantly. 
            Perfect for YouTube, blogs, and social media.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            {isSignedIn ? (
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-lg px-8 py-6"
                >
                  <Zap className="mr-2 h-5 w-5" />
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              <Link href="/sign-up">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-lg px-8 py-6"
                >
                  <Zap className="mr-2 h-5 w-5" />
                  Get Started
                </Button>
              </Link>
            )}
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative max-w-4xl mx-auto"
          >
            <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/20">
              <div className="w-full h-full bg-gradient-to-br from-purple-400 via-blue-500 to-emerald-400 flex items-center justify-center">
                <div className="text-white text-center">
                  <Image className="h-16 w-16 mx-auto mb-4 opacity-80"  alt="heroImage"/>
                  <p className="text-xl font-semibold">AI Thumbnail Preview</p>
                  <p className="text-purple-100 mt-2">Your next viral thumbnail starts here</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
