# Xcala Chat Widget

Un componente React para integrar la funcionalidad de chat de Xcala en tu aplicación.

## Instalación

Puedes instalar el paquete usando npm o yarn:

```bash
npm install xcala-chat-widget
# o
yarn add xcala-chat-widget
```

## Uso

Importa y usa el componente `ChatWidget` en tu aplicación React:

```tsx
import React from 'react';
import { ChatWidget } from 'xcala-chat-widget';

const App = () => {
  return (
    <ChatWidget />
  );
};

export default App;
```

## Configuration

The `ChatWidget` component requires a configuration object to be passed via the `config` prop. This object should conform to the `ChatWidgetConfig` interface.

### `ChatWidgetConfig` Interface

```typescript
export interface ChatWidgetConfig {
  langGraphApiUrl: string;    // Required: The URL of your LangGraph API endpoint.
  assistantId: string;        // Required: The Assistant ID or Graph ID for LangGraph.
  langSmithApiKey?: string;   // Optional: Your LangSmith API key, if needed for tracing or other LangSmith features.
  audioApiUrl?: string;       // Optional: The URL for your audio transcription API.
}
```

### Example Usage

To use the `ChatWidget`, import it and provide the necessary configuration:

```tsx
import React from 'react';
import { ChatWidget, ChatWidgetConfig } from 'xcala-chat-widget'; // Adjust import path as necessary

const App = () => {
  const chatConfig: ChatWidgetConfig = {
    langGraphApiUrl: "https://your-langgraph-api-url.com/endpoint",
    assistantId: "your-assistant-or-graph-id",
    langSmithApiKey: "your-optional-langsmith-api-key",
    audioApiUrl: "https://your-audio-api-url.com/endpoint" // Si es necesario
  };

  return (
    <div>
      {/* Other application content */}
      <ChatWidget config={chatConfig} />
    </div>
  );
};

export default App;
```

Make sure to replace the placeholder values with your actual LangGraph API URL, Assistant/Graph ID, and LangSmith API Key (if applicable).

## Desarrollo

Para construir el paquete para producción:

```bash
npm run build
```

Para desarrollar en modo watch (recompila automáticamente al guardar cambios):

```bash
npm run dev
```

## Publicación en NPM

Antes de publicar, asegúrate de haber construido la última versión del paquete:

```bash
npm run build
```

Luego, puedes publicar el paquete en NPM:

```bash
npm publish
```

(Asegúrate de haber iniciado sesión en NPM con `npm login` y que el nombre del paquete sea único y la versión esté actualizada en `package.json`.)
