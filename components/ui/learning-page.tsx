"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { BookOpen, Award, Star, CheckCircle, Clock, TrendingUp, Zap, Bookmark, FileText, Lightbulb } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import useTopic from "@/contexts/topic-context"

const units = [
  {
    id: 1,
    title: "Tax Fundamentals",
    sections: [
      { id: 1, title: "What are Taxes?", completed: true },
      { id: 2, title: "Types of Taxes", completed: true },
      { id: 3, title: "Tax Authorities", completed: false },
    ],
    progress: 66,
    icon: BookOpen,
  },
  {
    id: 2,
    title: "Income Tax Basics",
    sections: [
      { id: 1, title: "Taxable Income", completed: false },
      { id: 2, title: "Tax Brackets", completed: false },
      { id: 3, title: "Filing Status", completed: false },
    ],
    progress: 0,
    icon: FileText,
  },
  {
    id: 3,
    title: "Deductions & Credits",
    sections: [
      { id: 1, title: "Standard Deduction", completed: false },
      { id: 2, title: "Itemized Deductions", completed: false },
      { id: 3, title: "Common Tax Credits", completed: false },
    ],
    progress: 0,
    icon: TrendingUp,
  },
]

export function LearningPage() {

  const topic = useTopic()
  console.log(topic,"Topic")

  const router = useRouter()
  const [activeUnit, setActiveUnit] = useState(units[0])
  const [activeSection, setActiveSection] = useState(activeUnit.sections[2])

  const handleChallengeClick = () => {
    router.push("/challenge")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-indigo-900 pb-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <motion.h1
            className="text-4xl font-bold text-white"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            Tax Today
          </motion.h1>
          <div className="ml-auto flex items-center space-x-4">
            <div className="flex items-center bg-purple-800/50 rounded-full px-3 py-1">
              <Zap className="h-4 w-4 text-yellow-400 mr-1" />
              <span className="text-white font-bold">120 XP</span>
            </div>
            <div className="flex items-center bg-purple-800/50 rounded-full px-3 py-1">
              <Clock className="h-4 w-4 text-blue-400 mr-1" />
              <span className="text-white font-bold">3 Day Streak</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar with units */}
          <div className="md:col-span-1 space-y-4">
            <h2 className="text-xl font-bold text-white mb-4">Learning Path</h2>

            {units.map((unit) => (
              <motion.div
                key={unit.id}
                whileHover={{ scale: 1.02 }}
                className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                  activeUnit.id === unit.id
                    ? "bg-purple-700/70 shadow-lg shadow-purple-900/50"
                    : "bg-purple-800/30 hover:bg-purple-800/50"
                }`}
                onClick={() => setActiveUnit(unit)}
              >
                <div className="flex items-center mb-2">
                  <div
                    className={`p-2 rounded-full ${
                      unit.progress === 100
                        ? "bg-green-500/20"
                        : unit.progress > 0
                          ? "bg-blue-500/20"
                          : "bg-purple-500/20"
                    }`}
                  >
                    <unit.icon
                      className={`h-5 w-5 ${
                        unit.progress === 100
                          ? "text-green-400"
                          : unit.progress > 0
                            ? "text-blue-400"
                            : "text-purple-400"
                      }`}
                    />
                  </div>
                  <span className="ml-2 text-white font-medium">{unit.title}</span>
                </div>

                <Progress value={unit.progress} className="h-1.5 bg-purple-950" />

                <div className="mt-2 text-xs text-purple-300">{unit.progress}% Complete</div>
              </motion.div>
            ))}

            <div className="mt-8 p-4 bg-purple-800/30 rounded-lg">
              <h3 className="text-white font-bold flex items-center">
                <Award className="h-5 w-5 mr-2 text-yellow-400" />
                Achievements
              </h3>
              <div className="mt-3 grid grid-cols-3 gap-2">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-purple-700/50 flex items-center justify-center">
                    <Star className="h-5 w-5 text-yellow-400" />
                  </div>
                  <span className="text-xs text-purple-300 mt-1">3/5</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-purple-700/50 flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  </div>
                  <span className="text-xs text-purple-300 mt-1">1/3</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-purple-700/50 flex items-center justify-center">
                    <Bookmark className="h-5 w-5 text-blue-400" />
                  </div>
                  <span className="text-xs text-purple-300 mt-1">2/7</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main content */}
          <motion.div
            className="md:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-purple-900/90 border-purple-700 shadow-xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none"></div>

              <div className="p-6 relative z-10">
                <div className="flex items-center mb-6">
                  <Badge className="bg-purple-700 text-xs py-1">
                    Section {activeSection.id} of {activeUnit.sections.length}
                  </Badge>
                  <Badge className="bg-indigo-700 ml-2 text-xs py-1">Unit {activeUnit.id}</Badge>
                  <div className="ml-auto flex items-center">
                    <Lightbulb className="h-5 w-5 text-yellow-400 mr-1" />
                    <span className="text-yellow-400 text-sm font-medium">Tip: Take notes as you learn!</span>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <activeUnit.icon className="h-6 w-6 mr-2 text-indigo-400" />
                  {activeUnit.title}: {activeSection.title}
                </h2>

                <div className="prose prose-invert max-w-none">
                  <p className="text-purple-100 leading-relaxed">
                    Tax authorities are government bodies responsible for administering and enforcing tax laws. In the
                    United States, the primary federal tax authority is the Internal Revenue Service (IRS), which
                    collects income taxes, payroll taxes, and other federal taxes.
                  </p>

                  <p className="text-purple-100 leading-relaxed mt-4">
                    State tax authorities, such as the Franchise Tax Board in California or the Department of Revenue in
                    many states, handle state-level taxes. Local governments may also have their own tax authorities for
                    property taxes and other local levies.
                  </p>

                  <div className="bg-purple-800/50 p-4 rounded-lg mt-6 border-l-4 border-indigo-500">
                    <h4 className="text-white font-bold flex items-center">
                      <Lightbulb className="h-5 w-5 mr-2 text-yellow-400" />
                      Key Insight
                    </h4>
                    <p className="text-purple-100 mt-2">
                      Understanding which tax authority governs different types of taxes is crucial for proper
                      compliance and knowing where to direct questions or concerns about your tax obligations.
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <motion.button
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300"
                    whileTap={{ scale: 0.95 }}
                    onClick={handleChallengeClick}
                  >
                    Challenge yourself
                  </motion.button>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-10 right-10 opacity-10">
                <FileText className="h-32 w-32 text-indigo-300" />
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <Card className="bg-purple-800/30 border-purple-700 p-4">
                <h3 className="text-white font-bold flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-indigo-400" />
                  Related Topics
                </h3>
                <ul className="mt-3 space-y-2">
                  <li className="text-purple-200 flex items-center">
                    <div className="w-2 h-2 rounded-full bg-indigo-400 mr-2"></div>
                    Tax Compliance Requirements
                  </li>
                  <li className="text-purple-200 flex items-center">
                    <div className="w-2 h-2 rounded-full bg-indigo-400 mr-2"></div>
                    IRS Structure and Functions
                  </li>
                  <li className="text-purple-200 flex items-center">
                    <div className="w-2 h-2 rounded-full bg-indigo-400 mr-2"></div>
                    State vs. Federal Tax Jurisdiction
                  </li>
                </ul>
              </Card>

              <Card className="bg-purple-800/30 border-purple-700 p-4">
                <h3 className="text-white font-bold flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-green-400" />
                  Your Progress
                </h3>
                <div className="mt-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-purple-200">This unit</span>
                    <span className="text-white font-bold">{activeUnit.progress}%</span>
                  </div>
                  <Progress value={activeUnit.progress} className="h-2 bg-purple-950" />

                  <div className="flex justify-between text-sm mt-3 mb-1">
                    <span className="text-purple-200">Overall course</span>
                    <span className="text-white font-bold">22%</span>
                  </div>
                  <Progress value={22} className="h-2 bg-purple-950" />
                </div>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default LearningPage