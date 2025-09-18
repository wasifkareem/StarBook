"use client";

import { getUserProStatus } from "@/lib/actions/users";
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import z from "zod";

const appStateSchema = z.object({
  reloadSpaces: z.boolean(),
  reloadTweets: z.boolean(),
  reloadCards: z.boolean(),
  field: z.string(),
  theme: z.string(),
  pro: z.boolean().default(false),
});

interface AppContextType {
  state: AppState;
  setReloadSpaces: (reloadSpaces: boolean) => void;
  setReloadTweets: (reloadTweets: boolean) => void;
  setReloadCards: (reloadCards: boolean) => void;
  setField: (field: string) => void;
  setTheme: (field: string) => void;
}

type AppState = z.infer<typeof appStateSchema>;

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AppState>({
    reloadSpaces: false,
    reloadTweets: false,
    reloadCards: false,
    field: "medium",
    theme: "basic",
    pro: false,
  });

  const setReloadSpaces = () => {
    setState((prev) => ({ ...prev, reloadSpaces: !prev.reloadSpaces }));
  };

  const setReloadTweets = () => {
    setState((prev) => ({ ...prev, reloadTweets: !prev.reloadTweets }));
  };

  const setReloadCards = () => {
    setState((prev) => ({ ...prev, reloadCards: !prev.reloadCards }));
  };

  const setField = (val: string) => {
    setState((prev) => ({ ...prev, field: val }));
  };

  const setTheme = (val: string) => {
    setState((prev) => ({ ...prev, theme: val }));
  };
  useEffect(() => {
    getUserProStatus().then((isPro) => {
      setState((prev) => ({
        ...prev,
        pro: isPro,
      }));
    });
  }, []);
  return (
    <AppContext.Provider
      value={{
        state,
        setReloadSpaces,
        setReloadTweets,
        setReloadCards,
        setField,
        setTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
