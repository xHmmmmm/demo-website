import React, { createContext, useContext, useReducer, useState, useEffect, useCallback } from "react";
import { useTheme } from "styled-components";

const ViewContext = createContext({
    isMobile: false,
})

export const useView = () => useContext(ViewContext)

export default function ViewContextProvider({ children })
{
    const theme = useTheme()

    const [isMobile, setIsMobile] = useState(false)

    const handleChange = useCallback((e) => setIsMobile(e.matches), [])

    useEffect(() =>
    {
        window.matchMedia(`(max-width: ${theme.mobileScreen})`).addEventListener('change', handleChange);
        setIsMobile(window.matchMedia(`(max-width: ${theme.mobileScreen})`).matches)

        return () => window.matchMedia(`(max-width: ${theme.mobileScreen})`).removeEventListener('change', handleChange)
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
