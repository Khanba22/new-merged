import React from 'react';

interface QuizResultProps {
  score: number;
  total: number;
  onRestart: () => void;
}

export const QuizResult: React.FC<QuizResultProps> = ({ score, total, onRestart }) => {
  return (
    <div className="text-white text-center bg-gradient-to-br from-[#3f0071] to-[#610094] p-10 rounded-xl max-w-xl mx-auto shadow-md">
      <h2 className="text-3xl font-bold mb-4">🎉 Quiz Complete!</h2>
      <p className="text-xl mb-2">You scored {score} out of {total}</p>
      <p className="text-purple-200 mb-6">
        {score === total ? 'Perfect score!' : score > total / 2 ? 'Great job!' : 'Keep practicing!'}
      </p>
      <button
        onClick={onRestart}
        className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded font-bold"
      >
        Try Again
      </button>
    </div>
  );
};
