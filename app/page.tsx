"use client";

import { Cat } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/dashboard"); // Will redirect to dashboard after 10 seconds
    }, 10000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#4F3BA9] to-[#2B4BCC]">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center">
        <div className="relative z-10 text-center px-4">
          <div className="mb-8 relative">
            <Cat 
              className="w-16 h-16 mx-auto text-white transform -translate-y-2 transition-transform duration-300"
              style={{
                transform: `translateY(${Math.sin(scrollY * 0.05) * 20}px) rotate(${Math.sin(scrollY * 0.02) * 10}deg)`
              }}
            />
          </div>
          <h1 className="text-6xl font-bold text-white mb-6 tracking-tight">
            TaxLearn
          </h1>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto">
            Making tax learning as enjoyable as watching cat videos. Simple, engaging, and surprisingly fun!
          </p>
        </div>
      </div>
    </main>
  );
}