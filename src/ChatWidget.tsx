import React, { createContext, useContext } from 'react';
import ChatWidgetButton from './components/ChatWidgetButton';

// 1. Definir la interfaz para la configuración
export interface ChatWidgetConfig {
  langGraphApiUrl: string;
  assistantId: string;
  langSmithApiKey?: string; // Opcional
  audioApiUrl?: string;     // Opcional: URL para la API de transcripción de audio
}

// 2. Crear el Context
// El valor por defecto es null, pero nos aseguraremos de que siempre se provea un valor válido.
export const WidgetConfigContext = createContext<ChatWidgetConfig | null>(null);

// Hook para consumir el contexto fácilmente y asegurar que se usa dentro del provider
export const useWidgetConfig = (): ChatWidgetConfig => {
  const context = useContext(WidgetConfigContext);
  if (context === null) {
    throw new Error('useWidgetConfig must be used within a WidgetConfigContext.Provider and a valid config must be provided.');
  }
  return context;
};

export interface ChatWidgetProps {
  config: ChatWidgetConfig;
}

export const ChatWidget: React.FC<ChatWidgetProps> = ({ config }) => {
  return (
    <WidgetConfigContext.Provider value={config}>
      {/* Added bg-yellow-300 for testing and text-gray-800 for base text color */}
      <div className="bg-yellow-300 text-gray-800">
        <ChatWidgetButton />
      </div>
    </WidgetConfigContext.Provider>
  );
};
