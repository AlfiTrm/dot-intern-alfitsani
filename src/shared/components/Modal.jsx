import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { MODAL_VARIANTS } from "../constants/modalVariants";

export default function Modal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Konfirmasi",
  cancelText = "Batal",
  variant = "default",
}) {
  if (!isOpen) return null;

  const config = MODAL_VARIANTS[variant] || MODAL_VARIANTS.default;
  const IconComponent = config.icon;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center">
            {IconComponent && (
              <div className="flex justify-center mb-4">
                <IconComponent className={`w-12 h-12 ${config.iconColor}`} />
              </div>
            )}

            <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
            <p className="text-gray-500 mb-6">{message}</p>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition"
              >
                {cancelText}
              </button>
              <button
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className={`flex-1 py-3 px-4 font-medium rounded-xl transition ${config.confirmClass}`}
              >
                {confirmText}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
