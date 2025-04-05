"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Flame, Zap, Shield, Trophy } from "lucide-react"

export function StatsOverview() {
  return (
    <Card className="bg-gradient-to-br from-gray-900/95 to-gray-900/95 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">Statistics</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-800/60 rounded-lg p-4 flex items-center">
            <div className="w-10 h-10 rounded-full bg-amber-600 flex items-center justify-center mr-3">
              <Flame className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-xl font-bold text-white">1</p>
              <p className="text-xs text-gray-400">Day streak</p>
            </div>
          </div>

          <div className="bg-gray-800/60 rounded-lg p-4 flex items-center">
            <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center mr-3">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-xl font-bold text-white">12</p>
              <p className="text-xs text-gray-400">Total XP</p>
            </div>
          </div>

          <div className="bg-gray-800/60 rounded-lg p-4 flex items-center">
            <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center mr-3">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-xl font-bold text-white">None</p>
              <p className="text-xs text-gray-400">Current league</p>
            </div>
          </div>

          <div className="bg-gray-800/60 rounded-lg p-4 flex items-center">
            <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center mr-3">
              <Trophy className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-xl font-bold text-white">0</p>
              <p className="text-xs text-gray-400">Top 3 finishes</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

