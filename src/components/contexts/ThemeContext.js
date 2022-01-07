import React, { createContext, useContext, useReducer, useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from 'components/styled/theme/theme';

const ThemeContext = createContext({
    changeFontSize: () => null,
    isDarkTheme: false,
    toggleTheme: () => null
})

export const useTheme = () => useContext(ThemeContext)

export default function ThemeContextProvider({ children })
{
    const [fontSize, setFontSize] = useState('4vh')

    const [isDarkTheme, toggleTheme] = useReducer((prev) => 
    {
        prev ? localStorage.setItem('theme', 'light') : localStorage.setItem('theme', 'dark')
        return !prev
    }, false)

    useEffect(() =>
    {
        setFontSize(localStorage.getItem('fontSize') || '4vh')
        localStorage.getItem('theme') == 'dark' && toggleTheme()
    }, [])

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
        <ThemeProvider theme={isDarkTheme ? { ...darkTheme, fontSize } : { ...lightTheme, fontSize }}>
            <ThemeContext.Provider value={themeCtx}>
                {children}
            </ThemeContext.Provider>
        </ThemeProvider>
    )
}
