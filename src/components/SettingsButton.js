import React from 'react'
import { useState, useEffect, useContext, useRef, useMemo, useReducer } from 'react'
import { RiSettings4Line, RiHome2Line } from 'react-icons/ri'
import styled from 'styled-components';
import { motion } from "framer-motion";
import { useLocation } from '@reach/router';
import { Link } from "gatsby";

const variants = {
    initial: { x: -50, transition: { ease: 'linear', duration: 0.1 } },
    hover: { opacity: 1, x: 0, transition: { ease: 'linear', duration: 0.1 } },
}

const StyledSettingsLink = styled(motion(Link))`
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 8px;
`

export default function SettingsButton()
{
    const location = useLocation()
    const [isSettings, setIsSettings] = useState(location.pathname.includes('settings'))

    useEffect(() =>
    {
        setIsSettings(location.pathname.includes('settings'))
    })


    const ThemeToggleSpan = styled(motion.span)`
    display: flex;
    background-color: ${({ theme }) => theme.colors.navigation};
    cursor: pointer;
    transition: 300ms;
    border-radius: 2px;
    
    :hover
    {
        background-color: ${({ theme }) => theme.colors.navigationHover};

        svg
        {
            transform: ${!isSettings && 'rotate(359deg)'};
            transition: 3s;
        }
    }

    svg
    {
        height: 20px;
        width: 20px;
    }

`
    return (
        <ThemeToggleSpan variants={variants}>
            <StyledSettingsLink to={isSettings ? '/' : '/settings'}>
                {isSettings ? <RiHome2Line /> : <RiSettings4Line />}
            </StyledSettingsLink>
        </ThemeToggleSpan>
    )
}