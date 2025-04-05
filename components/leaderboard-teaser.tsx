"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export function LeaderboardTeaser() {
  return (
    <Card className="bg-gradient-to-br from-gray-900/95 to-gray-900/95 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">Unlock Leaderboards!</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gray-800 rounded-md flex items-center justify-center">
            <Shield className="h-6 w-6 text-gray-600" />
          </div>

          <div className="flex-1">
            <p className="text-white mb-1">Complete 9 more lessons to start competing</p>
            <Progress value={10} className="h-1 bg-gray-800" />
          </div>
        </div>

        <div className="mt-4 opacity-80">
          <p className="text-sm text-gray-400">
            Compete with other tax learners and climb to the top of the leaderboards to earn exclusive badges and
            rewards!
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

