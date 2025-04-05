"use client"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Award, CheckCircle, Clock, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export function ChallengeIntro() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" className="text-white mb-8" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Learning
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <Card className="bg-purple-900/90 border-purple-700 shadow-xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none"></div>

            <CardContent className="p-8 relative z-10">
              <div className="flex justify-center mb-6">
                <motion.div
                  className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.2,
                    type: "spring",
                    stiffness: 200,
                  }}
                >
                  <Award className="h-10 w-10 text-white" />
                </motion.div>
              </div>

              <h1 className="text-3xl font-bold text-white text-center mb-4">Challenge: Tax Authorities</h1>

              <p className="text-purple-100 text-center mb-6">
                Test your knowledge about tax authorities and their roles in the tax system. Complete this challenge to
                earn XP and unlock achievements!
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-purple-800/50 p-4 rounded-lg flex items-center">
                  <Clock className="h-5 w-5 text-blue-400 mr-2" />
                  <div>
                    <div className="text-white font-medium">Time Limit</div>
                    <div className="text-purple-200 text-sm">5 minutes</div>
                  </div>
                </div>

                <div className="bg-purple-800/50 p-4 rounded-lg flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                  <div>
                    <div className="text-white font-medium">Questions</div>
                    <div className="text-purple-200 text-sm">5 questions</div>
                  </div>
                </div>
              </div>

              <div className="bg-purple-800/30 p-4 rounded-lg mb-8">
                <h3 className="text-white font-bold mb-2">Youll be tested on:</h3>
                <ul className="space-y-2">
                  <li className="text-purple-200 flex items-center">
                    <div className="w-2 h-2 rounded-full bg-indigo-400 mr-2"></div>
                    Identifying different tax authorities
                  </li>
                  <li className="text-purple-200 flex items-center">
                    <div className="w-2 h-2 rounded-full bg-indigo-400 mr-2"></div>
                    Understanding their jurisdictions
                  </li>
                  <li className="text-purple-200 flex items-center">
                    <div className="w-2 h-2 rounded-full bg-indigo-400 mr-2"></div>
                    Knowing which taxes they administer
                  </li>
                </ul>
              </div>

              <div className="flex justify-center">
                <Link href={"/games"}>
                <motion.button
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Challenge
                </motion.button></Link>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 text-center text-purple-300 text-sm">
            Completing challenges earns you XP and helps reinforce your learning.
            <br />
            Try to answer all questions correctly for bonus points!
          </div>
        </motion.div>
      </div>
    </div>
  )
}

