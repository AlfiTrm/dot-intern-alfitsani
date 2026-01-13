import React from "react";
import { Check, X } from "lucide-react";

export default function AnswerOption({
  answer,
  userAnswer,
  correctAnswer,
  onClick,
  label,
  disabled,
  index,
}) {
  const isSelected = userAnswer === answer;
  const isCorrect = answer === correctAnswer;

  let baseClass = "bg-white border-gray-200 hover:border-gray-300";
  let iconClass = "bg-gray-100 text-gray-600";
  let textClass = "text-gray-700";
  let kbdClass = "text-gray-400 border-gray-200";

  if (userAnswer) {
    if (isCorrect) {
      baseClass = "bg-green-50 border-green-500";
      iconClass = "bg-green-500 text-white";
      textClass = "text-green-800 font-medium";
      kbdClass = "text-green-600 border-green-200";
    } else if (isSelected && !isCorrect) {
      baseClass = "bg-red-50 border-red-500";
      iconClass = "bg-red-500 text-white";
      textClass = "text-red-800 font-medium";
      kbdClass = "text-red-600 border-red-200";
    } else {
      baseClass = "bg-gray-50 border-gray-200 opacity-60";
    }
  } else if (isSelected) {
    baseClass = "bg-sky-50 border-sky-500";
    iconClass = "bg-sky-500 text-white";
    kbdClass = "text-sky-500 border-sky-200";
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      data-answer-index={index}
      className={`relative w-full p-4 rounded-xl border-2 text-left transition flex items-center gap-3 group ${baseClass}`}
    >
      <span
        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium shrink-0 transition-colors ${iconClass}`}
      >
        {isCorrect && userAnswer ? (
          <Check className="w-4 h-4" />
        ) : isSelected && !isCorrect && userAnswer ? (
          <X className="w-4 h-4" />
        ) : (
          label
        )}
      </span>
      <span
        className={textClass}
        dangerouslySetInnerHTML={{ __html: answer }}
      />

      <span
        className={`absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-mono border px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity hidden md:block ${kbdClass}`}
      >
        {index + 1}
      </span>
    </button>
  );
}
