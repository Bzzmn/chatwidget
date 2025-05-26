import { validate } from "uuid";
import { Thread } from "@langchain/langgraph-sdk";
import {
  createContext,
  useContext,
  ReactNode,
  useCallback,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { createClient } from "./client";
import { useWidgetConfig } from "../ChatWidget";
import { toast } from "sonner";

interface ThreadContextType {
  getThreads: () => Promise<Thread[]>;
  threads: Thread[];
  setThreads: Dispatch<SetStateAction<Thread[]>>;
  threadsLoading: boolean;
  setThreadsLoading: Dispatch<SetStateAction<boolean>>;
}

const ThreadContext = createContext<ThreadContextType | undefined>(undefined);

function getThreadSearchMetadata(
  assistantId: string,
): { graph_id: string } | { assistant_id: string } {
  if (validate(assistantId)) {
    return { assistant_id: assistantId };
  } else {
    return { graph_id: assistantId };
  }
}

export function ThreadProvider({ children }: { children: ReactNode }) {
  const config = useWidgetConfig();
  const { langGraphApiUrl, assistantId, langSmithApiKey } = config;

  const [threads, setThreads] = useState<Thread[]>([]);
  const [threadsLoading, setThreadsLoading] = useState(false);

  const getThreads = useCallback(async (): Promise<Thread[]> => {
    if (!langGraphApiUrl || !assistantId) {
      console.warn("ThreadProvider: langGraphApiUrl or assistantId is missing from config.");
      return [];
    }
    setThreadsLoading(true);
    try {
      const client = createClient(langGraphApiUrl, langSmithApiKey);
      const fetchedThreads = await client.threads.search({
        metadata: {
          ...getThreadSearchMetadata(assistantId),
        },
        limit: 100,
      });
      setThreads(fetchedThreads);
      return fetchedThreads;
    } catch (error) {
      console.error("Error fetching threads:", error);
      toast.error("Error fetching threads", {
        description: (error as Error)?.message || "Could not connect to the server.",
        richColors: true,
      });
      return [];
    } finally {
      setThreadsLoading(false);
    }
  }, [langGraphApiUrl, assistantId, langSmithApiKey]);

  useEffect(() => {
    if (langGraphApiUrl && assistantId) {
      getThreads();
    }
  }, [langGraphApiUrl, assistantId, getThreads]);

  const value = {
    getThreads,
    threads,
    setThreads,
    threadsLoading,
    setThreadsLoading,
  };

  if (!langGraphApiUrl || !assistantId) {
    return <>{children}</>;
  }

  return (
    <ThreadContext.Provider value={value}>{children}</ThreadContext.Provider>
  );
}

export function useThreads() {
  const context = useContext(ThreadContext);
  if (context === undefined) {
    throw new Error("useThreads must be used within a ThreadProvider");
  }
  return context;
}
