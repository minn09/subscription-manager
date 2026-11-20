const UNAVAILABLE_CODES = new Set([
  "ECONNREFUSED",
  "ENOTFOUND",
  "EAI_AGAIN",
  "ECONNRESET",
  "EPIPE",
  "57P01",
  "57P03",
  "08001",
  "08004",
  "08006",
]);

function readCode(value: unknown): unknown {
  if (typeof value !== "object" || value === null) return undefined;
  return (value as { code?: unknown }).code;
}

export function isDatabaseUnavailable(error: unknown): boolean {
  if (typeof error !== "object" || error === null) return false;

  const code = readCode(error);
  const causeCode = readCode((error as { cause?: unknown }).cause);

  return (
    (typeof code === "string" && UNAVAILABLE_CODES.has(code)) ||
    (typeof causeCode === "string" && UNAVAILABLE_CODES.has(causeCode))
  );
}
