export function getAnswerStyles(userAnswer, answer, correctAnswer) {
  const isSelected = userAnswer === answer;
  const isCorrect = answer === correctAnswer;

  let baseClass = "bg-white border-gray-200 hover:border-gray-300";
  let iconClass = "bg-gray-100 text-gray-600";
  let textClass = "text-gray-700";
  let kbdClass = "text-gray-400 border-gray-200";

  if (userAnswer) {
    if (isCorrect) {
      baseClass = "bg-green-50 border-green-500";
      iconClass = "bg-green-500 text-white";
      textClass = "text-green-800 font-medium";
      kbdClass = "text-green-600 border-green-200";
    } else if (isSelected && !isCorrect) {
      baseClass = "bg-red-50 border-red-500";
      iconClass = "bg-red-500 text-white";
      textClass = "text-red-800 font-medium";
      kbdClass = "text-red-600 border-red-200";
    } else {
      baseClass = "bg-gray-50 border-gray-200 opacity-60";
    }
  } else if (isSelected) {
    baseClass = "bg-sky-50 border-sky-500";
    iconClass = "bg-sky-500 text-white";
    kbdClass = "text-sky-500 border-sky-200";
  }

  return { baseClass, iconClass, textClass, kbdClass, isSelected, isCorrect };
}
