"use client";

import { useRouter } from "next/navigation";
import { format, addDays, subDays, parseISO } from "date-fns";

interface NavigationProps {
  currentDate: string;
  availableDates: string[];
}

export default function Navigation({
  currentDate,
  availableDates,
}: NavigationProps) {
  const router = useRouter();

  const today = format(new Date(), "yyyy-MM-dd");
  const isToday = currentDate === today;

  const currentIndex = availableDates.indexOf(currentDate);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < availableDates.length - 1 && !isToday;

  const goToPrev = () => {
    if (hasPrev) {
      const prevDate = availableDates[currentIndex - 1];
      router.push(`/game/${prevDate}`);
    }
  };

  const goToNext = () => {
    if (hasNext) {
      const nextDate = availableDates[currentIndex + 1];
      router.push(`/game/${nextDate}`);
    }
  };

  const goToToday = () => {
    // Redirect to home page for today's game
    router.push(`/`);
  };

  return (
    <div className="flex items-center justify-between gap-4 mb-6" dir="rtl">
      <button
        onClick={goToNext}
        disabled={!hasNext}
        className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors font-semibold"
      >
        التالي ←
      </button>

      <div className="flex-1 text-center">
        {!isToday && (
          <button
            onClick={goToToday}
            className="px-4 py-2 bg-green-500 dark:bg-green-600 text-white rounded-lg hover:bg-green-600 dark:hover:bg-green-700 transition-colors text-sm"
          >
            العودة لليوم
          </button>
        )}
      </div>

      <button
        onClick={goToPrev}
        disabled={!hasPrev}
        className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors font-semibold"
      >
        → السابق
      </button>
    </div>
  );
}
