import { GameState } from "@/types/game"
import IconFire from "./icons/IconFire"

interface HeroProps {
  gameState: GameState | null
}

export default function Hero({ gameState }: HeroProps) {

  return (
    <header className="text-center mb-4" dir="rtl">
      <h1 className="text-3xl font-bold text-cyan-600 dark:text-cyan-500 mb-2">
        كل يوم تحدي
        {/* التحدي اليومي */}
       {/* 🎯التحدي اليومي */}
       <IconFire />
      </h1>
      <p className="text-gray-600 dark:text-gray-400">
        خمن الكلمة السرّية من خلال التشابه الدلالي بين الكلمات! كل محاولة تقرّبك من المعنى. 
        <br /> هل تقبل التحدي وتكتشف الكلمة؟
      </p>
      {gameState && (
        <div className="mt-4 text-lg font-semibold text-cyan-600 dark:text-cyan-500">
          التحدي رقم #{gameState.game_number}
        </div>
      )}
    </header>
  )
}