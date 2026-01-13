import React from "react";
import Spinner from "./Spinner";

export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  isLoading = false,
  disabled = false,
  fullWidth = false,
  icon: Icon,
  className = "",
  loadingText = "Memproses...",
  ...props
}) {
  const baseStyles =
    "relative font-semibold rounded-xl transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";
  const widthStyles = fullWidth ? "w-full" : "";

  const variants = {
    primary: "bg-sky-500 hover:bg-sky-600 text-white shadow-sm ring-sky-500",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-700 ring-gray-200",
    outline:
      "bg-transparent border-2 border-gray-200 hover:border-gray-300 text-gray-600",
    danger: "bg-red-50 hover:bg-red-100 text-red-600 border border-red-200",
    ghost: "bg-transparent hover:bg-gray-50 text-sky-500 hover:text-sky-600",
  };

  const sizes = "py-3 px-4 text-base";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseStyles} ${widthStyles} ${variants[variant]} ${sizes} ${className}`}
      {...props}
    >
      {isLoading ? (
        <>
          <Spinner
            size="sm"
            className={variant === "primary" ? "text-white" : "text-current"}
          />
          <span>{loadingText}</span>
        </>
      ) : (
        <>
          {Icon && <Icon className="w-5 h-5" />}
          {children}
        </>
      )}
    </button>
  );
}
