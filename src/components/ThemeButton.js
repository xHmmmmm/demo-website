import React from 'react'
import { RiSunLine, RiMoonLine } from 'react-icons/ri'
import styled from 'styled-components';
import { motion } from "framer-motion";
import { useTheme } from 'components/contexts/ThemeContext';
import { useView } from './contexts/ViewContext';

const variants = {
    initial: { x: -50, transition: { ease: 'linear', duration: 0.1 } },
    hover: { opacity: 1, x: 0, transition: { ease: 'linear', duration: 0.1 } },
}

const ThemeToggleDesktop = styled(motion.span)`
    display: flex;
    padding: 8px;
    background-color: ${({ theme }) => theme.colors.navigation};
    cursor: pointer;

    transition-property: transform, background-color;
    transition-duration: 300ms;
    border-radius: 2px;

    &:hover
    {
        background-color: ${({ theme }) => theme.colors.navigationHover};

        > svg
        {
            transform: rotate(359deg);
            transition: transform 3s;
        }
    }

    > svg
    {
        height: 20px;
        width: 20px;
    }
`

const ThemeToggleMobile = styled.span`
    width: 50px;
    height: 30px;
    border-radius: 20px;
    cursor: pointer;
    display: flex;
    background: #aaaaaa;
    justify-content: flex-start;
    padding: 4px;

    > span
    {
        display: flex;
        background: #ffffff;
        padding: 0.1rem;
        width: 50%;
        height: 100%;
        border-radius: 50%;
        align-items: center;
        justify-content: center;

        > svg
        {
            height: 80%;
            width: 80%;
        }
    }


    &[data-isdark='true']
    {
        background: #555555;
        justify-content: flex-end;

        > span
        {
            background: #111111;
        }

        > svg
        {
            color: white;
        }
    }
`;

export default function ThemeButton()
{
    const { isDarkTheme, toggleTheme } = useTheme()
    const { isMobile } = useView()

    if (isMobile)
    {
        return (
            <ThemeToggleMobile data-isdark={isDarkTheme} onClick={toggleTheme}>
                <motion.span layout>
                    {isDarkTheme ? <RiSunLine /> : <RiMoonLine />}
                </motion.span>
            </ThemeToggleMobile>
        )
    }

    return (
        <ThemeToggleDesktop variants={variants} onClick={toggleTheme}>
            {isDarkTheme ? <RiSunLine /> : <RiMoonLine />}
        </ThemeToggleDesktop>
    )
}