"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FLAG_GIVEUP } from "@/lib/utils";

interface GiveUpModal {
  submitting: boolean;
  onSubmit: (word: string) => void;
  onClose?: () => void;
}

export default function GiveUpModal({
  submitting,
  onSubmit,
  onClose,
}: GiveUpModal) {
  const handleGiveUp = () => {
    if (!submitting) {
      onClose?.();
      onSubmit(FLAG_GIVEUP);
    }
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
          className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full shadow-2xl"
          onClick={(e) => e.stopPropagation()}
          dir="rtl"
        >
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="text-3xl mb-8"
            >
             إستسلام!
            </motion.div>

            <h2 className="text-xl text-gray-800 dark:text-gray-100 mb-8">
              هل أنت متأكد من رغبتك في الاستسلام؟ سيؤدي هذا إلى إنهاء اللعبة وكشف الكلمة السرية.
            </h2>

            <div className="flex gap-3">
              <button
                onClick={handleGiveUp}
                className="flex-1 px-6 py-3 bg-green-500 dark:bg-green-600 text-white font-semibold rounded-lg hover:bg-green-600 dark:hover:bg-green-700 transition-colors"
              >
                نعم، استسلم
              </button>

              {onClose && (
                <button
                  onClick={onClose}
                  className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  لا
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
