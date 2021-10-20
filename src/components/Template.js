import React, { useReducer, useState, useEffect } from 'react'
import PropTypes from "prop-types"
import { GlobalStyle } from 'components/styled/GlobalStyle';
import styled from 'styled-components';
import Navigation from 'components/Navigation';
import { motion, AnimatePresence } from "framer-motion";
import { clamp } from "popmotion";
import ThemeContextProvider from "components/contexts/ThemeContext";

const Layout = styled(motion.div)`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
`

export default function Template({ children })
{

    return (
        <ThemeContextProvider>
            <GlobalStyle />

            <Layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <AnimatePresence exitBeforeEnter>

                    <Navigation />
                    {children}
                </AnimatePresence>
            </Layout>
        </ThemeContextProvider>
    )
}

Template.propTypes = {
    children: PropTypes.node.isRequired,
}