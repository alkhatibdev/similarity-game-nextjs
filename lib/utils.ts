import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getSimilarityColor(score: number): string {
  if (score >= 100) return "bg-green-100 dark:bg-green-900/40 border-green-500 dark:border-green-400";
  if (score >= 70) return "bg-lime-100 dark:bg-lime-900/40 border-lime-500 dark:border-lime-400";
  if (score >= 50) return "bg-yellow-100 dark:bg-yellow-900/40 border-yellow-500 dark:border-yellow-400";
  if (score >= 30) return "bg-orange-100 dark:bg-orange-900/40 border-orange-500 dark:border-orange-400";
  return "bg-red-100 dark:bg-red-900/40 border-red-500 dark:border-red-400";
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
    return `لعبة التشابه العربي #${gameNumber}\n✅ فزت في ${attempts} محاولة!\n`;
  }
  return `لعبة التشابه العربي #${gameNumber}\nلعبت ${attempts} محاولة`;
}
