import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function FormInput({
  label,
  name,
  type = "text",
  placeholder,
  register,
  error,
  icon: Icon,
  className = "",
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  const baseInputClass = `w-full ${Icon ? "pl-9 md:pl-11" : "pl-3 md:pl-4"} ${
    isPassword ? "pr-10 md:pr-12" : "pr-3 md:pr-4"
  } py-2.5 md:py-3 rounded-lg md:rounded-xl border outline-none transition text-sm md:text-base`;

  const borderColor = error
    ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
    : "border-gray-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20";

  return (
    <div className={className}>
      {label && (
        <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-1.5">
          {label}
        </label>
      )}

      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
        )}

        <input
          {...register(name)}
          type={inputType}
          placeholder={placeholder}
          className={`${baseInputClass} ${borderColor}`}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4 md:w-5 md:h-5" />
            ) : (
              <Eye className="w-4 h-4 md:w-5 md:h-5" />
            )}
          </button>
        )}
      </div>

      {error && (
        <p className="text-red-500 text-xs mt-1 animate-fade-in">
          {error.message}
        </p>
      )}
    </div>
  );
}
