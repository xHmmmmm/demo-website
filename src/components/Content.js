import React from 'react'
import { useState, useEffect, useContext, useRef, useMemo, useReducer, forwardRef } from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { motion, useAnimation } from "framer-motion";

const StyledSection = styled(motion.section)`
    height: 100vh;
    flex-shrink: 0;
    padding: 1em;
    background-color: ${({ theme, isPrimary }) => isPrimary ? theme.colors.primaryBackground : theme.colors.secondaryBackground};
    overflow-x: hidden;
    scroll-snap-align: start;
`

const Content = forwardRef(({ children, sectionId, isPrimary }, ref) =>
{
    return <StyledSection ref={ref} id={sectionId} isPrimary={isPrimary}>
        {children}
    </StyledSection>
})

Content.propTypes =
{
    children: PropTypes.node,
    sectionId: PropTypes.string.isRequired,
    isPrimary: PropTypes.bool,
}

Content.displayName = 'Content';
export default Content