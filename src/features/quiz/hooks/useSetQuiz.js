import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../shared/components/Toast";
import { fetchCategories, fetchQuestions } from "../services/quizApi";

export default function useSetQuiz() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [activeQuiz, setActiveQuiz] = useState(null);

  const [config, setConfig] = useState({
    amount: 10,
    category: "",
    difficulty: "",
    type: "",
  });

  const loadCategories = useCallback(async () => {
    setLoadingCategories(true);
    const cats = await fetchCategories();
    setCategories(cats);
    setLoadingCategories(false);
  }, []);

  const checkActiveQuiz = useCallback(() => {
    const savedProgress = localStorage.getItem("quisip_quiz_progress");
    const savedData = localStorage.getItem("quisip_quiz_data");

    if (savedProgress && savedData) {
      const progress = JSON.parse(savedProgress);
      const data = JSON.parse(savedData);

      const elapsedSeconds = Math.floor(
        (Date.now() - progress.startTime) / 1000
      );
      const remainingTime = Math.max(0, progress.totalTime - elapsedSeconds);

      if (remainingTime > 0) {
        setActiveQuiz({
          ...progress,
          config: data.config,
          totalQuestions: data.questions?.length || 0,
          remainingTime,
        });
      } else {
        localStorage.removeItem("quisip_quiz_progress");
        localStorage.removeItem("quisip_quiz_data");
        setActiveQuiz(null);
      }
    }
  }, []);

  useEffect(() => {
    loadCategories();
    checkActiveQuiz();
  }, [loadCategories, checkActiveQuiz]);

  const updateConfig = useCallback((key, value) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleStart = useCallback(async () => {
    setLoading(true);
    const result = await fetchQuestions(config);
    setLoading(false);

    if (result.success) {
      localStorage.removeItem("quisip_quiz_progress");
      localStorage.removeItem("quisip_quiz_result");

      localStorage.setItem(
        "quisip_quiz_data",
        JSON.stringify({
          questions: result.questions,
          config,
          startTime: Date.now(),
        })
      );
      navigate("/quiz");
    } else {
      showToast(result.error, "error", 4000);
    }
  }, [config, navigate, showToast]);

  const resumeQuiz = () => {
    navigate("/quiz");
  };

  const cancelQuiz = () => {
    localStorage.removeItem("quisip_quiz_progress");
    localStorage.removeItem("quisip_quiz_data");
    setActiveQuiz(null);
    showToast("Kuis dibatalkan", "info");
  };

  const categoryOptions = [
    { value: "", label: "Semua Kategori" },
    ...categories.map((cat) => ({ value: String(cat.id), label: cat.name })),
  ];

  return {
    config,
    updateConfig,
    categoryOptions,
    loading,
    loadingCategories,
    handleStart,
    activeQuiz,
    resumeQuiz,
    cancelQuiz,
  };
}
