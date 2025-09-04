'use client'

import { createContext, useContext, ReactNode, useState } from "react";
import z from "zod";

const appStateSchema = z.object({
   reloadSpaces: z.boolean(),
   reloadTweets:z.boolean(),
   reloadCards:z.boolean(),
   field:z.string(),
});

interface AppContextType{
    state: AppState,
    setReloadSpaces:(reloadSpaces:boolean)=>void,
    setReloadTweets:(reloadTweets:boolean)=>void,
    setReloadCards:(reloadCards:boolean)=>void,
    setField:(field:string)=>void
}

type AppState = z.infer<typeof appStateSchema>;

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider =({children}:{children:ReactNode})=>{
const [state, setState] = useState<AppState>({
    reloadSpaces:false,
    reloadTweets:false,
    reloadCards:false,
    field:'medium'
})

const setReloadSpaces=()=>{
    setState(prev=>({...prev,reloadSpaces:!prev.reloadSpaces}))
}

const setReloadTweets=()=>{
    setState(prev=>({...prev,reloadTweets:!prev.reloadTweets}))
}

const setReloadCards=()=>{
    setState(prev=>({...prev,reloadCards:!prev.reloadCards}))
}

const setField=(val:string)=>{
    setState(prev=>({...prev,field:val}))
}

return(
    <AppContext.Provider value={{
        state,
        setReloadSpaces,
        setReloadTweets,
        setReloadCards,
        setField
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