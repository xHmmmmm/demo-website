import React, { useState, useEffect, useReducer, useRef } from 'react'
import styled from 'styled-components';
import { motion } from "framer-motion";
import { sections } from "sections";
import ThemeButton from "components/ThemeButton";
import { useLocation } from '@reach/router';
import { useView } from './contexts/ViewContext';
import { RiMenuFill } from "react-icons/ri";
import { scrollToSection } from "sections";

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
    z-index: 30;
    user-select: none;
`

const StyledMobileNav = styled(motion.nav)`
    display: flex;
    position: sticky;
    top: 0;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    padding-left: 1rem;
    z-index: 30;
    -webkit-box-shadow: 0px 9px 30px -25px rgba(0, 0, 0, 0.5);
    -moz-box-shadow: 0px 9px 30px -25px rgba(0, 0, 0, 0.5);
    box-shadow: 0px 9px 30px -25px rgba(0, 0, 0, 0.5);

    background-color: ${({ theme }) => theme.colors.topBar};
    
    > svg
    {
        height: 100%;
        width: auto;
        padding: 0.8rem 1.1rem;
        cursor: pointer;
    }
`

const DesktopLinksContainer = styled(motion.div)`
    display: flex;
    flex-direction: column;
    margin-block: auto;
    gap: 10px;
    z-index: 100;
`

const MobileLinksWrapper = styled(motion.div)`
    position: fixed;
    display: flex;
    left: -100%;
    top: 0;
    width: 100%;
    height: 100vh;

    &[data-isopened='true']
    {
        left: 0;
    }
`

const MobileLinksContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.navigation};

    > button
    {
        height: auto;
        width: auto;
        padding-block: 0.8em;
    }
`

const StyledAnchorButton = styled(motion.button)`
    display: flex;
    height: 30px;
    width: 30px;
    background-color: ${({ theme }) => theme.colors.navigation};
    color: ${({ theme }) => theme.colors.foreground};
    
    @media(max-width: ${({ theme }) => theme.mobileScreen})
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
    const [isHome, setIsHome] = useState(location.pathname == '/')
    const [isMenuOpened, toggleMenuOpened] = useReducer((prev) => !prev, false)
    const menuRef = useRef(null)

    const { isMobile } = useView()

    useEffect(() =>
    {
        setIsHome(location.pathname == '/')
    })

    function scroll(id)
    {
        scrollToSection(id)
        isMobile && toggleMenuOpened()
    }

    function closeMenu(e)
    {
        if (menuRef.current && !menuRef.current.contains(e.target))
        {
            toggleMenuOpened()
        }
    }

    if (isMobile)
    {
        return (
            isHome && <StyledMobileNav>
                <ThemeButton />
                <RiMenuFill onClick={toggleMenuOpened} />
                <MobileLinksWrapper data-isopened={isMenuOpened} onClick={closeMenu} layout transition={{ duration: 0.25 }}>
                    <MobileLinksContainer ref={menuRef}>
                        {sections.map((section) =>
                            <StyledAnchorButton key={section.id} onClick={() => scroll(section.id)}>
                                {section.label}
                            </StyledAnchorButton>
                        )}
                    </MobileLinksContainer>
                </MobileLinksWrapper>
            </StyledMobileNav >
        )
    }

    return (
        isHome && <StyledDesktopNav variants={variants} initial='initial' whileHover='hover' animate='initial'>

            <DesktopLinksContainer initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {sections.map((section) =>
                    <StyledAnchorButton key={section.id} whileHover={{ scale: 1.1 }} onClick={() => scroll(section.id)} />
                )}
            </DesktopLinksContainer>

            <ThemeButton />
        </StyledDesktopNav>
    )
}