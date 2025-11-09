"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import GameBoard from "@/components/GameBoard";

export default function Home() {
  const [todayDate, setTodayDate] = useState<string>("");

  useEffect(() => {
    const today = format(new Date(), "yyyy-MM-dd");
    setTodayDate(today);
  }, []);

  return (
    <GameBoard date={todayDate} />
  )
}
