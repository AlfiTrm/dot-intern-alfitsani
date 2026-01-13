import React from "react";
import { RefreshCw } from "lucide-react";
import Navbar from "../../../shared/components/Navbar";
import { ScoreCard, AnswerReview } from "../components/summary";
import useResults from "../hooks/useResults";
import useConfetti from "../hooks/useConfetti";
import Spinner from "../../../shared/components/Spinner";
import Button from "../../../shared/components/Button";
import GridMotion from "../components/GridMotion";
import { getResultTheme } from "../utils";

export default function ResultsScreen() {
  const { result, handlePlayAgain } = useResults();

  const percentage = result
    ? Math.round((result.score / result.total) * 100)
    : 0;

  useConfetti(percentage);

  if (!result) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Spinner size="lg" className="text-sky-500" />
      </div>
    );
  }

  const theme = getResultTheme(percentage);

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
