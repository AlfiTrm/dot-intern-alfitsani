import { useEffect } from "react";

export function useKeyboardShortcuts(handleAnswer, isAnswered) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isAnswered) return;

      const key = e.key.toLowerCase();
      const answers = document.querySelectorAll("button[data-answer-index]");

      let index = -1;
      if (["1", "a"].includes(key)) index = 0;
      if (["2", "b"].includes(key)) index = 1;
      if (["3", "c"].includes(key)) index = 2;
      if (["4", "d"].includes(key)) index = 3;

      if (index !== -1 && answers[index]) {
        answers[index].click();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleAnswer, isAnswered]);
}
