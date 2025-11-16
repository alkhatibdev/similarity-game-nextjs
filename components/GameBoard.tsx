"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { format } from "date-fns";
import GuessInput from "@/components/GuessInput";
import GuessList from "@/components/GuessList";
import WinModal from "@/components/modals/WinModal";
import Navigation from "@/components/Navigation";
import { getUserId } from "@/lib/session";
import {
  getGameState,
  giveUp,
  submitGuess,
} from "@/lib/api";
import { GameState, Guess } from "@/types/game";
import { ApiError } from "@/lib/api";
import Hero from "@/components/Hero";
import WinCard from "@/components/WinCard";
import IconSpinner from "./icons/IconSpinner";
import { FLAG_GIVEUP } from "@/lib/utils";

interface GameBoardProps {
  date: string;
}

export default function GameBoard({ date }: GameBoardProps) {
  const router = useRouter();

  const [userId, setUserId] = useState<string>("");
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showWinModal, setShowWinModal] = useState(false);

  useEffect(() => {
    const id = getUserId();
    setUserId(id);
  }, []);

  useEffect(() => {
    async function loadGameState() {
      if (!userId || !date) return;

      // Check if trying to access future date
      const today = format(new Date(), "yyyy-MM-dd");
      if (date > today) {
        // Redirect to homepage for future dates
        router.push("/");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const state = await getGameState(date, userId);
        setGameState(state);
      } catch (err) {
        // If it's a 403 error (future date), redirect to home
        if (err instanceof ApiError && err.status === 403) {
          router.push("/");
          return;
        }
        setError(
          err instanceof Error ? err.message : "فشل تحميل حالة اللعبة"
        );
      } finally {
        setLoading(false);
      }
    }

    loadGameState();
  }, [userId, date, router]);

  const handleGuessSubmit = async (word: string) => {
    if (!userId || !date || submitting) return;

    setSubmitting(true);
    setError(null);

    try {
      let newGuess: Guess;

      if (word && word.trim() && word.trim() !== FLAG_GIVEUP) {
        newGuess = await submitGuess({
          user_id: userId,
          challenge_date: date,
          word: word,
        });
      } else {
        newGuess = await giveUp({
          user_id: userId,
          challenge_date: date,
        });
      }

      // Update game state with new guess
      setGameState((prev) => {
        if (!prev) return prev;

        const guessExists = prev.guesses.some((guess) => guess.id === newGuess.id);
        let updatedGuesses = [];
        if (!guessExists) {
          updatedGuesses = [newGuess, ...prev.guesses]
        } else {
          updatedGuesses = prev.guesses;
        }

        updatedGuesses.sort(
          (a, b) => b.similarity_score - a.similarity_score
        );

        const hasWon = newGuess.is_correct || prev.has_won;

        return {
          ...prev,
          guesses: updatedGuesses,
          has_won: hasWon,
          game_status: prev.game_status
            ? {
              ...prev.game_status,
              won: hasWon,
              attempts: prev.game_status.attempts + 1,
              target_word: newGuess.is_correct
                ? newGuess.word
                : prev.game_status.target_word,
            }
            : {
              won: hasWon,
              attempts: 1,
              target_word: newGuess.is_correct ? newGuess.word : undefined,
            },
        };
      });

      // Show win modal if user just won
      if (newGuess.is_correct) {
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
          <div className="text-2xl mb-2"><IconSpinner /></div>
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
        <Hero gameState={gameState} />

        <Navigation currentDate={date} />

        <WinCard gameState={gameState} />

        <GuessInput onSubmit={handleGuessSubmit} submitting={submitting} gameState={gameState} />

        {error && gameState && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 text-red-700 dark:text-red-400 text-center"
            dir="rtl"
          >
            {error}
          </motion.div>
        )}

        {gameState && <GuessList guesses={gameState.guesses} />}

        {showWinModal && gameState?.game_status && gameState?.has_won && (
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
