"use client";

import { useState, useEffect } from "react";
import { Brain, Car, CropIcon as DragDropIcon, ListChecks, Puzzle, Trophy, Sparkles, Gift } from "lucide-react";
import { Card } from "@/components/ui/card";

interface Game {
  id: number;
  title: string;
  type: string;
  icon: JSX.Element;
  description: string;
  unit: string;
  available: boolean;
}

export default function GamesPage() {
  const [currentGame, setCurrentGame] = useState<Game | null>(null);
  const [score, setScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const games: Game[] = [
    {
      id: 1,
      title: "Tax Terms Flash Cards",
      type: "flashcards",
      icon: <Car className="w-6 h-6" />,
      description: "Learn essential tax terminology through interactive flashcards",
      unit: "Basic Tax Concepts",
      available: true,
    },
    {
      id: 2,
      title: "Case Study",
      type: "drag-drop",
      icon: <DragDropIcon className="w-6 h-6" />,
      description: "Sort different types of income into their correct categories",
      unit: "Test your learning ability with real life examples",
      available: true,
    },
    {
      id: 3,
      title: "Tax Quiz Challenge",
      type: "quiz",
      icon: <Brain className="w-6 h-6" />,
      description: "Test your knowledge with multiple-choice questions",
      unit: "Tax Calculations",
      available: false,
    },
    {
      id: 4,
      title: "Match the Deductions",
      type: "matching",
      icon: <ListChecks className="w-6 h-6" />,
      description: "Match deductions with their correct descriptions",
      unit: "Deductions and Credits",
      available: true,
    },
  ];

  const [gameContent, setGameContent] = useState({
    flashcards: [
      { term: "Gross Income", definition: "All income from whatever source derived" },
      { term: "Deduction", definition: "An expense that reduces taxable income" },
      { term: "Tax Credit", definition: "A dollar-for-dollar reduction in tax liability" },
      { term: "Exemption", definition: "Income that is excluded from taxation" },
    ],
    currentCardIndex: 0,
    isFlipped: false,
  });

  const handleGameSelect = (game: Game) => {
    if (!game.available) return;
    setCurrentGame(game);
    setScore(0);
  };

  const handleCorrectAnswer = () => {
    setScore(prev => prev + 10);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4F3BA9] to-[#2B4BCC] p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white flex items-center gap-3">
            Daily Tax Games <Puzzle className="w-8 h-8" />
          </h1>
          <div className="flex items-center gap-4">
            <div className="bg-white/10 rounded-lg px-4 py-2 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <span className="text-white font-semibold">{score} points</span>
            </div>
          </div>
        </div>

        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none">
            <Sparkles className="absolute animate-bounce text-yellow-400 w-8 h-8" style={{ left: '50%', top: '50%' }} />
          </div>
        )}

        {!currentGame ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game) => (
              <Card
                key={game.id}
                className={`p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 ${
                  game.available ? 'bg-white/10 hover:bg-white/20' : 'bg-white/5 cursor-not-allowed'
                }`}
                onClick={() => handleGameSelect(game)}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-full bg-white/10">
                    {game.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{game.title}</h3>
                    <p className="text-sm text-purple-200">{game.unit}</p>
                  </div>
                </div>
                <p className="text-purple-100">{game.description}</p>
                {!game.available && (
                  <div className="mt-4 flex items-center gap-2 text-purple-300">
                    <Gift className="w-4 h-4" />
                    <span className="text-sm">Coming soon!</span>
                  </div>
                )}
              </Card>
            ))}
          </div>
        ) : (
          <div className="bg-white/10 rounded-xl p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">{currentGame.title}</h2>
              <button
                onClick={() => setCurrentGame(null)}
                className="px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                Back to Games
              </button>
            </div>
            
            {currentGame.type === "flashcards" && (
             <div
             className="flip-card bg-white/5 rounded-xl p-8 cursor-pointer min-h-[300px] flex items-center justify-center"
             onClick={() =>
               setGameContent((prev) => ({ ...prev, isFlipped: !prev.isFlipped }))
             }
           >
             <div
               className={`flip-inner w-full h-full text-center ${
                 gameContent.isFlipped ? "rotate-y-180" : ""
               }`}
             >
               <div className="flip-front flex items-center justify-center h-full">
                 <div className="w-full">
                   <h3 className="text-2xl font-bold text-white mb-4">
                     {gameContent.flashcards[gameContent.currentCardIndex].term}
                   </h3>
                   <p className="text-purple-200 text-sm">Flip to know</p>
                 </div>
               </div>
               <div className="flip-back flex items-center justify-center h-full bg-white/5 rounded-xl">
                 <div className="w-full">
                   <h3 className="text-2xl font-bold text-white mb-4">
                     {gameContent.flashcards[gameContent.currentCardIndex].definition}
                   </h3>
                   <p className="text-purple-200 text-sm">Flip to know</p>
                 </div>
               </div>
             </div>
           </div>
           
            
            )}

            <div className="flex justify-center mt-6 gap-4">
              <button
                onClick={() => {
                  setGameContent(prev => ({
                    ...prev,
                    currentCardIndex: (prev.currentCardIndex - 1 + prev.flashcards.length) % prev.flashcards.length,
                    isFlipped: false,
                  }));
                }}
                className="px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                Previous
              </button>
              <button
                onClick={() => {
                  handleCorrectAnswer();
                  setGameContent(prev => ({
                    ...prev,
                    currentCardIndex: (prev.currentCardIndex + 1) % prev.flashcards.length,
                    isFlipped: false,
                  }));
                }}
                className="px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}