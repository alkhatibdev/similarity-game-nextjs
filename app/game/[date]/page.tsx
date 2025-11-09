"use client";

import { useParams } from "next/navigation";
import GameBoard from "@/components/GameBoard";

export default function GamePage() {
  const params = useParams();
  const date = params.date as string;

  return (
    <GameBoard date={date} />
  )
}
