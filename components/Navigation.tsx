"use client";

import { useRouter } from "next/navigation";
import { format, addDays, subDays } from "date-fns";

interface NavigationProps {
  currentDate: string;
}

export default function Navigation({
  currentDate,
}: NavigationProps) {
  const router = useRouter();

  const today = format(new Date(), "yyyy-MM-dd");
  const isToday = currentDate === today;

  // Calculate previous and next dates
  const prevDate = format(subDays(new Date(currentDate), 1), "yyyy-MM-dd");
  const nextDate = format(addDays(new Date(currentDate), 1), "yyyy-MM-dd");

  // Allow previous navigation (user can navigate to any past date)
  const hasPrev = true;
  // Disable next if current date is today or future
  const hasNext = currentDate < today;

  const goToPrev = () => {
    router.push(`/game/${prevDate}`);
  };

  const goToNext = () => {
    if (hasNext) {
      router.push(`/game/${nextDate}`);
    }
  };

  const goToToday = () => {
    // Redirect to home page for today's game
    router.push(`/`);
  };

  return (
    <div className="flex items-center justify-between gap-4 mb-6" dir="rtl">

      {hasPrev && (
        <button
          onClick={goToPrev}
          className="px-3 py-2 bg-gray-200 dark:bg-gray-600  text-sm rounded-sm hover:bg-gray-300 dark:hover:bg-gray-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors font-semibold"
        >
          → السابق
        </button>
      )}

      <div className="flex-1 text-center">
        {!isToday && (
          <button
            onClick={goToToday}
            className="px-3 py-2 bg-green-500 dark:bg-green-600 text-white text-sm rounded-sm hover:bg-green-600 dark:hover:bg-green-700 transition-colors text-sm"
          >
            العودة لتحدي اليوم
          </button>
        )}
      </div>

      {hasNext && (
        <button
          onClick={goToNext}
          className="px-3 py-2 bg-gray-200 dark:bg-gray-600  text-sm rounded-sm hover:bg-gray-300 dark:hover:bg-gray-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors font-semibold"
        >
          التالي ←
        </button>
      )
      }

    </div >
  );
}
