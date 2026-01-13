import React from "react";
import { Hash } from "lucide-react";

const AMOUNTS = [5, 10, 15, 20, 25, 30, 40, 50];

export default function AmountSelector({ value, onChange }) {
  return (
    <div>
      <label className="flex items-center gap-2 text-xs md:text-sm font-bold text-gray-800 mb-3 uppercase tracking-wider">
        <Hash className="w-3 h-3 md:w-4 md:h-4 text-sky-500" />
        Jumlah Soal
      </label>
      <div className="grid grid-cols-4 gap-2 md:gap-3">
        {AMOUNTS.map((num) => (
          <button
            key={num}
            onClick={() => onChange(num)}
            className={`py-2.5 md:py-3 rounded-xl md:rounded-2xl font-bold text-xs md:text-sm transition-all duration-200 border ${
              value === num
                ? "bg-sky-500 text-white border-sky-500 shadow-md shadow-sky-500/20"
                : "bg-white/50 text-gray-600 border-transparent hover:bg-white/80 hover:border-sky-200"
            }`}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
}
