/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/ssr-apis/
 */

// You can delete this file if you're not using it

import React from 'react';
import Template from "./src/components/Template";

export const wrapPageElement = ({ element, props }) => (
    <Template {...props}>
        {element}
    </Template>
)
