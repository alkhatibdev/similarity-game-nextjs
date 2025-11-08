import {
  Challenge,
  Guess,
  GameState,
  GameStatus,
  GuessSubmission,
} from "@/types/game";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        errorData.detail || `HTTP error! status: ${response.status}`,
        response.status
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      error instanceof Error ? error.message : "Network error occurred"
    );
  }
}

export async function getChallenge(date: string): Promise<Challenge> {
  return fetchApi<Challenge>(`/api/v1/challenges/${date}`);
}

export async function submitGuess(
  submission: GuessSubmission
): Promise<Guess> {
  return fetchApi<Guess>("/api/v1/game/guess", {
    method: "POST",
    body: JSON.stringify(submission),
  });
}

export async function getGuesses(
  date: string,
  userId: string
): Promise<Guess[]> {
  return fetchApi<Guess[]>(`/api/v1/game/${date}/guesses/${userId}`);
}

export async function getGameStatus(
  date: string,
  userId: string
): Promise<GameStatus> {
  return fetchApi<GameStatus>(`/api/v1/game/${date}/status/${userId}`);
}

export async function getGameState(
  date: string,
  userId: string
): Promise<GameState> {
  return fetchApi<GameState>(`/api/v1/game/${date}/state/${userId}`);
}
