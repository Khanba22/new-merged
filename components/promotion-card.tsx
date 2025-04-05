"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function PromotionCard() {
  return (
    <Card className="bg-gradient-to-br from-indigo-900/90 to-violet-900/90 border-indigo-700 overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center">
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 py-1 px-3 rounded-md text-white font-bold text-sm">
            SUPER
          </span>
          <span className="ml-2 text-white">Try Super for free</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="relative pb-4 pt-0">
        <div className="flex flex-col space-y-2 text-gray-200 text-sm mb-4">
          <p>No ads, personalized practice,</p>
          <p>and unlimited premium features!</p>
        </div>

        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold">TRY 2 WEEKS FREE</Button>

        <div className="absolute right-3 top-0">
          <motion.div
            animate={{
              y: [0, -8, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
            className="relative"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500"></div>
            <div className="w-12 h-12 rounded-full bg-blue-500 absolute top-3 left-3 opacity-50"></div>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  )
}

