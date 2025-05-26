import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { useStream } from "@langchain/langgraph-sdk/react";
import { type Message } from "@langchain/langgraph-sdk";
import {
  uiMessageReducer,
  type UIMessage,
  type RemoveUIMessage,
} from "@langchain/langgraph-sdk/react-ui";
import { useQueryState } from "nuqs";
import { useThreads } from "./Thread";
import { toast } from "sonner";
import { useWidgetConfig } from "../ChatWidget";

export type StateType = { messages: Message[]; ui?: UIMessage[] };

interface StreamUpdateType {
  messages?: Message[] | Message | string;
  ui?: (UIMessage | RemoveUIMessage)[] | UIMessage | RemoveUIMessage;
}

type StreamCustomEventType = UIMessage | RemoveUIMessage;

interface StreamBagType {
  UpdateType: StreamUpdateType;
  CustomEventType: StreamCustomEventType;
}

type StreamContextType = ReturnType<typeof useStream<StateType, StreamBagType>>;

const StreamContext = createContext<StreamContextType | undefined>(undefined);

async function checkGraphStatus(
  apiUrl: string,
  apiKey: string | null | undefined,
): Promise<boolean> {
  try {
    const res = await fetch(`${apiUrl}/info`, {
      ...(apiKey && {
        headers: {
          "X-Api-Key": apiKey,
        },
      }),
    });

    return res.ok;
  } catch (e) {
    console.error(e);
    return false;
  }
}

const StreamSession = ({
  children,
  apiKey,
  apiUrl,
  assistantId,
}: {
  children: ReactNode;
  apiKey: string | null | undefined;
  apiUrl: string;
  assistantId: string;
}) => {
  const [threadId, setThreadId] = useQueryState("threadId");
  const { getThreads, setThreads } = useThreads();
  
  const streamValue = useStream<StateType, StreamBagType>({
    apiUrl,
    apiKey: apiKey ?? undefined,
    assistantId,
    threadId: threadId ?? null,
    onCustomEvent: (event: StreamCustomEventType, options: { mutate: (fn: (prev: StateType) => StateType) => void; }) => {
      options.mutate((prev: StateType) => {
        const ui = uiMessageReducer(prev.ui ?? [], event);
        return { ...prev, ui };
      });
    },
    onThreadId: (id: string | null) => {
      setThreadId(id);
      setTimeout(() => {
        getThreads()
          .then(threads => {
            setThreads(threads);
            if (threads.length > 0 && id && !threads.some(t => t.thread_id === id)) {
              setTimeout(() => getThreads().then(setThreads), 2000);
            }
          })
          .catch(error => {
            console.error("Error al obtener hilos:", error);
            setTimeout(() => getThreads().then(setThreads).catch(console.error), 2000);
          });
      }, 3000);
    },
  });

  useEffect(() => {
    if (apiUrl) {
      checkGraphStatus(apiUrl, apiKey).then((ok) => {
        if (!ok) {
          toast.error("Failed to connect to LangGraph server", {
            description: () => (
              <p>
                Please ensure your graph is running at <code>{apiUrl}</code> and
                your API key is correctly set (if connecting to a deployed graph).
              </p>
            ),
            duration: 10000,
            richColors: true,
            closeButton: true,
          });
        }
      });
    }
  }, [apiKey, apiUrl]);

  return (
    <StreamContext.Provider value={streamValue}>
      {children}
    </StreamContext.Provider>
  );
};

export const StreamProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const config = useWidgetConfig();

  const finalApiUrl = config.langGraphApiUrl;
  const finalAssistantId = config.assistantId;
  const finalApiKey = config.langSmithApiKey;

  console.log('StreamProvider using config:', config);
  console.log('AssistantId used in StreamProvider:', finalAssistantId);
  
  if (!finalApiUrl || !finalAssistantId) {
    console.error("ChatWidget: langGraphApiUrl and assistantId are required in config.");
    toast.error("ChatWidget Configuration Error", {
      description: "langGraphApiUrl and assistantId are required.",
      duration: 10000,
      richColors: true,
      closeButton: true,
    });
    return <>{children}</>;
  }

  return (
    <StreamSession
      apiKey={finalApiKey}
      apiUrl={finalApiUrl}
      assistantId={finalAssistantId}
    >
      {children}
    </StreamSession>
  );
};

export const useStreamContext = (): StreamContextType => {
  const context = useContext(StreamContext);
  if (context === undefined) {
    throw new Error("useStreamContext must be used within a StreamProvider");
  }
  return context;
};

export default StreamContext;
