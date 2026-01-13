import React from "react";
import { BarChart3 } from "lucide-react";

const DIFFICULTIES = [
  {
    value: "easy",
    label: "Mudah",
    color: "text-green-600 bg-white/50 hover:bg-white/80",
    active: "bg-green-500 text-white shadow-lg shadow-green-500/30",
  },
  {
    value: "medium",
    label: "Sedang",
    color: "text-yellow-600 bg-white/50 hover:bg-white/80",
    active: "bg-yellow-500 text-white shadow-lg shadow-yellow-500/30",
  },
  {
    value: "hard",
    label: "Sulit",
    color: "text-red-600 bg-white/50 hover:bg-white/80",
    active: "bg-red-500 text-white shadow-lg shadow-red-500/30",
  },
];

export default function DifficultySelector({ value, onChange }) {
  const getButtonClass = (diff) => {
    const isActive = value === diff.value;
    return isActive ? diff.active : diff.color;
  };

  const isAllSelected = value === "";

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <label className="flex items-center gap-2 text-xs md:text-sm font-bold text-gray-800 uppercase tracking-wider">
          <BarChart3 className="w-3 h-3 md:w-4 md:h-4 text-sky-500" />
          Tingkat Kesulitan
        </label>
        <button
          onClick={() => onChange("")}
          className={`text-xs font-bold px-3 py-1 rounded-full transition-all ${
            isAllSelected
              ? "bg-sky-500 text-white shadow-md shadow-sky-500/30"
              : "text-gray-500 hover:text-sky-500 hover:bg-sky-50"
          }`}
        >
          Semua
        </button>
      </div>
      <div className="grid grid-cols-3 gap-2 md:gap-3">
        {DIFFICULTIES.map((diff) => (
          <button
            key={diff.value}
            onClick={() => onChange(diff.value)}
            className={`py-3 md:py-4 px-2 rounded-xl md:rounded-2xl font-bold text-xs md:text-sm transition-all duration-300 border border-transparent ${getButtonClass(
              diff
            )}`}
          >
            {diff.label}
          </button>
        ))}
      </div>
    </div>
  );
}
