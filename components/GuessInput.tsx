"use client";

import { useState, FormEvent } from "react";
import IconSpinner from "./icons/IconSpinner";
import { FLAG_GIVEUP } from "@/lib/utils";
import GiveUpModal from "./modals/GiveUpModal";
import HintModal from "./modals/HintModal";
import { GameState, WodHint } from "@/types/game";

interface GuessInputProps {
  gameState: GameState | null;
  onSubmit: (word: string) => void;
  submitting: boolean;
  hints: WodHint[];
  onRequestHint: () => void;
  requestingHint: boolean;
  hintError?: string | null;
}

export default function GuessInput({
  onSubmit,
  submitting,
  gameState,
  hints,
  onRequestHint,
  requestingHint,
  hintError
}: GuessInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [showGiveUpModal, setShowGiveUpModal] = useState(false);
  const [showHintModal, setShowHintModal] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !submitting) {
      onSubmit(inputValue.trim());
      setInputValue("");
    }
  };

  const submitGiveUp = () => {
    if (!submitting) {
      onSubmit(FLAG_GIVEUP);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full  mx-auto mb-4">
        <div className="flex gap-2" dir="rtl">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="أدخل كلمة..."
            disabled={submitting}
            className="flex-1 px-4 py-3 text-lg border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-cyan-600 dark:focus:border-cyan-600 disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:cursor-not-allowed text-right bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            dir="rtl"
          />
          <button
            type="submit"
            disabled={submitting || !inputValue.trim()}
            className="px-6 py-3 bg-cyan-600 dark:bg-cyan-600 text-white font-semibold rounded-lg hover:bg-cyan-700 dark:hover:bg-cyan-700 disabled:bg-cyan-700 dark:disabled:bg-cyan-700 disabled:cursor-not-allowed transition-colors"
          >
            {submitting && <IconSpinner />}
            {!submitting && "خمّن"}
          </button>
        </div>
      </form>

      {gameState && !gameState.has_won && (
        <div className="flex justify-center gap-3 mb-4">
          <button
            type="button"
            onClick={() => setShowHintModal(true)}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all relative ${
              hints.length >= 3
                ? "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/40 dark:to-cyan-900/40 text-blue-700 dark:text-blue-200 ring ring-blue-200 dark:ring-blue-700/50 hover:from-blue-200 hover:to-cyan-200 dark:hover:from-blue-800/50 dark:hover:to-cyan-800/50"
            }`}
          >
            <span className="flex items-center gap-1">
              💡 تلميح
              {hints.length > 0 && (
                <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 ml-1 text-xs font-bold bg-blue-500 dark:bg-blue-600 text-white rounded-full">
                  {hints.length}/3
                </span>
              )}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setShowGiveUpModal(true)}
            className="px-4 py-2 text-xs font-semibold rounded-lg transition-all bg-gradient-to-r from-red-100 to-orange-100 dark:from-red-900/40 dark:to-orange-900/40 text-red-700 dark:text-red-200 ring ring-red-200 dark:ring-red-700/50 hover:from-red-200 hover:to-orange-200 dark:hover:from-red-800/50 dark:hover:to-orange-800/50"
          >
            <span className="flex items-center gap-1">
              🏳️ إستسلام
            </span>
          </button>
        </div>
      )}

      {showGiveUpModal && <GiveUpModal onSubmit={onSubmit} submitting={submitting} onClose={() => setShowGiveUpModal(false)} />}
      
      {showHintModal && (
        <HintModal
          hints={hints}
          maxHints={3}
          requesting={requestingHint}
          onRequestHint={onRequestHint}
          onClose={() => setShowHintModal(false)}
          error={hintError}
        />
      )}
    </>
  );
}
