"use client";

import { motion, AnimatePresence } from "framer-motion";
import { WodHint } from "@/types/game";
import { useState } from "react";

interface HintModalProps {
  hints: WodHint[];
  maxHints: number;
  requesting: boolean;
  onRequestHint: () => void;
  onClose?: () => void;
  error?: string | null;
}

export default function HintModal({
  hints,
  maxHints = 3,
  requesting,
  onRequestHint,
  onClose,
  error,
}: HintModalProps) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const hintsUsed = hints.length;
  const hintsRemaining = maxHints - hintsUsed;
  const hasReachedMax = hintsUsed >= maxHints;

  const handleRequestClick = () => {
    if (!hasReachedMax && !requesting) {
      setShowConfirmation(true);
    }
  };

  const handleConfirmRequest = () => {
    setShowConfirmation(false);
    onRequestHint();
  };

  const getHintEmoji = (order: number) => {
    const emojis = ["1️⃣", "2️⃣", "3️⃣"];
    return emojis[order - 1] || "💡";
  };

  const getHintGradient = (order: number) => {
    const gradients = [
      "from-blue-500/20 to-cyan-500/20 border-blue-500/30",
      "from-purple-500/20 to-pink-500/20 border-purple-500/30",
      "from-green-500/20 to-emerald-500/20 border-green-500/30",
    ];
    return gradients[order - 1] || gradients[0];
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
          dir="rtl"
        >
          <div className="text-center">
            {/* Header with emoji and title */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="text-4xl mb-2"
            >
              💡
            </motion.div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2"
            >
              التلميحات
            </motion.div>

            {/* Hints counter */}
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-full text-sm font-semibold text-gray-700 dark:text-gray-300">
                استخدمت {hintsUsed}/{maxHints} تلميحات
              </span>
            </div>

            {/* Display existing hints */}
            {hints.length > 0 && (
              <div className="mb-6 space-y-3 text-right">
                <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3">
                  التلميحات المتاحة:
                </h3>
                {hints
                  .sort((a, b) => a.hint_order - b.hint_order)
                  .map((hint, index) => (
                    <motion.div
                      key={hint.hint_order}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-4 rounded-xl bg-gradient-to-r ${getHintGradient(
                        hint.hint_order
                      )} border backdrop-blur-sm`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl flex-shrink-0">
                          {getHintEmoji(hint.hint_order)}
                        </span>
                        <p className="text-gray-800 dark:text-gray-100 font-medium text-base leading-relaxed">
                          {hint.hint_text}
                        </p>
                      </div>
                    </motion.div>
                  ))}
              </div>
            )}

            {/* Error message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg"
              >
                <p className="text-red-700 dark:text-red-300 text-sm font-medium">
                  {error}
                </p>
              </motion.div>
            )}

            {/* Confirmation section or request button */}
            {!showConfirmation ? (
              <div className="space-y-4">
                {!hasReachedMax && (
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {hintsRemaining === 1
                        ? "لديك تلميح واحد متبقي"
                        : `لديك ${hintsRemaining} تلميحات متبقية`}
                    </p>
                  </div>
                )}

                {hasReachedMax ? (
                  <div className="p-6 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-xl border border-gray-300 dark:border-gray-600">
                    <div className="text-3xl mb-2">🎯</div>
                    <p className="text-gray-700 dark:text-gray-300 font-semibold">
                      استخدمت جميع التلميحات المتاحة
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      حظًا موفقًا في إيجاد الكلمة السرية!
                    </p>
                  </div>
                ) : (
                  <button
                    onClick={handleRequestClick}
                    disabled={requesting || hasReachedMax}
                    className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 dark:from-cyan-600 dark:to-blue-600 dark:hover:from-cyan-700 dark:hover:to-blue-700 text-white font-semibold rounded-lg transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {requesting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="animate-spin h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        جاري الحصول على التلميح...
                      </span>
                    ) : (
                      "احصل على تلميح"
                    )}
                  </button>
                )}

                {/* Close button */}
                {onClose && (
                  <button
                    onClick={onClose}
                    className="w-full px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    إغلاق
                  </button>
                )}
              </div>
            ) : (
              // Confirmation dialog
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-4"
              >
                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    هل تريد الحصول على تلميح؟
                    <br />
                    <span className="font-semibold">
                      (سيتم استخدام {hintsUsed + 1}/{maxHints} تلميحات)
                    </span>
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleConfirmRequest}
                    disabled={requesting}
                    className="flex-1 px-6 py-3 bg-green-500 dark:bg-green-600 text-white font-semibold rounded-lg hover:bg-green-600 dark:hover:bg-green-700 transition-colors disabled:opacity-50"
                  >
                    {requesting ? "جاري..." : "نعم، احصل على تلميح"}
                  </button>

                  <button
                    onClick={() => setShowConfirmation(false)}
                    disabled={requesting}
                    className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    إلغاء
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
