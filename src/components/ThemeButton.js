import React from 'react'
import { useState, useEffect, useContext, useRef, useMemo, useReducer } from 'react'
import { RiSunLine, RiMoonLine } from 'react-icons/ri'
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { motion } from "framer-motion";
import { useTheme } from 'components/contexts/ThemeContext';

const variants = {
    initial: { x: -50, transition: { ease: 'linear', duration: 0.1 } },
    hover: { opacity: 1, x: 0, transition: { ease: 'linear', duration: 0.2 } },
}

const ThemeToggleSpan = styled(motion.span)`
    display: flex;
    padding: 8px;
    background-color: ${({ theme }) => theme.colors.navigation};
    cursor: pointer;
    transition: 300ms;
    border-radius: 2px;
    
    :hover
    {
        background-color: ${({ theme }) => theme.colors.navigationHover};

        svg
        {
            transform: rotate(359deg);
            transition: 3s;
        }
    }

    svg
    {
        height: 20px;
        width: 20px;
    }

`

export default function ThemeButton()
{
    const { isDarkTheme, toggleTheme } = useTheme()

    return (
        <ThemeToggleSpan variants={variants} onClick={toggleTheme}>
            {isDarkTheme ? <RiSunLine /> : <RiMoonLine />}
        </ThemeToggleSpan>
    )
}