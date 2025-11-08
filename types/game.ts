export interface Challenge {
  date: string;
  game_number: number;
  has_challenge: boolean;
  word?: string;
}

export interface Guess {
  id: number;
  word: string;
  similarity_score: number;
  cosine_similarity: number;
  is_correct: boolean;
  created_at: string;
}

export interface GameStatus {
  won: boolean;
  attempts: number;
  won_at?: string;
  target_word?: string;
}

export interface GameState {
  challenge_date: string;
  game_number: number;
  guesses: Guess[];
  game_status?: GameStatus;
  has_won: boolean;
}

export interface AvailableChallenges {
  dates: string[];
  total: number;
}

export interface GuessSubmission {
  user_id: string;
  challenge_date: string;
  word: string;
}
