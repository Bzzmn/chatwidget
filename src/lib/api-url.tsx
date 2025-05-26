/**
 * @deprecated This function is deprecated for fetching the audio API URL.
 * Please use `useWidgetConfig().audioApiUrl` from `ChatWidgetConfig` context instead.
 * This function now returns a default placeholder or undefined.
 */
export function getApiUrl(): string | undefined {
  // console.warn("getApiUrl() is deprecated. Use useWidgetConfig().audioApiUrl instead.");
  // Return a default placeholder or undefined, as the actual URL should come from config.
  return undefined; // Or a placeholder like 'https://default-audio-api.example.com' if a fallback is desired.
}