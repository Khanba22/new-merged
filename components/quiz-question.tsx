import React from 'react';

interface Option {
  text: string;
  isCorrect: boolean;
}

interface QuizQuestionProps {
  question: string;
  options: Option[];
  selectedOption: number | null;
  onSelectOption: (index: number) => void;
}

export const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  options,
  selectedOption,
  onSelectOption,
}) => {
  return (
    <div className="text-white bg-gradient-to-br from-[#3f0071] to-[#610094] p-6 rounded-xl shadow-md w-full max-w-2xl">
      <h2 className="text-xl font-semibold mb-4">{question}</h2>
      <div className="space-y-2">
        {options.map((opt, index) => {
          let bgColor = 'bg-purple-800 hover:bg-purple-700';
          if (selectedOption !== null) {
            if (index === selectedOption) {
              bgColor = opt.isCorrect ? 'bg-green-600' : 'bg-red-600';
            } else {
              bgColor = 'bg-purple-700';
            }
          }

          return (
            <button
              key={index}
              onClick={() => onSelectOption(index)}
              disabled={selectedOption !== null}
              className={`w-full text-left p-3 rounded transition-colors duration-200 ${bgColor}`}
            >
              {opt.text}
            </button>
          );
        })}
      </div>
    </div>
  );
};
