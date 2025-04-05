"use client"

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Clock, Zap, Lock } from "lucide-react"
import { motion } from "framer-motion"

export function DailyQuests() {
  return (
    <Card className="bg-gradient-to-br from-gray-900/95 to-gray-900/95 border-gray-800">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-white">Daily Quests</CardTitle>
        <Button variant="link" className="text-blue-400 p-0">
          VIEW ALL
        </Button>
      </CardHeader>

      <CardContent className="space-y-6">
        <div>
          <div className="flex items-start mb-2">
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
              className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded flex items-center justify-center mr-3"
            >
              <Zap className="h-5 w-5 text-white" />
            </motion.div>
            <div className="flex-grow">
              <div className="flex justify-between mb-1">
                <p className="text-white">Earn 20 XP</p>
                <p className="text-gray-400 text-sm">0 / 20</p>
              </div>
              <Progress value={0} className="h-2 bg-gray-800" />
            </div>
            <div className="ml-3">
              <div className="w-8 h-8 bg-amber-700/50 border border-amber-600/50 rounded flex items-center justify-center">
                <span className="text-amber-500 text-xs">🎁</span>
              </div>
            </div>
          </div>
        </div>

        <div className="opacity-60">
          <div className="flex items-start">
            <div className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center mr-3">
              <Lock className="h-4 w-4 text-gray-500" />
            </div>
            <p className="text-gray-400">More quests unlock soon</p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <div className="flex items-center text-sm text-gray-400">
          <Clock className="h-4 w-4 mr-1" />
          <span>Resets in 4 hours</span>
        </div>
      </CardFooter>
    </Card>
  )
}

