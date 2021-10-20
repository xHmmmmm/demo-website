import React, { createContext, useContext, useReducer, useState } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from 'components/styled/theme/theme';

const ThemeContext = createContext({

})

export const useTheme = () => useContext(ThemeContext)

export default function ThemeContextProvider({ children })
{
    const [fontSize, setFontSize] = useState(typeof window !== 'undefined' && localStorage.getItem('fontSize'))

    const [isDarkTheme, toggleTheme] = useReducer((prev) => 
    {
        prev ? localStorage.setItem('theme', 'light') : localStorage.setItem('theme', 'dark')
        return !prev
    }, typeof window !== 'undefined' && localStorage.getItem('theme') == 'dark' ? true : false)

    function changeFontSize(size)
    {
        const newFontSize = Math.min(Math.max(size, 1.5), 6) + 'vh'
        localStorage.setItem('fontSize', newFontSize)

        setFontSize(newFontSize)
    }

    const themeCtx = {
        changeFontSize,
        isDarkTheme,
        toggleTheme
    }

    return (
        // <ThemeProvider theme={theme}>
        <ThemeProvider theme={isDarkTheme ? { ...darkTheme, fontSize } : { ...lightTheme, fontSize }}>
            <ThemeContext.Provider value={themeCtx}>
                {children}
            </ThemeContext.Provider>
        </ThemeProvider>
    )
}
