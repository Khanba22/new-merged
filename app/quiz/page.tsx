"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  X,
  Clock,
  Award,
  ArrowRight,
  RotateCcw,
  AlertCircle,
  BookOpen,
  Zap,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { askAgent } from "@/lib/generate";



export default function QuizPage() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [answers, setAnswers] = useState<
    Array<{ question: number; selected: number; correct: boolean }>
  >([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [timerActive, setTimerActive] = useState(true);
  const [showReview, setShowReview] = useState(false);
  const [questions, setQuestions] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  const generateQuiz = async () => {
    const data = await askAgent({
      template:"generate_quiz",
      context:localStorage.getItem("todays")
    })
    setLoading(false)
    console.log(data,"QUIZ DATA")
    setQuestions(data)
  };

  useEffect(() => {
    generateQuiz();
  }, []);

  useEffect(() => {
    if (!completed && timerActive) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            if (selected === null) {
              handleTimeUp();
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [current, completed, timerActive, selected]);

  useEffect(() => {
    setTimeLeft(30);
    setTimerActive(true);
  }, [current]);

  const handleTimeUp = () => {
    setTimerActive(false);
    setAnswers([
      ...answers,
      { question: current, selected: -1, correct: false },
    ]);
  };

  const handleSelect = (index: number) => {
    if (selected === null) {
      setSelected(index);
      setTimerActive(false);
      const isCorrect = questions[current].options[index].isCorrect;

      if (isCorrect) {
        setScore((s) => s + 1);
      }

      setAnswers([
        ...answers,
        {
          question: current,
          selected: index,
          correct: isCorrect,
        },
      ]);
    }
  };

  const handleNext = () => {
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
      setSelected(null);
    } else {
      setCompleted(true);
    }
  };

  const restart = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setCompleted(false);
    setAnswers([]);
    setShowReview(false);
    setTimeLeft(30);
    setTimerActive(true);
  };

  const getScoreColor = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return "text-yellow-400";
    if (percentage >= 60) return "text-yellow-300";
    return "text-red-300";
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return "Excellent! You're a tax expert!";
    if (percentage >= 60) return "Good job! You know your taxes well.";
    if (percentage >= 40) return "Not bad, but there's room for improvement.";
    return "You might want to study up on tax authorities.";
  };

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

  if (completed && showReview) {
    return (
      <div className="min-h-screen w-screen bg-purple-900 flex flex-col items-center justify-center px-4 py-10">
        <div className="w-full max-w-6xl flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-white" />
              <h1 className="text-2xl font-bold text-white">Tax Today</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Zap className="h-5 w-5 text-yellow-400" />
                <span className="text-yellow-400 font-medium">
                  {score * 120} points
                </span>
              </div>
              <Badge className="bg-purple-700 text-white border-none">
                <Clock className="h-4 w-4 mr-1" />
                Quiz Review
              </Badge>
            </div>
          </div>

          <Card className="w-full bg-purple-800 shadow-xl rounded-xl overflow-hidden border-none">
            <CardHeader className="bg-purple-700 text-white border-b border-purple-600">
              <CardTitle className="text-2xl font-bold text-center">
                Quiz Review: Tax Authorities
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 max-h-[70vh] overflow-y-auto bg-purple-800">
              <div className="space-y-6">
                {answers.map((answer, index) => (
                  <div
                    key={index}
                    className="border border-purple-600 rounded-lg p-4 bg-purple-700/50"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        {answer.correct ? (
                          <div className="bg-green-900/30 p-2 rounded-full">
                            <Check className="h-5 w-5 text-green-400" />
                          </div>
                        ) : (
                          <div className="bg-red-900/30 p-2 rounded-full">
                            <X className="h-5 w-5 text-red-400" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-white">
                          Question {index + 1}:{" "}
                          {questions[answer.question].question}
                        </h3>
                        <div className="mt-2 space-y-2">
                          {questions[answer.question].options.map(
                            (option, optIndex) => (
                              <div
                                key={optIndex}
                                className={`p-3 rounded-md ${
                                  option.isCorrect
                                    ? "bg-green-900/20 border border-green-700"
                                    : answer.selected === optIndex
                                    ? "bg-red-900/20 border border-red-700"
                                    : "bg-purple-600/30 border border-purple-600"
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <span className="text-white">
                                    {option.text}
                                  </span>
                                  {option.isCorrect && (
                                    <Check className="h-4 w-4 text-green-400" />
                                  )}
                                  {!option.isCorrect &&
                                    answer.selected === optIndex && (
                                      <X className="h-4 w-4 text-red-400" />
                                    )}
                                </div>
                              </div>
                            )
                          )}
                          {answer.selected === -1 && (
                            <div className="p-3 rounded-md bg-yellow-900/20 border border-yellow-700">
                              <div className="flex items-center gap-2">
                                <AlertCircle className="h-4 w-4 text-yellow-400" />
                                <span className="text-yellow-300">
                                  Time expired - no answer selected
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="bg-purple-700 p-6 flex justify-between">
              <Button
                variant="outline"
                onClick={() => setShowReview(false)}
                className="bg-transparent border-white text-white hover:bg-purple-600"
              >
                Back to Results
              </Button>
              <Button
                onClick={restart}
                className="bg-purple-500 hover:bg-purple-600 text-white border-none"
              >
                Restart Quiz
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  if (completed) {
    return (
      <div className="min-h-screen w-screen bg-purple-900 flex flex-col items-center justify-center px-4 py-10">
        <div className="w-full max-w-6xl flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-white" />
              <h1 className="text-2xl font-bold text-white">Tax Today</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Zap className="h-5 w-5 text-yellow-400" />
                <span className="text-yellow-400 font-medium">
                  {score * 120} points
                </span>
              </div>
              <Badge className="bg-purple-700 text-white border-none">
                <Clock className="h-4 w-4 mr-1" />
                Quiz Complete
              </Badge>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            <Card className="bg-purple-800 shadow-xl rounded-xl overflow-hidden border-none">
              <CardHeader className="bg-purple-700 text-white text-center p-8 border-b border-purple-600">
                <Award className="h-16 w-16 mx-auto mb-4 text-yellow-400" />
                <CardTitle className="text-3xl font-bold">
                  Challenge Completed!
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 bg-purple-800 text-white">
                <div className="text-center space-y-6">
                  <div>
                    <h3 className="text-xl font-medium mb-2">Your Score</h3>
                    <p className={`text-5xl font-bold ${getScoreColor()}`}>
                      {score} / {questions.length}
                    </p>
                    <p className="mt-2 text-purple-200">{getScoreMessage()}</p>
                  </div>

                  <div className="pt-4">
                    <h3 className="text-xl font-medium mb-3">Your Progress</h3>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-full bg-purple-700 rounded-full h-2.5">
                        <div
                          className="h-2.5 rounded-full bg-yellow-400"
                          style={{
                            width: `${(score / questions.length) * 100}%`,
                          }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-purple-200">
                        {Math.round((score / questions.length) * 100)}%
                      </span>
                    </div>
                  </div>

                  <div className="bg-purple-700/50 rounded-lg p-4 border border-purple-600">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-yellow-500/20 rounded-full">
                        <AlertCircle className="h-5 w-5 text-yellow-400" />
                      </div>
                      <div>
                        <h4 className="font-medium text-white">Key Insight</h4>
                        <p className="text-purple-200 text-sm mt-1">
                          Understanding which tax authority governs different
                          types of taxes is crucial for proper compliance and
                          knowing where to direct questions or concerns about
                          your tax obligations.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-purple-700 p-6 flex flex-col sm:flex-row gap-3 justify-center border-t border-purple-600">
                <Button
                  variant="outline"
                  onClick={() => setShowReview(true)}
                  className="w-full sm:w-auto bg-transparent border-white text-white hover:bg-purple-600"
                >
                  Review Answers
                </Button>
                <Button
                  onClick={restart}
                  className="w-full sm:w-auto bg-purple-500 hover:bg-purple-600 text-white border-none"
                >
                  Restart Quiz
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-[60vw] bg-purple-900 flex flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-white" />
            <h1 className="text-2xl font-bold text-white">Tax Today</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Zap className="h-5 w-5 text-yellow-400" />
              <span className="text-yellow-400 font-medium">
                {score * 120} points
              </span>
            </div>
            <Badge className="bg-purple-700 text-white border-none">
              <Clock className="h-4 w-4 mr-1" />
              {timeLeft}s
            </Badge>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <Badge
              variant="outline"
              className="text-sm py-1.5 px-3 bg-purple-800 text-white border-purple-600"
            >
              Section 3 of 3
            </Badge>
            <Badge
              variant="outline"
              className="text-sm py-1.5 px-3 bg-purple-800 text-white border-purple-600"
            >
              Unit 1: Tax Fundamentals
            </Badge>
          </div>
          <Progress
            value={(current / questions.length) * 100}
            className="h-2 mb-2 bg-purple-700 relative overflow-hidden"
            style={
              {
                "--progress-indicator-color": "bg-yellow-400",
              } as React.CSSProperties
            }
          />
          <div className="flex justify-between text-xs text-purple-300">
            <span>
              Question {current + 1} of {questions.length}
            </span>
            <span>Score: {score * 120} points</span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-purple-800 shadow-xl rounded-xl overflow-hidden border-none">
              <CardHeader className="bg-purple-700 text-white p-6 border-b border-purple-600">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="h-5 w-5 text-yellow-400" />
                  <span className="text-yellow-400 font-medium">
                    Tax Fundamentals: Tax Authorities
                  </span>
                </div>
                <CardTitle className="text-xl font-bold">
                  {questions[current].question}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 bg-purple-800">
                <div className="grid gap-3">
                  {questions[current].options.map((option, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <div
                        onClick={() => handleSelect(index)}
                        className={`
                          relative flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200
                          ${
                            selected === null
                              ? "hover:border-purple-400 hover:bg-purple-700 border-purple-600 text-white"
                              : ""
                          }
                          ${
                            selected === index && option.isCorrect
                              ? "border-green-500 bg-green-900/20 text-white"
                              : selected === index
                              ? "border-red-500 bg-red-900/20 text-white"
                              : selected !== null && option.isCorrect
                              ? "border-green-500 bg-green-900/20 text-white"
                              : selected !== null
                              ? "border-purple-600 text-white"
                              : ""
                          }
                        `}
                      >
                        <div className="flex-1">
                          <p className="font-medium">{option.text}</p>
                        </div>
                        {selected !== null && (
                          <div className="ml-2">
                            {option.isCorrect ? (
                              <div className="bg-green-900/30 p-1 rounded-full">
                                <Check className="h-5 w-5 text-green-400" />
                              </div>
                            ) : selected === index ? (
                              <div className="bg-red-900/30 p-1 rounded-full">
                                <X className="h-5 w-5 text-red-400" />
                              </div>
                            ) : null}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="bg-purple-700 p-6 flex justify-between border-t border-purple-600">
                <div className="text-sm text-purple-200">
                  {selected !== null && (
                    <div className="flex items-center gap-2">
                      {questions[current].options[selected].isCorrect ? (
                        <>
                          <Check className="h-4 w-4 text-green-400" />
                          <span className="text-green-400 font-medium">
                            Correct!
                          </span>
                        </>
                      ) : (
                        <>
                          <X className="h-4 w-4 text-red-400" />
                          <span className="text-red-400 font-medium">
                            Incorrect
                          </span>
                        </>
                      )}
                    </div>
                  )}
                </div>
                {selected !== null && (
                  <Button
                    onClick={handleNext}
                    className="gap-2 bg-purple-500 hover:bg-purple-600 text-white border-none"
                  >
                    {current + 1 < questions.length ? (
                      <>
                        Next Question
                        <ArrowRight className="h-4 w-4" />
                      </>
                    ) : (
                      "Finish Quiz"
                    )}
                  </Button>
                )}
              </CardFooter>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
