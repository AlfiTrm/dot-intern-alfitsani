import React, { useEffect } from "react";
import { RefreshCw } from "lucide-react";
import confetti from "canvas-confetti";
import Navbar from "../../../shared/components/Navbar";
import { ScoreCard, AnswerReview } from "../components/summary";
import useResults from "../hooks/useResults";
import Spinner from "../../../shared/components/Spinner";
import Button from "../../../shared/components/Button";
import GridMotion from "../components/GridMotion";

export default function ResultsScreen() {
  const { result, handlePlayAgain } = useResults();

  useEffect(() => {
    if (result) {
      const percentage = (result.score / result.total) * 100;

      if (percentage >= 70) {
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = {
          startVelocity: 30,
          spread: 360,
          ticks: 60,
          zIndex: 0,
        };

        const randomInRange = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(() => {
          const timeLeft = animationEnd - Date.now();

          if (timeLeft <= 0) {
            return clearInterval(interval);
          }

          const particleCount = 50 * (timeLeft / duration);

          confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          });
          confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          });
        }, 250);
      }
    }
  }, [result]);

  if (!result) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Spinner size="lg" className="text-sky-500" />
      </div>
    );
  }

  const percentage = Math.round((result.score / result.total) * 100);

  const getTheme = () => {
    if (percentage === 100)
      return {
        gradient: "rgba(234, 179, 8, 0.15)",
        itemClass: "text-amber-500/20",
        items: Array(60).fill("PERFECT"),
      };
    if (percentage >= 75)
      return {
        gradient: "rgba(34, 197, 94, 0.15)",
        itemClass: "text-green-500/20",
        items: Array(60).fill("KEREN"),
      };
    if (percentage >= 50)
      return {
        gradient: "rgba(59, 130, 246, 0.15)",
        itemClass: "text-blue-500/20",
        items: Array(60).fill("SIPP"),
      };
    return {
      gradient: "rgba(239, 68, 68, 0.15)",
      itemClass: "text-red-500/10",
      items: Array(60).fill("NT"),
    };
  };

  const theme = getTheme();

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <Navbar />

      <div className="fixed inset-0 pointer-events-none z-0 hidden md:block">
        <GridMotion
          items={theme.items}
          gradientColor={theme.gradient}
          itemClassName={theme.itemClass}
        />
      </div>

      <main className="relative z-10 max-w-2xl mx-auto px-4 pt-24 md:pt-32 pb-12">
        <div className="text-center mb-6 md:mb-10">
          <h1 className="text-2xl md:text-3xl font-black text-primary mb-2">
            Ringkasan Kuis
          </h1>
          <p className="text-gray-500">Lihat performa dan review jawabanmu</p>
        </div>

        <ScoreCard result={result} />

        <div className="flex gap-3 mb-12">
          <Button
            onClick={handlePlayAgain}
            variant="primary"
            fullWidth
            className="py-4 rounded-2xl font-bold shadow-lg shadow-sky-500/20"
            icon={RefreshCw}
          >
            Main Lagi
          </Button>
        </div>

        <AnswerReview questions={result.questions} answers={result.answers} />
      </main>
    </div>
  );
}
