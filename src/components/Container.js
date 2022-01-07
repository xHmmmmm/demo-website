import React from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { motion } from "framer-motion";

const StyledMain = styled(motion.main)`
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    overflow-y: scroll;
    scroll-snap-type: y mandatory;
    scroll-behavior: smooth;
    scrollbar-color: ${({ theme }) => theme.colors.scrollbarThumb} ${({ theme }) => theme.colors.primaryBackground} ;
    scrollbar-width: 15px;

    @media(max-width: ${({ theme }) => theme.mobileScreen})
    {
        flex: 1;
        height: 100%;
        scrollbar-width: none;
        scroll-snap-type: none;
    }
`

export default function Container({ children, pageId })
{

    return (
        <StyledMain key={pageId} initial={{ opacity: 0 }
        } transition={{ duration: 0.5 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {children}
        </StyledMain >)
}

Container.propTypes = {
    children: PropTypes.node.isRequired,
    pageId: PropTypes.number.isRequired,
}