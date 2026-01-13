import React from "react";
import { Check, X } from "lucide-react";

export default function AnswerReview({ questions, answers }) {
  return (
    <div className="space-y-4 md:space-y-6">
      <h3 className="text-base md:text-xl font-bold text-gray-800 border-b border-gray-100 pb-3 md:pb-4">
        Detail Jawaban ({questions.length} Soal)
      </h3>

      {questions.map((q, index) => {
        const userAnswer = answers[index];
        const isCorrect = userAnswer === q.correctAnswer;
        const isSkipped = userAnswer === null;

        return (
          <div
            key={index}
            className={`p-4 md:p-6 rounded-xl md:rounded-2xl border transition-all ${
              isCorrect
                ? "border-green-200 bg-green-50/50"
                : isSkipped
                ? "border-gray-200 bg-gray-50"
                : "border-red-200 bg-red-50/50"
            }`}
          >
            <div className="flex items-start gap-2 md:gap-3 mb-3 md:mb-4">
              <span className="text-xs md:text-sm font-bold text-gray-400 mt-0.5">
                #{index + 1}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h4
                    className="text-gray-800 font-medium leading-relaxed text-sm md:text-base"
                    dangerouslySetInnerHTML={{ __html: q.question }}
                  />
                  <div
                    className={`px-2 py-0.5 rounded-full text-[10px] md:text-xs font-bold uppercase shrink-0 ${
                      isCorrect
                        ? "bg-green-100 text-green-700"
                        : isSkipped
                        ? "bg-gray-200 text-gray-600"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {isCorrect ? "Benar" : isSkipped ? "Dilewati" : "Salah"}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-2 ml-5 md:ml-7">
              {q.allAnswers.map((opt, i) => {
                const isThisCorrect = opt === q.correctAnswer;
                const isThisUserAnswer = opt === userAnswer;
                const isWrongUserChoice = isThisUserAnswer && !isThisCorrect;

                return (
                  <div
                    key={i}
                    className={`flex items-center gap-2 p-2.5 md:p-3 rounded-lg md:rounded-xl border text-sm md:text-base transition-all ${
                      isThisCorrect
                        ? "bg-green-100 border-green-300 text-green-800 font-medium"
                        : isWrongUserChoice
                        ? "bg-red-100 border-red-300 text-red-800 line-through"
                        : "bg-white border-gray-200 text-gray-600"
                    }`}
                  >
                    {isThisCorrect && (
                      <Check className="w-4 h-4 text-green-600 shrink-0" />
                    )}
                    {isWrongUserChoice && (
                      <X className="w-4 h-4 text-red-600 shrink-0" />
                    )}
                    <span dangerouslySetInnerHTML={{ __html: opt }} />
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
