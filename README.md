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

## Configuración

El componente `ChatWidget` requiere que se pase un objeto de configuración a través de la prop `config`. Este objeto debe cumplir con la interfaz `ChatWidgetConfig`.

### Interfaz `ChatWidgetConfig`

```typescript
export interface ChatWidgetConfig {
  langGraphApiUrl: string;    // Requerido: La URL de tu punto de conexión API de LangGraph.
  assistantId: string;        // Requerido: El ID del Asistente o ID del Grafo para LangGraph.
  langSmithApiKey?: string;   // Opcional: Tu clave API de LangSmith, si es necesaria para el rastreo u otras características de LangSmith.
  audioApiUrl?: string;       // Opcional: La URL de tu API de transcripción de audio.
}
```

### Ejemplo de Uso

Para usar el `ChatWidget`, impórtalo y proporciona la configuración necesaria:

```tsx
import React from 'react';
import { ChatWidget, ChatWidgetConfig } from 'xcala-chat-widget'; // Ajusta la ruta de importación según sea necesario

const App = () => {
  const chatConfig: ChatWidgetConfig = {
    langGraphApiUrl: "https://tu-api-langgraph.com/endpoint",
    assistantId: "tu-id-asistente-o-grafo",
    langSmithApiKey: "tu-clave-api-opcional-langsmith",
    audioApiUrl: "https://tu-api-audio.com/endpoint" // Si es necesario
  };

  return (
    <div>
      {/* Otro contenido de la aplicación */}
      <ChatWidget config={chatConfig} />
    </div>
  );
};

export default App;
```

Asegúrate de reemplazar los valores de ejemplo con la URL real de tu API de LangGraph, el ID de Asistente/Grafo y la clave API de LangSmith (si aplica).

## Desarrollo

Para construir el paquete para producción:

```bash
npm run build
```

Para desarrollar en modo de observación (recompila automáticamente al guardar cambios):

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
