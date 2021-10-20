/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

// You can delete this file if you're not using it

import React from 'react';
import { AnimatePresence } from 'framer-motion';
import Template from "./src/components/Template";

export const wrapPageElement = ({ element, props }) => (
    <Template {...props}>
        {element}
    </Template>
)
