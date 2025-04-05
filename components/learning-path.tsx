"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Book } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { Avatar } from "@/components/ui/avatar"
import { AvatarFallback } from "@/components/ui/avatar"

const lessons = [
  { id: 1, name: "Intro to Taxes", complete: true },
  { id: 2, name: "Tax Forms 101", complete: false },
  { id: 3, name: "Deductions Basics", complete: false },
  { id: 4, name: "Tax Credits", complete: false },
  { id: 5, name: "Filing Status", complete: false },
]

export function LearningPath() {
  const [currentUnit] = useState(1)
  const [currentSection] = useState(1)

  return (
    <Card className="bg-gradient-to-br from-purple-900/80 to-indigo-900/80 border-purple-700">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="mr-2">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <CardTitle className="text-white">
            <span className="text-gray-300 text-sm block">
              SECTION {currentSection}, UNIT {currentUnit}
            </span>
            Basic Tax Principles
          </CardTitle>
        </div>
        <Button variant="outline" className="bg-indigo-900/50 border-indigo-700 text-white hover:bg-indigo-800">
          <Book className="h-4 w-4 mr-2" />
          Guidebook
        </Button>
      </CardHeader>
      <CardContent>
        <div className="relative my-10">
          <div className="absolute w-full h-1 bg-gray-700 top-1/2 transform -translate-y-1/2"></div>
          <div className="relative flex justify-around">
            {lessons.map((lesson, index) => (
              <div key={lesson.id} className="flex flex-col items-center">
                <motion.div
                  className={cn(
                    "w-16 h-16 rounded-full flex items-center justify-center mb-2 cursor-pointer relative z-10",
                    lesson.complete
                      ? "bg-green-500"
                      : index === 2
                        ? "bg-gradient-to-r from-lime-400 to-green-500 animate-pulse"
                        : "bg-gray-700",
                  )}
                  whileHover={{ scale: 1.1 }}
                >
                  {lesson.complete ? (
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span className="text-2xl font-bold text-white">{lesson.id}</span>
                  )}
                </motion.div>
                <span className="text-sm text-gray-300">{lesson.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <Button className="bg-gradient-to-r from-lime-500 to-green-600 text-white hover:from-lime-600 hover:to-green-700 font-bold text-lg px-8 py-6">
            START
          </Button>
        </div>

        {/* Mascot */}
        <div className="absolute bottom-2 right-2">
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          >
            <Avatar className="h-24 w-24">
              <AvatarFallback className="bg-green-500 text-3xl">🦉</AvatarFallback>
            </Avatar>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  )
}

