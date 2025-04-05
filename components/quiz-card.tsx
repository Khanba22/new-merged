"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import { Avatar } from "@/components/ui/avatar"
import { AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

interface QuizCardProps {
  onClose?: () => void
}

export function QuizCard({ onClose }: QuizCardProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [progress, setProgress] = useState(35)
  const [lives, setLives] = useState(3)

  const options = [
    "A tax form used for individual income tax returns",
    "A tax credit for low-income earners",
    "A deduction for business expenses",
  ]

  const correctAnswer = 0 // First option is correct

  const handleOptionSelect = (index: number) => {
    setSelectedOption(index)
  }

  const handleCheck = () => {
    if (selectedOption === correctAnswer) {
      setProgress((prev) => Math.min(prev + 15, 100))
    } else {
      setLives((prev) => Math.max(prev - 1, 0))
    }
  }

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader className="relative pb-0">
        <Button variant="ghost" size="icon" className="absolute right-2 top-2" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
        <div className="flex items-center justify-between w-full mt-3">
          <Progress value={progress} className="h-2 w-3/4 bg-gray-700" />
          <div className="flex">
            {[...Array(lives)].map((_, i) => (
              <Badge key={i} variant="outline" className="bg-red-500 border-0 mr-1">
                ❤️
              </Badge>
            ))}
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-8 pb-0">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white">Select the correct meaning</h2>
        </div>

        <div className="flex mb-8">
          <div className="mr-4">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: [0, -5, 5, -5, 0] }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                delay: 2,
              }}
            >
              <Avatar className="h-24 w-24">
                <AvatarFallback className="bg-purple-500 text-3xl">🦉</AvatarFallback>
              </Avatar>
            </motion.div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 inline-block">
            <span className="text-white">Form 1040</span>
          </div>
        </div>

        <div className="space-y-4">
          {options.map((option, index) => (
            <AnimatePresence key={index}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Button
                  variant="outline"
                  className={`w-full justify-start text-left p-6 h-auto ${
                    selectedOption === index
                      ? "bg-blue-900 border-blue-500 text-white"
                      : "bg-gray-800 border-gray-700 text-gray-200"
                  }`}
                  onClick={() => handleOptionSelect(index)}
                >
                  <span className="mr-3 w-6 h-6 flex items-center justify-center rounded-full bg-gray-700 text-white text-sm">
                    {index + 1}
                  </span>
                  {option}
                </Button>
              </motion.div>
            </AnimatePresence>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex justify-between mt-6">
        <Button variant="outline" className="text-gray-400 border-gray-700">
          SKIP
        </Button>
        <Button
          onClick={handleCheck}
          disabled={selectedOption === null}
          className="bg-gradient-to-r from-lime-500 to-green-600 text-white hover:from-lime-600 hover:to-green-700 px-8"
        >
          CHECK
        </Button>
      </CardFooter>
    </Card>
  )
}

