import React from "react";

export default function PasswordStrengthMeter({ password }) {
  if (!password) return null;

  const getPasswordStrength = (pass) => {
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[a-z]/.test(pass) && /[A-Z]/.test(pass)) score++;
    if (/\d/.test(pass)) score++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(pass)) score++;
    return score;
  };

  const strength = getPasswordStrength(password);
  const strengthColor = [
    "bg-gray-200",
    "bg-red-500",
    "bg-yellow-500",
    "bg-green-500",
    "bg-green-600",
  ][strength];
  const strengthLabel = ["", "Lemah", "Cukup", "Kuat", "Sangat Kuat"][strength];

  return (
    <div className="mt-2 flex items-center gap-2 animate-fade-in">
      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${strengthColor}`}
          style={{ width: `${(strength / 4) * 100}%` }}
        />
      </div>
      <span className="text-xs text-gray-500 w-16 text-right font-medium">
        {strengthLabel}
      </span>
    </div>
  );
}
