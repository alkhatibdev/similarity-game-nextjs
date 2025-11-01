"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import GuessInput from "@/components/GuessInput";
import GuessList from "@/components/GuessList";
import WinModal from "@/components/WinModal";
import Navigation from "@/components/Navigation";
import { getUserId } from "@/lib/session";
import {
  getGameState,
  submitGuess,
  getAvailableChallenges,
} from "@/lib/api";
import { GameState } from "@/types/game";

export default function Home() {
  const [userId, setUserId] = useState<string>("");
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [showWinModal, setShowWinModal] = useState(false);
  const [todayDate, setTodayDate] = useState<string>("");

  useEffect(() => {
    const id = getUserId();
    setUserId(id);
    const today = format(new Date(), "yyyy-MM-dd");
    setTodayDate(today);
  }, []);

  useEffect(() => {
    async function fetchAvailableDates() {
      try {
        const data = await getAvailableChallenges();
        setAvailableDates(data.dates);
      } catch (err) {
        console.error("Failed to fetch available dates:", err);
      }
    }
    fetchAvailableDates();
  }, []);

  useEffect(() => {
    async function loadGameState() {
      if (!userId || !todayDate) return;

      setLoading(true);
      setError(null);

      try {
        const state = await getGameState(todayDate, userId);
        setGameState(state);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "فشل تحميل حالة اللعبة"
        );
      } finally {
        setLoading(false);
      }
    }

    loadGameState();
  }, [userId, todayDate]);

  const handleGuessSubmit = async (word: string) => {
    if (!userId || !todayDate || submitting) return;

    setSubmitting(true);
    setError(null);

    try {
      const newGuess = await submitGuess({
        user_id: userId,
        challenge_date: todayDate,
        word: word,
      });

      // Update game state with new guess
      setGameState((prev) => {
        if (!prev) return prev;

        const updatedGuesses = [newGuess, ...prev.guesses].sort(
          (a, b) => b.similarity_score - a.similarity_score
        );

        const hasWon = newGuess.is_winner || prev.has_won;

        return {
          ...prev,
          guesses: updatedGuesses,
          has_won: hasWon,
          game_status: prev.game_status
            ? {
                ...prev.game_status,
                won: hasWon,
                attempts: prev.game_status.attempts + 1,
                target_word: newGuess.is_winner
                  ? newGuess.word
                  : prev.game_status.target_word,
              }
            : {
                won: hasWon,
                attempts: 1,
                target_word: newGuess.is_winner ? newGuess.word : undefined,
              },
        };
      });

      // Show win modal if user just won
      if (newGuess.is_winner) {
        setTimeout(() => setShowWinModal(true), 500);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "فشل إرسال التخمين");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-800">
        <div className="text-center" dir="rtl">
          <div className="text-2xl mb-2">⏳</div>
          <div className="text-gray-600 dark:text-gray-300">جاري التحميل...</div>
        </div>
      </div>
    );
  }

  if (error && !gameState) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-800">
        <div
          className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-lg p-6 max-w-md"
          dir="rtl"
        >
          <div className="text-2xl mb-2">❌</div>
          <div className="text-red-700 dark:text-red-400 font-semibold">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-800 py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <header className="text-center mb-8" dir="rtl">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            لعبة التشابه العربي
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            خمّن الكلمة السرية بناءً على التشابه الدلالي
          </p>
          {gameState && (
            <div className="mt-4 text-lg font-semibold text-blue-600 dark:text-blue-400">
              اللعبة #{gameState.game_number}
            </div>
          )}
        </header>

        {todayDate && (
          <Navigation currentDate={todayDate} availableDates={availableDates} />
        )}

        {gameState?.has_won && gameState.game_status && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-700 rounded-lg p-6"
            dir="rtl"
          >
            <div className="text-center">
              <div className="text-3xl mb-2">🎉</div>
              <div className="text-xl font-bold text-green-700 dark:text-green-400 mb-2">
                لقد فزت في هذه اللعبة!
              </div>
              <div className="text-gray-700 dark:text-gray-200">
                الكلمة السرية:{" "}
                <span className="font-bold">
                  {gameState.game_status.target_word}
                </span>
              </div>
              <div className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                عدد المحاولات: {gameState.game_status.attempts}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                يمكنك الاستمرار في إضافة محاولات جديدة
              </div>
            </div>
          </motion.div>
        )}

        <GuessInput onSubmit={handleGuessSubmit} disabled={submitting} />

        {error && gameState && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-3 text-red-700 dark:text-red-400 text-center"
            dir="rtl"
          >
            {error}
          </motion.div>
        )}

        {gameState && <GuessList guesses={gameState.guesses} />}

        {showWinModal && gameState?.game_status?.won && (
          <WinModal
            gameStatus={gameState.game_status}
            gameNumber={gameState.game_number}
            onClose={() => setShowWinModal(false)}
          />
        )}
      </motion.div>
    </div>
  );
}
