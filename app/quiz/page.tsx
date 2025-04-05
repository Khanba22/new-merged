"use client";
import { QuizQuestion } from '@/components/quiz-question';
import { QuizResult } from '@/components/quiz-result';
import { useState } from 'react';

const questions = [
  {
    question: 'Which authority is responsible for collecting income tax?',
    options: [
      { text: 'IRS', isCorrect: true },
      { text: 'FBI', isCorrect: false },
      { text: 'CIA', isCorrect: false },
      { text: 'NASA', isCorrect: false },
    ],
  },
  {
    question: 'Who administers sales tax?',
    options: [
      { text: 'State Tax Authorities', isCorrect: true },
      { text: 'Federal Government', isCorrect: false },
      { text: 'UN', isCorrect: false },
      { text: 'Local Hospitals', isCorrect: false },
    ],
  },
  {
    question: 'What is the purpose of VAT?',
    options: [
      { text: 'Tax on imports only', isCorrect: false },
      { text: 'Value-added at each production stage', isCorrect: true },
      { text: 'Income redistribution', isCorrect: false },
      { text: 'Corporate profits', isCorrect: false },
    ],
  },
  {
    question: 'Which agency handles federal taxes in the US?',
    options: [
      { text: 'FBI', isCorrect: false },
      { text: 'IRS', isCorrect: true },
      { text: 'USPS', isCorrect: false },
      { text: 'SEC', isCorrect: false },
    ],
  },
  {
    question: 'Customs duties are managed by?',
    options: [
      { text: 'US Customs and Border Protection', isCorrect: true },
      { text: 'IRS', isCorrect: false },
      { text: 'EPA', isCorrect: false },
      { text: 'CIA', isCorrect: false },
    ],
  },
  {
    question: 'Who governs excise taxes?',
    options: [
      { text: 'State and federal authorities', isCorrect: true },
      { text: 'Private companies', isCorrect: false },
      { text: 'Local schools', isCorrect: false },
      { text: 'UNESCO', isCorrect: false },
    ],
  },
  {
    question: 'What tax is used to fund Social Security?',
    options: [
      { text: 'Payroll tax', isCorrect: true },
      { text: 'Property tax', isCorrect: false },
      { text: 'Sales tax', isCorrect: false },
      { text: 'Excise tax', isCorrect: false },
    ],
  },
  {
    question: 'Which tax is based on property value?',
    options: [
      { text: 'Property tax', isCorrect: true },
      { text: 'Income tax', isCorrect: false },
      { text: 'Capital gains tax', isCorrect: false },
      { text: 'Sales tax', isCorrect: false },
    ],
  },
  {
    question: 'Capital gains tax is paid on?',
    options: [
      { text: 'Gifts received', isCorrect: false },
      { text: 'Investment profits', isCorrect: true },
      { text: 'Salaries', isCorrect: false },
      { text: 'Dividends', isCorrect: false },
    ],
  },
  {
    question: 'Who sets local municipal taxes?',
    options: [
      { text: 'City or town councils', isCorrect: true },
      { text: 'Federal Reserve', isCorrect: false },
      { text: 'Supreme Court', isCorrect: false },
      { text: 'FBI', isCorrect: false },
    ],
  },
];

export default function QuizPage() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const handleSelect = (index: number) => {
    if (selected === null) {
      setSelected(index);
      if (questions[current].options[index].isCorrect) {
        setScore((s) => s + 1);
      }
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
  };

  return (
    <div className="min-h-screen bg-gradient-to-b flex flex-col items-center justify-center px-4 py-10 transition-all duration-500 ease-in-out">
      <div className="w-full max-w-xl bg-white bg-opacity-80 backdrop-blur-md rounded-xl  p-8 space-y-6 transition-all duration-500 ease-in-out">
        {!completed ? (
          <>
            <QuizQuestion
              question={questions[current].question}
              options={questions[current].options}
              selectedOption={selected}
              onSelectOption={handleSelect}
            />
            {selected !== null && (
              <div className="text-center">
                <button
                  onClick={handleNext}
                  className="mt-4 bg-purple-500 hover:bg-purple-600 text-white py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
                >
                  {current + 1 < questions.length ? 'Next' : 'Finish Quiz'}
                </button>
              </div>
            )}
          </>
        ) : (
          <QuizResult score={score} total={questions.length} onRestart={restart} />
        )}
      </div>
    </div>
  );
}
