import React from "react";
import { Check, X } from "lucide-react";
import { getAnswerStyles } from "../../utils/answerStyles";

export default function AnswerOption({
  answer,
  userAnswer,
  correctAnswer,
  onClick,
  label,
  disabled,
  index,
}) {
  const { baseClass, iconClass, textClass, kbdClass, isSelected, isCorrect } =
    getAnswerStyles(userAnswer, answer, correctAnswer);

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
