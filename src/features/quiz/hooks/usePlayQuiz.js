import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../shared/components/Toast";

const SECONDS_PER_QUESTION = {
  easy: 120,
  medium: 60,
  hard: 30,
  "": 60,
};

const STORAGE_KEY = "quisip_quiz_progress";

function calculateTime(amount, difficulty) {
  const secondsPerQuestion = SECONDS_PER_QUESTION[difficulty] || 60;
  return amount * secondsPerQuestion;
}

export default function usePlayQuiz() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const timerRef = useRef(null);
  const autoNextTimeoutRef = useRef(null);

  const [questions, setQuestions] = useState([]);
  const [config, setConfig] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedProgress = localStorage.getItem(STORAGE_KEY);
    const savedData = localStorage.getItem("quisip_quiz_data");

    if (!savedData) {
      showToast("Data kuis tidak ditemukan", "error", 2000);
      navigate("/setup");
      return;
    }

    const { questions: savedQuestions, config: savedConfig } =
      JSON.parse(savedData);

    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      const elapsedSeconds = Math.floor(
        (Date.now() - progress.startTime) / 1000
      );
      const remainingTime = Math.max(0, progress.totalTime - elapsedSeconds);

      if (remainingTime <= 0) {
        finishQuizWithData(
          progress.answers,
          savedQuestions,
          savedConfig,
          progress.totalTime,
          0
        );
        return;
      }

      setQuestions(savedQuestions);
      setConfig(savedConfig);
      setCurrentIndex(progress.currentIndex);
      setAnswers(progress.answers);
      setTimeLeft(remainingTime);
      setTotalTime(progress.totalTime);
    } else {
      const time = calculateTime(savedQuestions.length, savedConfig.difficulty);

      setQuestions(savedQuestions);
      setConfig(savedConfig);
      setTimeLeft(time);
      setTotalTime(time);
      setAnswers(new Array(savedQuestions.length).fill(null));

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          startTime: Date.now(),
          totalTime: time,
          currentIndex: 0,
          answers: new Array(savedQuestions.length).fill(null),
        })
      );
    }

    setIsLoaded(true);
  }, [navigate, showToast]);

  const saveProgress = useCallback(
    (newIndex, newAnswers) => {
      const savedProgress = localStorage.getItem(STORAGE_KEY);
      const startTime = savedProgress
        ? JSON.parse(savedProgress).startTime
        : Date.now();

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          startTime,
          totalTime,
          currentIndex: newIndex,
          answers: newAnswers,
        })
      );
    },
    [totalTime]
  );

  useEffect(() => {
    if (!isLoaded || timeLeft <= 0 || isFinished || questions.length === 0)
      return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          finishQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isLoaded, isFinished, questions.length]);

  useEffect(() => {
    return () => {
      if (autoNextTimeoutRef.current) clearTimeout(autoNextTimeoutRef.current);
    };
  }, []);

  const finishQuizWithData = useCallback(
    (finalAnswers, quizQuestions, quizConfig, quizTotalTime, quizTimeLeft) => {
      setIsFinished(true);

      let correct = 0;
      let wrong = 0;
      let unanswered = 0;

      finalAnswers.forEach((answer, index) => {
        if (answer === null) {
          unanswered++;
        } else if (answer === quizQuestions[index]?.correctAnswer) {
          correct++;
        } else {
          wrong++;
        }
      });

      localStorage.setItem(
        "quisip_quiz_result",
        JSON.stringify({
          score: correct,
          correct,
          wrong,
          unanswered,
          total: quizQuestions.length,
          answers: finalAnswers,
          questions: quizQuestions,
          config: quizConfig,
          timeSpent: quizTotalTime - quizTimeLeft,
          totalTime: quizTotalTime,
        })
      );

      localStorage.removeItem(STORAGE_KEY);
      navigate("/results");
    },
    [navigate]
  );

  const finishQuiz = useCallback(
    (finalAnswers = answers) => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (autoNextTimeoutRef.current) clearTimeout(autoNextTimeoutRef.current);
      finishQuizWithData(finalAnswers, questions, config, totalTime, timeLeft);
    },
    [answers, questions, config, totalTime, timeLeft, finishQuizWithData]
  );

  const proceedToNext = useCallback(
    (savedIndex, savedAnswers) => {
      if (savedIndex < questions.length - 1) {
        const newIndex = savedIndex + 1;
        setCurrentIndex(newIndex);
        saveProgress(newIndex, savedAnswers);
      } else {
        finishQuiz(savedAnswers);
      }
    },
    [questions.length, saveProgress, finishQuiz]
  );

  const handleAnswer = useCallback(
    (answer) => {
      if (answers[currentIndex] !== null) return;

      const newAnswers = [...answers];
      newAnswers[currentIndex] = answer;
      setAnswers(newAnswers);
      saveProgress(currentIndex, newAnswers);

      if (autoNextTimeoutRef.current) clearTimeout(autoNextTimeoutRef.current);

      autoNextTimeoutRef.current = setTimeout(() => {
        proceedToNext(currentIndex, newAnswers);
      }, 1500);
    },
    [answers, currentIndex, saveProgress, proceedToNext]
  );

  const handleNext = useCallback(() => {
    if (autoNextTimeoutRef.current) clearTimeout(autoNextTimeoutRef.current);
    proceedToNext(currentIndex, answers);
  }, [currentIndex, answers, proceedToNext]);

  return {
    currentQuestion: questions[currentIndex],
    currentIndex,
    totalQuestions: questions.length,
    progress:
      questions.length > 0 ? ((currentIndex + 1) / questions.length) * 100 : 0,
    currentAnswer: answers[currentIndex],
    handleAnswer,
    handleNext,
    timeLeft,
    isFinished,
    isLoaded,
  };
}
