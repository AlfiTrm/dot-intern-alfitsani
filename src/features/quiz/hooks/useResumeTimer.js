import { useState, useEffect } from "react";

export default function useResumeTimer(activeQuiz) {
  const [resumeTime, setResumeTime] = useState(0);

  useEffect(() => {
    if (activeQuiz?.remainingTime) {
      setResumeTime(activeQuiz.remainingTime);
    }
  }, [activeQuiz?.remainingTime]);

  useEffect(() => {
    if (!activeQuiz || resumeTime <= 0) return;

    const interval = setInterval(() => {
      setResumeTime((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [activeQuiz, resumeTime]);

  return resumeTime;
}
