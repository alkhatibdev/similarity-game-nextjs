"use client";

import { useState, FormEvent } from "react";
import IconSpinner from "./icons/IconSpinner";

interface GuessInputProps {
  onSubmit: (word: string) => void;
  submitting: boolean;
}

export default function GuessInput({ onSubmit, submitting }: GuessInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !submitting) {
      onSubmit(inputValue.trim());
      setInputValue("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full  mx-auto mb-8">
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
  );
}
