import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { motion } from "framer-motion";
import { sections } from "sections";
import ThemeButton from "components/ThemeButton";
import SettingsButton from 'components/SettingsButton';
import { useLocation } from '@reach/router';

const variants = {
    initial: { opacity: 0.4 },
    hover: { opacity: 1 }
}

const StyledNav = styled(motion.nav)`
    position: fixed;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    width: 60px;
    padding-block: 10px;
    z-index: 50;
`

const StyledLinksContainer = styled(motion.div)`
    display: flex;
    flex-direction: column;
    margin-block: auto;
    gap: 10px;
`

const StyledAnchorButton = styled(motion.button)`
    display: flex;
    height: 30px;
    width: 30px;
    background-color: ${({ theme }) => theme.colors.navigation};
`

export default function Navigation()
{
    const location = useLocation()
    const [isSettings, setIsSettings] = useState(location.pathname.includes('settings'))

    useEffect(() =>
    {
        setIsSettings(location.pathname.includes('settings'))
    })

    function scrollToSection(id)
    {
        const element = document.getElementById(id) //using refs in this case seems to be an overengineering
        element.scrollIntoView()
    }

    return (
        <StyledNav variants={variants} initial='initial' whileHover='hover' animate='initial'>
            <SettingsButton />

            <StyledLinksContainer initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {!isSettings && sections.map((section) =>
                    <motion.span key={section.id} whileHover={{ scale: 1.1 }}>
                        <StyledAnchorButton onClick={() => scrollToSection(section.id)} />
                    </motion.span>
                )}
            </StyledLinksContainer>

            <ThemeButton />
        </StyledNav >
    )
}