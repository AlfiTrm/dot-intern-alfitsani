export { getAnswerStyles } from "./answerStyles";

export function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s}s`;
}

export function getResultTheme(percentage) {
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
}
