import React from "react";
import { Award, Frown, ThumbsUp, PartyPopper, Star } from "lucide-react";

export default function ScoreCard({ result }) {
  const { score, total, timeSpent, wrong } = result;
  const percentage = Math.round((score / total) * 100);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s`;
  };

  const getResultFeedback = () => {
    if (percentage === 100)
      return {
        title: "Sempurna!",
        desc: "Kamu berhasil menjawab semua dengan benar!",
        icon: Star,
        color: "bg-yellow-500",
        shadow: "shadow-yellow-500/20",
        badge: "bg-yellow-600",
      };
    if (percentage >= 75)
      return {
        title: "Woww Well Done!",
        desc: "Hasil yang sangat memuaskan, pertahankan!",
        icon: PartyPopper,
        color: "bg-green-500",
        shadow: "shadow-green-500/20",
        badge: "bg-green-600",
      };
    if (percentage >= 50)
      return {
        title: "Udah GG Kok!",
        desc: "Lumayan lah, tapi masih bisa ditingkatin lagi!",
        icon: ThumbsUp,
        color: "bg-blue-500",
        shadow: "shadow-blue-500/20",
        badge: "bg-blue-600",
      };
    return {
      title: "Yahh NT..",
      desc: "Jangan sedih, coba pelajari lagi materinya ya.",
      icon: Frown,
      color: "bg-red-500",
      shadow: "shadow-red-500/20",
      badge: "bg-red-600",
    };
  };

  const feedback = getResultFeedback();
  const Icon = feedback.icon;

  return (
    <div className="mb-6 md:mb-8">
      <div
        className={`${feedback.color} rounded-2xl md:rounded-3xl p-5 md:p-8 text-center text-white shadow-xl ${feedback.shadow} mb-4 md:mb-6 relative overflow-hidden transition-colors duration-500`}
      >
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path d="M0 0 L100 0 L100 100 Z" fill="white" />
          </svg>
        </div>

        <div className="relative z-10 flex flex-col items-center">
          <div className="inline-flex items-center justify-center p-2 md:p-3 bg-white/20 backdrop-blur-sm rounded-xl md:rounded-2xl mb-3 md:mb-4">
            <Icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
          </div>
          <h2 className="text-2xl md:text-4xl font-black mb-1 md:mb-2 tracking-tight">
            {feedback.title}
          </h2>
          <p className="text-white/90 font-medium mb-4 md:mb-6 max-w-sm mx-auto text-sm md:text-base">
            {feedback.desc}
          </p>
          <div className="inline-block bg-black/20 backdrop-blur-md rounded-lg md:rounded-xl px-3 md:px-4 py-1.5 md:py-2 border border-white/10">
            <p className="text-white text-xs md:text-sm font-medium">
              Skor Akhir:{" "}
              <span className="font-bold text-base md:text-lg ml-1">
                {score} / {total}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 md:gap-4">
        <div className="p-3 md:p-4 rounded-xl md:rounded-2xl border border-gray-100 flex flex-col items-center justify-center bg-white shadow-sm">
          <span className="text-gray-400 text-[8px] md:text-[10px] font-bold uppercase tracking-wider mb-1 md:mb-2">
            Akurasi
          </span>
          <span
            className={`text-lg md:text-xl font-black ${
              percentage >= 70
                ? "text-green-500"
                : percentage >= 50
                ? "text-blue-500"
                : "text-red-500"
            }`}
          >
            {percentage}%
          </span>
        </div>
        <div className="p-3 md:p-4 rounded-xl md:rounded-2xl border border-gray-100 flex flex-col items-center justify-center bg-white shadow-sm">
          <span className="text-gray-400 text-[8px] md:text-[10px] font-bold uppercase tracking-wider mb-1 md:mb-2">
            Waktu
          </span>
          <span className="text-lg md:text-xl font-black text-gray-800 font-mono">
            {formatTime(timeSpent)}
          </span>
        </div>
        <div className="p-3 md:p-4 rounded-xl md:rounded-2xl border border-gray-100 flex flex-col items-center justify-center bg-white shadow-sm">
          <span className="text-gray-400 text-[8px] md:text-[10px] font-bold uppercase tracking-wider mb-1 md:mb-2">
            Salah
          </span>
          <span className="text-lg md:text-xl font-black text-red-500">
            {wrong}
          </span>
        </div>
      </div>
    </div>
  );
}
