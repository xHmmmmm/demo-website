import React from 'react'
import PropTypes from "prop-types"
import { GlobalStyle } from 'components/styled/GlobalStyle';
import styled from 'styled-components';
import Navigation from 'components/Navigation';
import { motion, AnimatePresence } from "framer-motion";
import ThemeContextProvider from "components/contexts/ThemeContext";
import ViewContextProvider from "./contexts/ViewContext";

const Layout = styled(motion.div)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: auto;
    height: 100vh;
`

export default function Template({ children })
{

    return (
        <ThemeContextProvider>
            <ViewContextProvider>
                <GlobalStyle />
                <Layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <AnimatePresence exitBeforeEnter>
                        <Navigation />

                        {children}
                    </AnimatePresence>
                </Layout>
            </ViewContextProvider>
        </ThemeContextProvider>
    )
}

Template.propTypes = {
    children: PropTypes.node.isRequired,
}