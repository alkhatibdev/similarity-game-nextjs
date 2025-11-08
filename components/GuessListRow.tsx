import { getSimilarityColor, getSimilarityGradient } from "@/lib/utils";
import { Guess } from "@/types/game";
import { motion } from "framer-motion";

interface GuessListRowProps {
    guess: Guess,
    index: number
}
export default function GuessListRow({ guess, index }: GuessListRowProps) {
    return (guess &&
        <motion.div
            key={guess.id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className={`p-4 rounded-lg border-1 ${getSimilarityColor(
                guess.similarity_score
            )} shadow-sm`}
        >
            <div className="flex justify-between items-center mb-2">
                <span className="text-xl font-semibold text-gray-900 dark:text-gray-100">{guess.word}</span>
                <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        {guess.similarity_score.toFixed(2)}%
                    </span>
                    {guess.is_correct && <span className="text-2xl">🎉</span>}
                </div>
            </div>

            <div className="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-3 overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${guess.similarity_score}%` }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="h-full rounded-full"
                    style={{
                        background: `linear-gradient(to right, ${getSimilarityGradient(
                            guess.similarity_score
                        )})`
                    }}
                />
            </div>

            {guess.is_correct && (
                <div className="mt-2 text-green-700 dark:text-green-400 font-semibold text-center">
                    ✅ إجابة صحيحة!
                </div>
            )}
        </motion.div>
    )
}