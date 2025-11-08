import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getSimilarityColor(score: number): string {
  if (score >= 100) return "bg-green-50 dark:bg-green-900/40 border-green-300 dark:border-green-400";
  if (score >= 70) return "bg-lime-50 dark:bg-lime-900/40 border-lime-300 dark:border-lime-400";
  if (score >= 50) return "bg-yellow-50 dark:bg-yellow-900/40 border-yellow-300 dark:border-yellow-400";
  if (score >= 30) return "bg-orange-50 dark:bg-orange-900/40 border-orange-300 dark:border-orange-400";
  return "bg-red-50 dark:bg-red-900/40 border-red-300 dark:border-red-400";
}

export function getSimilarityGradient(score: number): string {
  // Using actual CSS color values for proper gradients
  if (score >= 100) return "#22c55e, #16a34a"; // green-500 to green-600
  if (score >= 70) return "#84cc16, #65a30d"; // lime-500 to lime-600
  if (score >= 50) return "#eab308, #ca8a04"; // yellow-500 to yellow-600
  if (score >= 30) return "#f97316, #ea580c"; // orange-500 to orange-600
  return "#ef4444, #dc2626"; // red-500 to red-600
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("ar-SA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getShareText(attempts: number, gameNumber: number, won: boolean): string {
  if (won) {
    return `🎯 تحدي الكلمات العربي - لعبة التشابه \nالتحدي رقم #${gameNumber}\n✅ فزت في ${attempts} محاولة!\n`;
  }
  return `🎯 تحدي الكلمات العربي - لعبة التشابه \nالتحدي رقم #${gameNumber}\nلعبت ${attempts} محاولة`;
}
