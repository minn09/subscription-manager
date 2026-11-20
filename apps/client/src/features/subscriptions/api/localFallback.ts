let localFallbackEnabled = false;

export const enableLocalFallback = (): void => {
  localFallbackEnabled = true;
};

export const isLocalFallback = (): boolean => localFallbackEnabled;

export const isDatabaseUnavailableResponse = (
  response: Response,
  body: unknown
): boolean =>
  response.status === 503 &&
  typeof body === "object" &&
  body !== null &&
  "code" in body &&
  body.code === "DATABASE_UNAVAILABLE";
