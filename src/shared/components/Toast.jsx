import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Info, AlertTriangle } from "lucide-react";

const ToastContext = createContext();

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
}

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  const showToast = useCallback(
    (message, type = "success", duration = 2000) => {
      setToast({ message, type, duration });
    },
    []
  );

  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      <AnimatePresence>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            duration={toast.duration}
            onClose={hideToast}
          />
        )}
      </AnimatePresence>
    </ToastContext.Provider>
  );
}

function Toast({ message, type, duration, onClose }) {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const interval = 10;
    const step = (100 / duration) * interval;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          onClose();
          return 0;
        }
        return prev - step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [duration, onClose]);

  const config = {
    success: {
      bg: "bg-white",
      border: "border-green-500",
      icon: "text-green-500",
      progressBg: "bg-green-500",
    },
    error: {
      bg: "bg-white",
      border: "border-red-500",
      icon: "text-red-500",
      progressBg: "bg-red-500",
    },
    info: {
      bg: "bg-white",
      border: "border-sky-500",
      icon: "text-sky-500",
      progressBg: "bg-sky-500",
    },
    warning: {
      bg: "bg-white",
      border: "border-yellow-500",
      icon: "text-yellow-500",
      progressBg: "bg-yellow-500",
    },
  }[type];

  const icons = {
    success: <Check className="w-5 h-5" />,
    error: <X className="w-5 h-5" />,
    info: <Info className="w-5 h-5" />,
    warning: <AlertTriangle className="w-5 h-5" />,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, x: "-50%" }}
      animate={{ opacity: 1, y: 0, x: "-50%" }}
      exit={{ opacity: 0, y: -20, x: "-50%" }}
      className={`fixed top-6 left-1/2 z-50 ${config.bg} border-l-4 ${config.border} rounded-lg shadow-lg overflow-hidden min-w-[300px]`}
    >
      <div className="px-4 py-3 flex items-center gap-3">
        <span className={config.icon}>{icons[type]}</span>
        <span className="text-gray-800 font-medium">{message}</span>
      </div>
      <div className="h-1 bg-gray-100">
        <motion.div
          className={`h-full ${config.progressBg}`}
          initial={{ width: "100%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.01, ease: "linear" }}
        />
      </div>
    </motion.div>
  );
}

export default Toast;
