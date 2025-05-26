import React, { useState, useEffect } from 'react';
import { MessageSquare, X, Maximize2, Minimize2 } from 'lucide-react';
import ChatWindow from './ChatWindow';

// No necesitamos una interfaz por ahora ya que no hay props
const ChatWidgetButton: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar si es un dispositivo móvil
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px es el breakpoint para md en Tailwind
    };
    
    // Verificar al cargar
    checkIfMobile();
    
    // Verificar al cambiar el tamaño de la ventana
    window.addEventListener('resize', checkIfMobile);
    
    // Limpiar el evento
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
    // En móviles, siempre abrir a pantalla completa
    if (!isChatOpen && isMobile) {
      setIsFullScreen(true);
    } else if (!isChatOpen) {
      setIsFullScreen(false);
    }
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
    <div 
      className={`${isFullScreen || (isMobile && isChatOpen) ? 'fixed inset-0 z-50 flex items-center justify-center' : 'fixed bottom-2 right-8 z-50 flex flex-col items-end'}`}
    >
      {isChatOpen && (
        <div className={`bg-white shadow-2xl ${isFullScreen || isMobile ? 'w-full h-full' : 'rounded-lg mb-5 w-[550px] h-[600px] overflow-hidden border border-gray-200'}`}>
          <div className="bg-blue-700 text-white p-3 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-lg">Asistente</h3>
              <svg preserveAspectRatio="xMidYMid meet" viewBox="16.422 16.422 93.062 40.163" height="32" width="54" role="img" aria-label="Xcala logo" className="text-white">
                <g>
                  <path fill="currentColor" d="M34.266 43.187h-4.454v-4.455h4.454v4.455Z"></path>
                  <path fill="currentColor" d="M56.495 25.262h-8.84v-8.84h8.84v8.84Z"></path>
                  <path fill="currentColor" d="M23.853 38.726h5.96v-5.96h-5.96v5.96Z"></path>
                  <path fill="currentColor" d="M34.263 38.726h5.961v-5.96h-5.96v5.96Z"></path>
                  <path fill="currentColor" d="M40.227 43.178H34.26v5.966h5.966v-5.966Z"></path>
                  <path fill="currentColor" d="M47.673 49.136h-7.448v7.449h7.448v-7.449Z"></path>
                  <path fill="currentColor" d="M23.862 43.192h5.961v5.961h-5.96v-5.96Z"></path>
                  <path fill="currentColor" d="M16.422 49.13h7.438v7.439h-7.438V49.13Z"></path>
                  <path fill="currentColor" d="M16.422 25.265h7.438v7.439h-7.438v-7.439Z"></path>
                  <path fill="currentColor" d="M40.233 25.265h7.438v7.439h-7.438v-7.439Z"></path>
                  <path fill="currentColor" d="M55.714 32.652c3.95 0 6.524 1.96 7.43 5.354h-3.598c-.556-1.55-1.843-2.545-3.832-2.545-2.692 0-4.476 1.989-4.476 5.5 0 3.54 1.784 5.529 4.476 5.529 1.99 0 3.218-.878 3.832-2.546h3.599c-.907 3.16-3.482 5.354-7.431 5.354-4.623 0-7.9-3.276-7.9-8.337 0-5.032 3.277-8.31 7.9-8.31Z"></path>
                  <path fill="currentColor" d="M74.751 35.548c-2.486 0-4.886 1.873-4.886 5.354s2.4 5.5 4.886 5.5c2.516 0 4.886-1.96 4.886-5.441 0-3.453-2.37-5.413-4.886-5.413Zm-.702-2.896c2.72 0 4.593 1.287 5.588 2.604v-2.34h3.364v16.331h-3.364v-2.61c-1.024 1.374-2.955 2.662-5.646 2.662-4.184 0-7.548-3.423-7.548-8.397 0-4.973 3.364-8.25 7.606-8.25Z"></path>
                  <path fill="currentColor" d="M87.236 26.458h3.335v22.79h-3.335v-22.79Z"></path>
                  <path fill="currentColor" d="M101.234 35.548c-2.487 0-4.886 1.873-4.886 5.354s2.399 5.5 4.886 5.5c2.516 0 4.885-1.96 4.885-5.441 0-3.453-2.369-5.413-4.885-5.413Zm-.703-2.896c2.721 0 4.593 1.287 5.588 2.604v-2.34h3.365v16.331h-3.365v-2.61c-1.024 1.374-2.955 2.662-5.646 2.662-4.184 0-7.548-3.423-7.548-8.397 0-4.973 3.364-8.25 7.606-8.25Z"></path>
                </g>
              </svg>
            </div>
            <div className="flex items-center gap-3">
              {!isMobile && (
                <button 
                  onClick={toggleFullScreen}
                  className="text-white hover:text-gray-200 transition focus:outline-none"
                  aria-label={isFullScreen ? "Minimizar" : "Maximizar"}
                  title={isFullScreen ? "Minimizar" : "Maximizar"}
                >
                  {isFullScreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                </button>
              )}
              <button 
                onClick={toggleChat}
                className="text-white hover:text-gray-200 transition focus:outline-none"
                aria-label="Cerrar"
                title="Cerrar"
              >
                <X size={20} />
              </button>
            </div>
          </div>
          <div className={`${isFullScreen || isMobile ? 'h-[calc(100%-48px)]' : 'h-[calc(600px-48px)]'} overflow-hidden`}>
            <ChatWindow />
          </div>
        </div>
      )}
      {!isChatOpen && (
        <div className="fixed bottom-6 right-6">
          <button
            onClick={toggleChat}
            className="bg-blue-700 text-white p-4 rounded-full shadow-lg hover:bg-blue-800 transition flex items-center justify-center focus:outline-none focus:ring-0"
            aria-label="Abrir chat"
            title="Abrir chat"
          >
            <MessageSquare size={26} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatWidgetButton; 