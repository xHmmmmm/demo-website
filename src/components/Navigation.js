import React, { useState, useEffect, useReducer } from 'react'
import styled from 'styled-components';
import { motion } from "framer-motion";
import { sections } from "sections";
import ThemeButton from "components/ThemeButton";
import SettingsButton from 'components/SettingsButton';
import { useLocation } from '@reach/router';
import { useView } from './contexts/ViewContext';
import { RiMenuFill } from "react-icons/ri";

const variants = {
    initial: { opacity: 0.4 },
    hover: { opacity: 1 }
}

const StyledDesktopNav = styled(motion.nav)`
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
    user-select: none;
`

const StyledMobileNav = styled(motion.nav)`
    position: sticky;
    top: 0;
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    z-index: 30;
    user-select: none;
    justify-content: space-between;
    cursor: pointer;
    -webkit-box-shadow: 0px 9px 30px -25px rgba(0, 0, 0, 0.5);
    -moz-box-shadow: 0px 9px 30px -25px rgba(0, 0, 0, 0.5);
    box-shadow: 0px 9px 30px -25px rgba(0, 0, 0, 0.5);

    > span
    {
        display: flex;
        width: 100%;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height: 60px;
        padding-inline: 1rem;
        z-index: 50;
        background-color: ${({ theme }) => theme.colors.topBar};
    }

    > svg
    {
        height: 30px;
        width: 30px;
        margin: 10px;
    }
`

const StyledLinksContainer = styled(motion.div)`
    display: flex;
    flex-direction: column;
    margin-block: auto;
    gap: 10px;
    z-index: 40;

    &[data-isOpened='true']
    {
        margin-top: 60px;
    }
    
    @media(max-width: 1024px)
    {
        position: absolute;
        margin-top: -120px;
        gap: 0;
        width: 100%;
        background-color: ${({ theme }) => theme.colors.navigation};
    }
`

const StyledAnchorButton = styled(motion.button)`
    display: flex;
    height: 30px;
    width: 30px;
    background-color: ${({ theme }) => theme.colors.navigation};
    color: ${({ theme }) => theme.colors.foreground};
    
    @media(max-width: 1024px)
    {
        font-weight: 600;
        font-size: 1.5rem;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 60px;
    }
`

export default function Navigation()
{
    const location = useLocation()
    const [isSettings, setIsSettings] = useState(location.pathname.includes('settings'))
    const [isMenuOpened, toggleMenuOpened] = useReducer((prev) => !prev, false)

    const { isMobile } = useView()

    useEffect(() =>
    {
        setIsSettings(location.pathname.includes('settings'))
    })

    function scrollToSection(id)
    {
        const element = document.getElementById(id) //using refs in this case seems to be an overengineering
        element.scrollIntoView()
        toggleMenuOpened()
    }

    return (
        isMobile ?
            <StyledMobileNav>
                <span>
                    <ThemeButton />
                    <RiMenuFill onClick={toggleMenuOpened} />
                </span>
                <StyledLinksContainer data-isOpened={isMenuOpened} layout>
                    {!isSettings && sections.map((section) =>
                        <motion.span key={section.id}>
                            <StyledAnchorButton onClick={() => scrollToSection(section.id)}>
                                {section.label}
                            </StyledAnchorButton>
                        </motion.span>
                    )}
                </StyledLinksContainer>
            </StyledMobileNav >

            :

            <StyledDesktopNav variants={variants} initial='initial' whileHover='hover' animate='initial'>
                <SettingsButton />

                <StyledLinksContainer initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    {!isSettings && sections.map((section) =>
                        <motion.span key={section.id} whileHover={{ scale: 1.1 }}>
                            <StyledAnchorButton onClick={() => scrollToSection(section.id)} />
                        </motion.span>
                    )}
                </StyledLinksContainer>

                <ThemeButton />
            </StyledDesktopNav >
    )
}