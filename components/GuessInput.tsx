"use client";

import { useState, FormEvent } from "react";

interface GuessInputProps {
  onSubmit: (word: string) => void;
  disabled?: boolean;
}

export default function GuessInput({ onSubmit, disabled }: GuessInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !disabled) {
      onSubmit(inputValue.trim());
      setInputValue("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto mb-8">
      <div className="flex gap-2" dir="rtl">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="أدخل كلمة..."
          disabled={disabled}
          className="flex-1 px-4 py-3 text-lg border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:cursor-not-allowed text-right bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          dir="rtl"
        />
        <button
          type="submit"
          disabled={disabled || !inputValue.trim()}
          className="px-6 py-3 bg-blue-500 dark:bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
        >
          خمّن
        </button>
      </div>
    </form>
  );
}
