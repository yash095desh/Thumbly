"use client";

import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { Footer } from "@/components/footer";

export default function Home() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-gray-200 dark:from-black dark:via-neutral-900 dark:to-neutral-800">
      <Navbar />
      <Hero />
      <Features />
      <Footer />
    </div>
  );
}
