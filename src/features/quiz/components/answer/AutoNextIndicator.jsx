import React from "react";
import { motion } from "framer-motion";

export default function AutoNextIndicator({ duration = 1.5 }) {
  return (
    <div className="mt-6 flex flex-col items-center justify-center gap-2 animate-fade-in">
      <div className="h-1.5 w-full max-w-[200px] bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: duration, ease: "linear" }}
          className="h-full bg-sky-500 rounded-full"
        />
      </div>
      <span className="text-[10px] font-medium text-gray-400 uppercase tracking-widest">
        Pertanyaan Selanjutnya...
      </span>
    </div>
  );
}
