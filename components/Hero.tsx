import { GameState } from "@/types/game"

interface HeroProps {
  gameState: GameState | null
}

export default function Hero({ gameState }: HeroProps) {

  return (
    <header className="text-center mb-8" dir="rtl">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
        تحدي التشابه
      </h1>
      <p className="text-gray-600 dark:text-gray-300">
        خمن الكلمة السرّية من خلال التشابه الدلالي بين الكلمات! كل محاولة تقرّبك من المعنى <br /> هل تقبل التحدي وتكتشف الكلمة؟
      </p>
      {gameState && (
        <div className="mt-4 text-lg font-semibold text-blue-600 dark:text-blue-400">
          التحدي رقم #{gameState.game_number}
        </div>
      )}
    </header>
  )
}