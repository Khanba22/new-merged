"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

const achievements = [
  {
    id: "wildfire",
    name: "Wildfire",
    desc: "Reach a 3 day streak",
    progress: 33,
    level: 1,
    icon: "🔥",
    color: "from-red-500 to-orange-500",
  },
  {
    id: "sage",
    name: "Sage",
    desc: "Earn 100 XP",
    progress: 12,
    level: 1,
    icon: "🧠",
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "scholar",
    name: "Scholar",
    desc: "Learn 50 new tax terms in a single course",
    progress: 2,
    level: 1,
    icon: "📜",
    color: "from-red-500 to-pink-500",
  },
]

export function AchievementsPreview() {
  const [selectedAchievement, setSelectedAchievement] = useState(0)

  return (
    <Card className="bg-gradient-to-br from-gray-900/95 to-gray-900/95 border-gray-800">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-white">Achievements</CardTitle>
        <Button variant="link" className="text-blue-400 p-0">
          VIEW ALL
        </Button>
      </CardHeader>

      <CardContent className="space-y-4">
        {achievements.map((achievement, index) => (
          <div
            key={achievement.id}
            className={`p-4 rounded-lg bg-gray-800/60 flex items-start ${
              selectedAchievement === index ? "ring-1 ring-blue-500" : ""
            }`}
            onClick={() => setSelectedAchievement(index)}
          >
            <div
              className={`w-16 h-16 rounded-lg bg-gradient-to-br ${achievement.color} p-1 mr-4 flex flex-col items-center justify-center`}
            >
              <div className="text-2xl">{achievement.icon}</div>
              <div className="text-[10px] bg-gray-900/30 rounded px-1 mt-1">LEVEL {achievement.level}</div>
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-white font-medium">{achievement.name}</h4>
                <span className="text-gray-400 text-xs">
                  {achievement.id === "wildfire" ? "1/3" : achievement.id === "sage" ? "12/100" : "1/50"}
                </span>
              </div>

              <Progress value={achievement.progress} className="h-1 mb-2 bg-gray-700" />

              <p className="text-sm text-gray-300">{achievement.desc}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

