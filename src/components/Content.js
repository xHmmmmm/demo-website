import React from 'react'
import { forwardRef } from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { motion, } from "framer-motion";

const StyledSection = styled(motion.section)`
    height: 100%;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    background-color: ${({ theme }) => theme.colors.primaryBackground};
    overflow-x: hidden;
    scroll-snap-align: start;
    border-bottom: 2px solid ${({ theme }) => theme.colors.contrastBackground};
`

const Content = forwardRef(({ children, sectionId }, ref) =>
{
    return <StyledSection ref={ref} id={sectionId}>
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