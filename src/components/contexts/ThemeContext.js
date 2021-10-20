import React, { createContext, useContext, useReducer, useState } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from 'components/styled/theme/theme';

const ThemeContext = createContext({

})

export const useTheme = () => useContext(ThemeContext)

export default function ThemeContextProvider({ children })
{
    const [fontSize, setFontSize] = useState(typeof window !== 'undefined' ? localStorage.getItem('fontSize') : '4vh')

    const [isDarkTheme, toggleTheme] = useReducer((prev) => 
    {
        prev ? localStorage.setItem('theme', 'light') : localStorage.setItem('theme', 'dark')
        return !prev
    }, typeof window !== 'undefined' ? localStorage.getItem('theme') == 'dark' : false)

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
            {/* <ThemeProvider theme={darkTheme}> */}
            <ThemeContext.Provider value={themeCtx}>
                {children}
            </ThemeContext.Provider>
        </ThemeProvider>
    )
}
