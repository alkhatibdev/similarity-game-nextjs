"use client";

import { Guess } from "@/types/game";
import { motion } from "framer-motion";
import { getSimilarityColor, getSimilarityGradient } from "@/lib/utils";

interface GuessListProps {
  guesses: Guess[];
}

export default function GuessList({ guesses }: GuessListProps) {
  if (guesses.length === 0) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400 py-8" dir="rtl">
        لم تقم بأي محاولات بعد
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-3" dir="rtl">
      <div className="flex justify-between items-center mb-4 px-2">
        <span className="text-sm text-gray-600 dark:text-gray-300">
          المحاولات: {guesses.length}
        </span>
        <span className="text-sm text-gray-600 dark:text-gray-300">ترتيب: حسب التشابه</span>
      </div>

      {guesses.map((guess, index) => (
        <motion.div
          key={guess.id}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className={`p-4 rounded-lg border-2 ${getSimilarityColor(
            guess.similarity_score
          )} shadow-sm`}
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-xl font-semibold text-gray-900 dark:text-gray-100">{guess.word}</span>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {guess.similarity_score.toFixed(2)}%
              </span>
              {guess.is_winner && <span className="text-2xl">🎉</span>}
            </div>
          </div>

          <div className="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-3 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${guess.similarity_score}%` }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="h-full rounded-full"
              style={{
                background: `linear-gradient(to right, ${getSimilarityGradient(
                  guess.similarity_score
                )})`
              }}
            />
          </div>

          {guess.is_winner && (
            <div className="mt-2 text-green-700 dark:text-green-400 font-semibold text-center">
              ✅ إجابة صحيحة!
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
