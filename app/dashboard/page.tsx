"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { GamepadIcon } from "lucide-react";

export default function Dashboard() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4F3BA9] to-[#2B4BCC] p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Dashboard</h1>
        
        <Button
          onClick={() => router.push("/games")}
          className="bg-white/10 hover:bg-white/20 text-white flex items-center gap-2 text-lg"
        >
          <GamepadIcon className="w-5 h-5" />
          Play Daily Games
        </Button>
      </div>
    </div>
  );
}