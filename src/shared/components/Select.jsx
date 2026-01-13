import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export default function Select({
  value,
  onChange,
  options = [],
  placeholder = "Pilih opsi",
  disabled = false,
  icon: Icon,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`w-full px-4 py-4 rounded-2xl border text-left flex items-center justify-between gap-2 transition-all duration-300
          ${
            disabled
              ? "opacity-50 cursor-not-allowed bg-gray-100"
              : "cursor-pointer bg-white/50 backdrop-blur-sm hover:bg-white/80"
          }
          ${
            isOpen
              ? "border-sky-500 ring-4 ring-sky-500/10 shadow-lg shadow-sky-500/10"
              : "border-transparent hover:border-sky-200"
          }
        `}
      >
        <div className="flex items-center gap-3">
          {Icon && <Icon className="w-5 h-5 text-sky-500" />}
          <span
            className={`font-semibold ${
              selectedOption ? "text-gray-800" : "text-gray-400"
            }`}
          >
            {selectedOption?.label || placeholder}
          </span>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
            isOpen ? "rotate-180 text-sky-500" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white/90 backdrop-blur-xl border border-white/50 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] max-h-60 overflow-y-auto p-1 custom-scrollbar">
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-3 text-left hover:bg-sky-50 transition-colors rounded-xl font-medium text-sm
                ${
                  opt.value === value
                    ? "bg-sky-50 text-sky-600 font-bold"
                    : "text-gray-600"
                }
              `}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
