import React from "react";

export default function QuestionCard({ question, category, difficulty }) {
  const difficultyColors = {
    easy: "bg-green-100 text-green-700",
    medium: "bg-yellow-100 text-yellow-700",
    hard: "bg-red-100 text-red-700",
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-bold tracking-wider text-sky-500 uppercase bg-sky-50 px-3 py-1 rounded-full">
          {category}
        </span>
        <span
          className={`text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider ${
            difficultyColors[difficulty] || "bg-gray-100 text-gray-600"
          }`}
        >
          {difficulty === "easy"
            ? "Mudah"
            : difficulty === "medium"
            ? "Sedang"
            : "Sulit"}
        </span>
      </div>

      <h2 className="text-xl md:text-2xl font-bold text-gray-800 leading-relaxed">
        {question}
      </h2>
    </div>
  );
}
