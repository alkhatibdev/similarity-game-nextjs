"use client";

import { Guess } from "@/types/game";
import GuessListRow from "./GuessListRow";

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

  // Capture the last guess (most recently added) before sorting
  const lastGuess = guesses.length > 2
    ? guesses.reduce((latest, current) =>
      new Date(current.created_at) > new Date(latest.created_at) ? current : latest
    )
    : null;

  // Sort guesses by similarity score
  guesses.sort(
    (a, b) => b.similarity_score - a.similarity_score
  );


  return (
    <div className="w-full max-w-2xl mx-auto space-y-3" dir="rtl">
      <div className="flex justify-between items-center mb-4 px-2">
        <span className="text-sm text-gray-600 dark:text-gray-300">
          المحاولات: {guesses.length}
        </span>
        <span className="text-sm text-gray-600 dark:text-gray-300">ترتيب: حسب التشابه</span>
      </div>

      {lastGuess && !lastGuess.is_correct && lastGuess.word !== guesses[0].word
        && <GuessListRow guess={lastGuess} index={0} />
      }

      <hr className="border border-gray-200 dark:border-gray-700 my-4" />

      {guesses.map((guess, index) => (
        <GuessListRow guess={guess} index={index + 1} />
      ))}
    </div>
  );
}
