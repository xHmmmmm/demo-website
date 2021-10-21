import React, { createContext, useContext, useReducer, useState, useEffect } from "react";

const ViewContext = createContext({

})

export const useView = () => useContext(ViewContext)

export default function ViewContextProvider({ children })
{
    const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' && window.matchMedia("(max-width: 1024px)").matches)

    useEffect(() =>
    {
        window.matchMedia("(max-width: 1024px)").addEventListener('change', (e) => setIsMobile(e.matches));

        return () => window.matchMedia("(max-width: 1024px)").removeEventListener('change')
    }, [])

    const viewCtx = {
        isMobile
    }

    return (
        <ViewContext.Provider value={viewCtx}>
            {children}
        </ViewContext.Provider>
    )
}
