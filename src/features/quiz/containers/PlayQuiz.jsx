import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../../../shared/components/Navbar";
import Spinner from "../../../shared/components/Spinner";
import {
  QuestionCard,
  AnswerOption,
  QuizTimer,
  AutoNextIndicator,
} from "../components/answer";
import usePlayQuiz from "../hooks/usePlayQuiz";
import { useKeyboardShortcuts } from "../hooks/useKeyboardShortcuts";

export default function PlayQuiz() {
  const {
    currentQuestion,
    currentIndex,
    totalQuestions,
    progress,
    currentAnswer,
    handleAnswer,
    timeLeft,
    isLoaded,
  } = usePlayQuiz();

  const isAnswered = currentAnswer !== null;

  useKeyboardShortcuts(handleAnswer, isAnswered);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Spinner size="lg" className="text-sky-500 mx-auto mb-4" />
          <p className="text-gray-500">Memuat kuis...</p>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Memuat soal...</p>
      </div>
    );
  }

  const answerLabels = ["A", "B", "C", "D"];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-2xl mx-auto px-4 pb-8 pt-32 w-full">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-gray-400 text-xs font-bold uppercase tracking-wider block mb-1">
                Pertanyaan
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black text-gray-800">
                  {currentIndex + 1}
                </span>
                <span className="text-lg font-medium text-gray-400">
                  /{totalQuestions}
                </span>
              </div>
            </div>
            <QuizTimer timeLeft={timeLeft} />
          </div>

          <div className="h-2 bg-gray-100 rounded-full overflow-hidden w-full">
            <motion.div
              className="h-full bg-sky-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <QuestionCard
              question={currentQuestion.question}
              category={currentQuestion.category}
              difficulty={currentQuestion.difficulty}
              index={currentIndex}
              total={totalQuestions}
            />

            <div className="space-y-3 mb-6">
              {currentQuestion.allAnswers.map((answer, idx) => (
                <AnswerOption
                  key={`${currentIndex}-${idx}`}
                  index={idx}
                  answer={answer}
                  label={answerLabels[idx]}
                  userAnswer={currentAnswer}
                  correctAnswer={currentQuestion.correctAnswer}
                  onClick={() => handleAnswer(answer)}
                  disabled={isAnswered}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {isAnswered && <AutoNextIndicator duration={1.5} />}
      </main>

      <div className="hidden md:block fixed bottom-4 right-4 text-xs text-gray-400 font-mono">
        Tekan <span className="border border-gray-300 rounded px-1">1-4</span>{" "}
        atau <span className="border border-gray-300 rounded px-1">A-D</span>{" "}
        untuk menjawab
      </div>
    </div>
  );
}
