import React, { useState } from "react";
import { Play, AlertCircle } from "lucide-react";
import Navbar from "../../../shared/components/Navbar";
import Button from "../../../shared/components/Button";
import Modal from "../../../shared/components/Modal";
import {
  AmountSelector,
  CategorySelector,
  DifficultySelector,
  TypeSelector,
} from "../components/setup";
import useSetQuiz from "../hooks/useSetQuiz";
import useResumeTimer from "../hooks/useResumeTimer";
import GridMotion from "../components/GridMotion";
import { formatTime } from "../utils";

export default function SetQuiz() {
  const {
    config,
    updateConfig,
    categoryOptions,
    loading,
    loadingCategories,
    handleStart,
    activeQuiz,
    resumeQuiz,
    cancelQuiz,
  } = useSetQuiz();

  const resumeTime = useResumeTimer(activeQuiz);
  const [showResetModal, setShowResetModal] = useState(false);

  const handleCreateNew = () => {
    setShowResetModal(true);
  };

  const confirmReset = () => {
    cancelQuiz();
    setShowResetModal(false);
  };

  const gridItems = new Array(56).fill("QuiSip");

  return (
    <div className="min-h-screen bg-transparent relative overflow-hidden">
      <div className="absolute inset-0 z-0 hidden md:block">
        <GridMotion items={gridItems} />
      </div>

      <div className="relative z-10 bg-white/60 min-h-screen">
        <Navbar />

        <main className="max-w-2xl mx-auto px-4 pb-12 pt-24 md:pt-32">
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-3xl md:text-5xl font-black text-sky-500 mb-2 tracking-tighter">
              Setup Quiz
            </h2>
            <p className="text-gray-500 font-medium text-sm md:text-base">
              Custom kuis sesukamu, gas main!
            </p>
          </div>

          <div className="bg-white/40 backdrop-blur-2xl border border-white/50 rounded-2xl md:rounded-3xl p-5 md:p-8 space-y-6 md:space-y-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-8 transition-all duration-500">
            {activeQuiz && resumeTime > 0 ? (
              <div className="space-y-6 animate-fade-in">
                <div className="flex flex-col items-center text-center p-2">
                  <div className="mb-2">
                    <span className="text-sky-500 font-medium tracking-wide text-xs bg-sky-50 px-3 py-1 rounded-full">
                      Sedang Berlangsung
                    </span>
                  </div>

                  <h3 className="font-bold text-gray-800 text-3xl mb-6 tracking-tight">
                    {categoryOptions.find(
                      (c) => c.value === activeQuiz.config?.category
                    )?.label || "Semua Kategori"}
                  </h3>

                  <div className="grid grid-cols-3 gap-4 w-full mb-8">
                    <div className="p-4 rounded-xl border border-gray-100 flex flex-col items-center justify-center">
                      <span className="text-gray-400 text-[10px] font-medium uppercase tracking-wider mb-1">
                        Level
                      </span>
                      <span
                        className={`font-semibold text-lg ${
                          activeQuiz.config?.difficulty === "easy"
                            ? "text-green-600"
                            : activeQuiz.config?.difficulty === "medium"
                            ? "text-yellow-600"
                            : activeQuiz.config?.difficulty === "hard"
                            ? "text-red-600"
                            : "text-gray-600"
                        }`}
                      >
                        {activeQuiz.config?.difficulty === "easy"
                          ? "Mudah"
                          : activeQuiz.config?.difficulty === "medium"
                          ? "Sedang"
                          : activeQuiz.config?.difficulty === "hard"
                          ? "Sulit"
                          : "Semua"}
                      </span>
                    </div>
                    <div className="p-4 rounded-xl border border-gray-100 flex flex-col items-center justify-center">
                      <span className="text-gray-400 text-[10px] font-medium uppercase tracking-wider mb-1">
                        Waktu
                      </span>
                      <span className="font-mono font-semibold text-lg text-gray-700">
                        {formatTime(resumeTime)}
                      </span>
                    </div>
                    <div className="p-4 rounded-xl border border-gray-100 flex flex-col items-center justify-center">
                      <span className="text-gray-400 text-[10px] font-medium uppercase tracking-wider mb-1">
                        Progress
                      </span>
                      <span className="font-semibold text-lg text-gray-700">
                        {activeQuiz.currentIndex + 1}/
                        {activeQuiz.totalQuestions}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 w-full">
                    <Button
                      onClick={handleCreateNew}
                      variant="secondary"
                      className="py-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-500 font-medium text-sm transition-all"
                    >
                      Mulai Baru
                    </Button>
                    <Button
                      onClick={resumeQuiz}
                      className="py-3 rounded-xl bg-sky-500 hover:bg-sky-600 text-white shadow-md shadow-sky-500/10 font-medium text-sm transition-all"
                    >
                      Lanjutkan
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-8 animate-fade-in">
                <AmountSelector
                  value={config.amount}
                  onChange={(val) => updateConfig("amount", val)}
                />

                <CategorySelector
                  value={config.category}
                  onChange={(val) => updateConfig("category", val)}
                  options={categoryOptions}
                  loading={loadingCategories}
                />

                <DifficultySelector
                  value={config.difficulty}
                  onChange={(val) => updateConfig("difficulty", val)}
                />

                <TypeSelector
                  value={config.type}
                  onChange={(val) => updateConfig("type", val)}
                />

                <div className="pt-2">
                  <Button
                    onClick={handleStart}
                    disabled={loading}
                    isLoading={loading}
                    loadingText="Memuat Soal..."
                    fullWidth
                    className="py-4 text-lg bg-sky-500 hover:bg-sky-600 shadow-lg shadow-sky-500/30 rounded-2xl font-bold transition-all hover:scale-[1.02] active:scale-[0.98]"
                    icon={Play}
                  >
                    Mulai Kuis Baru
                  </Button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      <Modal
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        title="Mulai Kuis Baru?"
        type="confirm"
        onConfirm={confirmReset}
        confirmText="Ya, Mulai Baru"
        cancelText="Batal"
        icon={AlertCircle}
        iconColor="text-orange-500"
        iconBg="bg-orange-100"
      >
        <p className="text-gray-600">
          Kuis yang sedang berjalan akan <strong>dihapus</strong>. Apakah kamu
          yakin ingin memulai kuis baru dari awal?
        </p>
      </Modal>
    </div>
  );
}
