import { API_URL } from "@/constants";
import type { Category } from "@/types/types";

export class DatabaseUnavailableError extends Error {
  constructor(message = "Database unavailable") {
    super(message);
    this.name = "DatabaseUnavailableError";
  }
}

export const getCategories = async (): Promise<Category[]> => {
  const response = await fetch(`${API_URL}/categories`);

  let body: unknown;
  try {
    body = await response.json();
  } catch {
    throw new Error("Failed to parse categories response");
  }

  if (!response.ok) {
    if (
      response.status === 503 &&
      typeof body === "object" &&
      body !== null &&
      "code" in body &&
      body.code === "DATABASE_UNAVAILABLE"
    ) {
      throw new DatabaseUnavailableError();
    }
    throw new Error("Failed to load categories");
  }

  return body as Category[];
};
