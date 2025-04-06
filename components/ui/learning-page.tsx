"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  BookOpen,
  Award,
  Star,
  CheckCircle,
  Clock,
  TrendingUp,
  Zap,
  Bookmark,
  FileText,
  Lightbulb,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import useTopic from "@/contexts/topic-context";
import useAuth from "@/contexts/auth-context";
import { askAgent } from "@/lib/generate";

// Complete dummy data with all required properties
const dummy = {
  points: 1200,
  streak: 5,
  overallProgress: 22,
  tip: "Tip: Take notes as you learn!",
  units: [
    {
      id: 1,
      title: "Tax Basics",
      progress: 80,
      icon: BookOpen,
      sections: [
        { id: 1, title: "Introduction to Taxation" },
        { id: 2, title: "Tax Terminology" },
        { id: 3, title: "Filing Status" },
      ],
      content: {
        paragraphs: [
          "Taxation is a fundamental aspect of modern economies. It refers to the process by which governments levy financial charges on individuals and entities.",
          "Understanding basic tax principles is essential for financial literacy and responsible citizenship.",
        ],
        insight: {
          title: "Key Insight",
          message:
            "Tax laws change regularly. Always check for the most current information when filing.",
        },
      },
    },
    {
      id: 2,
      title: "Income Tax",
      progress: 40,
      icon: FileText,
      sections: [
        { id: 1, title: "Types of Income" },
        { id: 2, title: "Deductions and Credits" },
      ],
      content: {
        paragraphs: [
          "Income tax is levied on various types of earnings, including wages, salaries, and investment income.",
          "Understanding how different income types are taxed can help you optimize your financial decisions.",
        ],
      },
    },
    {
      id: 3,
      title: "Tax Planning",
      progress: 0,
      icon: TrendingUp,
      sections: [{ id: 1, title: "Long-term Tax Strategy" }],
      content: {
        paragraphs: [
          "Tax planning involves analyzing your financial situation to ensure tax efficiency.",
          "Effective tax planning can lead to significant savings and better financial outcomes.",
        ],
      },
    },
  ],
  achievements: [
    { icon: Star, color: "text-yellow-400", count: 3 },
    { icon: CheckCircle, color: "text-green-400", count: 5 },
    { icon: Bookmark, color: "text-blue-400", count: 2 },
  ],
  relatedTopics: [
    "Tax Deductions for Small Businesses",
    "Estate Tax Planning",
    "International Tax Considerations",
    "Tax Software Comparison",
  ],
};

export function LearningPage() {
  const topic = useTopic();
  const user = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const [units, setUnits] = useState([]);
  const [activeUnit, setActiveUnit] = useState(null);
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    const getTopics = async () => {
      const local = localStorage.getItem("todays");
      if (local) {
        const localJson = JSON.parse(local);
        setUnits(localJson);
        setActiveUnit(localJson[0]);
        setActiveSection(localJson[0]?.sections?.[0]);
        setLoading(false);
        return;
      }
      const data = await askAgent({
        template: "generate_topics",
        context: "",
      });
      setUnits(data);
      setActiveUnit(data[0]);
      setActiveSection(data[0]?.sections?.[0]);
      localStorage.setItem("todays", JSON.stringify(data));
      setLoading(false);
    };

    getTopics();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-[80vw] bg-gradient-to-br from-bg-purple-900 to-bg-purple-800 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white/30 mx-auto"></div>
          <h1 className="text-white text-2xl font-semibold animate-pulse">
            Loading your tax adventure...
          </h1>
          <p className="text-purple-200 text-sm">
            Hang tight, we’re crunching the numbers!
          </p>
        </div>
      </div>
    );
  }
  const handleChallengeClick = () => {
    router.push("/challenge");
  };

  return (
    <div className="min-h-screen w-[80vw] bg-gradient-to-br from-purple-950 via-purple-900 to-indigo-900 pb-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <motion.h1
            className="text-4xl font-bold text-white"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <button onClick={() => localStorage.removeItem("todays")}>
              Tax Today
            </button>
          </motion.h1>
          <div className="ml-auto flex items-center space-x-4">
            <div className="flex items-center bg-purple-800/50 rounded-full px-3 py-1">
              <Zap className="h-4 w-4 text-yellow-400 mr-1" />
              <span className="text-white font-bold">{dummy.points}</span>
            </div>
            <div className="flex items-center bg-purple-800/50 rounded-full px-3 py-1">
              <Clock className="h-4 w-4 text-blue-400 mr-1" />
              <span className="text-white font-bold">
                {dummy.streak} Day Streak
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
                onClick={() => {
                  setActiveUnit(unit);
                  setActiveSection(unit.sections[0]);
                }}
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
                  <span className="ml-2 text-white font-medium">
                    {unit.title}
                  </span>
                </div>
                <Progress
                  value={unit.progress}
                  className="h-1.5 bg-purple-950"
                />
                <div className="mt-2 text-xs text-purple-300">
                  {unit.progress}% Complete
                </div>
              </motion.div>
            ))}

            <div className="mt-8 p-4 bg-purple-800/30 rounded-lg">
              <h3 className="text-white font-bold flex items-center">
                <Award className="h-5 w-5 mr-2 text-yellow-400" />
                Achievements
              </h3>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {dummy.achievements.map((ach, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-purple-700/50 flex items-center justify-center">
                      <ach.icon className={`h-5 w-5 ${ach.color}`} />
                    </div>
                    <span className="text-xs text-purple-300 mt-1">
                      {ach.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

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
                  <Badge className="bg-indigo-700 ml-2 text-xs py-1">
                    Unit {activeUnit.id}
                  </Badge>
                  <div className="ml-auto flex items-center">
                    <Lightbulb className="h-5 w-5 text-yellow-400 mr-1" />
                    <span className="text-yellow-400 text-sm font-medium">
                      {dummy.tip}
                    </span>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <activeUnit.icon className="h-6 w-6 mr-2 text-indigo-400" />
                  {activeUnit.title}: {activeSection.title}
                </h2>

                <div className="prose prose-invert max-w-none">
                  {activeUnit.content?.paragraphs?.map((para, i) => (
                    <p key={i} className="text-purple-100 leading-relaxed mt-4">
                      {para}
                    </p>
                  ))}

                  {activeUnit.content?.insight && (
                    <div className="bg-purple-800/50 p-4 rounded-lg mt-6 border-l-4 border-indigo-500">
                      <h4 className="text-white font-bold flex items-center">
                        <Lightbulb className="h-5 w-5 mr-2 text-yellow-400" />
                        {activeUnit.content.insight.title}
                      </h4>
                      <p className="text-purple-100 mt-2">
                        {activeUnit.content.insight.message}
                      </p>
                    </div>
                  )}
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
                  {dummy.relatedTopics.map((topic, idx) => (
                    <li key={idx} className="text-purple-200 flex items-center">
                      <div className="w-2 h-2 rounded-full bg-indigo-400 mr-2"></div>
                      {topic}
                    </li>
                  ))}
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
                    <span className="text-white font-bold">
                      {activeUnit.progress}%
                    </span>
                  </div>
                  <Progress
                    value={activeUnit.progress}
                    className="h-2 bg-purple-950"
                  />
                  <div className="flex justify-between text-sm mt-3 mb-1">
                    <span className="text-purple-200">Overall course</span>
                    <span className="text-white font-bold">
                      {dummy.overallProgress}%
                    </span>
                  </div>
                  <Progress
                    value={dummy.overallProgress}
                    className="h-2 bg-purple-950"
                  />
                </div>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default LearningPage;
