import React, { useReducer, useState, useEffect } from 'react'
import PropTypes from "prop-types"
import { GlobalStyle } from 'components/styled/GlobalStyle';
import styled from 'styled-components';
import Navigation from 'components/Navigation';
import { motion, AnimatePresence } from "framer-motion";
import { clamp } from "popmotion";
import ThemeContextProvider from "components/contexts/ThemeContext";
import ViewContextProvider from "./contexts/ViewContext";

const Layout = styled(motion.div)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: auto;
`

export default function Template({ children })
{

    return (
        <ViewContextProvider>
            <ThemeContextProvider>
                <meta name="viewport"
                    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
                <GlobalStyle />

                <Layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <AnimatePresence exitBeforeEnter>
                        <Navigation />

                        {children}
                    </AnimatePresence>
                </Layout>
            </ThemeContextProvider>
        </ViewContextProvider>
    )
}

Template.propTypes = {
    children: PropTypes.node.isRequired,
}