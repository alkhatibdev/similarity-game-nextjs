"use client";

import { motion, AnimatePresence } from "framer-motion";
import { GameStatus } from "@/types/game";
import { getShareText } from "@/lib/utils";

interface WinModalProps {
  gameStatus: GameStatus;
  gameNumber: number;
  onClose?: () => void;
}

export default function WinModal({
  gameStatus,
  gameNumber,
  onClose,
}: WinModalProps) {
  const handleShare = () => {
    const text = getShareText(gameStatus.attempts, gameNumber, gameStatus.won);
    const url = window.location.href;

    if (navigator.share) {
      navigator
        .share({
          title: "ألعاب تفكير وتحدي - تحدي التشابه والتقارب",
          text:  text +  "...\n",
          url: url,
        })
        .catch(() => {
          // Fallback to clipboard
          copyToClipboard(text + "\n" + url);
        });
    } else {
      copyToClipboard(text + "\n" + url);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("تم النسخ إلى الحافظة!");
    });
  };

  if (!gameStatus.won) return null;

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
              className="text-6xl mb-4"
            >
              🎉
            </motion.div>

            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
              أحسنت! لقد فزت!
            </h2>

            <p className="text-gray-600 dark:text-gray-300 mb-6">
              سنراك غداً في التحدي القادم!
            </p>

            <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-700 rounded-lg p-6 mb-6">
              <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">الكلمة هي:</div>
              <div className="text-3xl font-bold text-green-700 dark:text-green-400 mb-4">
                {gameStatus.target_word}
              </div>

              <div className="text-sm text-gray-600 dark:text-gray-300">عدد المحاولات:</div>
              <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                {gameStatus.attempts}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleShare}
                className="flex-1 px-6 py-3 bg-green-500 dark:bg-green-600 text-white font-semibold rounded-lg hover:bg-green-600 dark:hover:bg-green-700 transition-colors"
              >
                مشاركة ✨
              </button>

              {onClose && (
                <button
                  onClick={onClose}
                  className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  إغلاق
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
