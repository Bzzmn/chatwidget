export function getApiKey(): string | null {
  // This function is deprecated for LangSmith API Key retrieval within the ChatWidget.
  // The LangSmith API Key should be passed via ChatWidget's 'config' prop
  // and accessed using 'useWidgetConfig().langSmithApiKey'.
  console.warn("'getApiKey' from 'lib/api-key.tsx' is deprecated for LangSmith API Key. Use 'useWidgetConfig' instead.");
  return null;
}
