"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { BookOpen, RefreshCw } from "lucide-react"
import { useState } from "react"

const techTerms = [
  {
    term: "W-2 Form",
    description: "A tax form issued by employers that reports an employee's annual wages and taxes withheld.",
  },
  {
    term: "AGI",
    description:
      "Adjusted Gross Income - total income minus specific deductions, used to calculate your tax liability.",
  },
  {
    term: "1099 Form",
    description: "A tax form that reports income from self-employment, interest, dividends, and other sources.",
  },
]

export function TechTermCard() {
  const [currentTerm, setCurrentTerm] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)

  const handleNextTerm = () => {
    setIsFlipped(false)
    setTimeout(() => {
      setCurrentTerm((prev) => (prev + 1) % techTerms.length)
    }, 300)
  }

  return (
    <Card className="bg-gradient-to-br from-blue-900/80 to-purple-900/80 border-blue-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center justify-between">
          <span>Tech Term of the Day</span>
          <Button variant="ghost" size="icon" onClick={handleNextTerm} className="text-gray-300 hover:text-white">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div
          className="min-h-[120px] flex items-center justify-center cursor-pointer"
          onClick={() => setIsFlipped(!isFlipped)}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.5 }}
        >
          {!isFlipped ? (
            <div className="text-center">
              <motion.h3
                className="text-2xl font-bold text-white mb-2"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1 }}
              >
                {techTerms[currentTerm].term}
              </motion.h3>
              <p className="text-sm text-blue-200">Tap to reveal definition</p>
            </div>
          ) : (
            <div style={{ transform: "rotateY(180deg)" }} className="text-center">
              <p className="text-gray-200 text-sm">{techTerms[currentTerm].description}</p>
            </div>
          )}
        </motion.div>

        <div className="mt-4 flex justify-center">
          <Button variant="outline" className="text-white border-blue-500 bg-blue-900/30 hover:bg-blue-800">
            <BookOpen className="h-4 w-4 mr-2" />
            Learn More
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

