'use client'

import { createContext, useContext, ReactNode, useState } from "react";
import z from "zod";

const appStateSchema = z.object({
   reloadSpaces: z.boolean(),
});

interface AppContextType{
    state: AppState,
    setReloadSpaces:(reloadSpaces:boolean)=>void
}

type AppState = z.infer<typeof appStateSchema>;

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider =({children}:{children:ReactNode})=>{
const [state, setState] = useState<AppState>({
    reloadSpaces:false
})

const setReloadSpaces=()=>{
    setState(prev=>({...prev,reloadSpaces:!prev.reloadSpaces}))
}

return(
    <AppContext.Provider value={{
        state,
        setReloadSpaces
    }}>
     {children}
    </AppContext.Provider>
)
}

export function useAppContext() {
    const context = useContext(AppContext)
    if (!context) {
      throw new Error('useAppContext must be used within an AppProvider')
    }
    return context
  }