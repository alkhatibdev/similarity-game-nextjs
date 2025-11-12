import { Metadata } from "next";
import { getChallenge } from "@/lib/api";
import GameBoard from "@/components/GameBoard";

type Props = {
  params: Promise<{ date: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { date } = await params;

  try {
    const challenge = await getChallenge(date);

    if (challenge.has_challenge) {
      return {
        title: `التحدي رقم #${challenge.game_number} | تحدي التشابه والتقارب`,
        description: "خمن الكلمة السرّية من خلال التشابه الدلالي بين الكلمات! كل محاولة تقرّبك من المعنى.",
      };
    }
  } catch (error) {
    // Fallback if API fails
  }

  return {
    title: "تحدي التشابه والتقارب | ألعاب تفكير وتحدي",
    description: "خمن الكلمة السرّية من خلال التشابه الدلالي بين الكلمات! كل محاولة تقرّبك من المعنى.",
  };
}

export default async function GamePage({ params }: Props) {
  const { date } = await params;

  return <GameBoard date={date} />;
}
