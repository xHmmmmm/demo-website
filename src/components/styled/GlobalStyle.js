import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;400;500;600;700&family=Jost:wght@100;200;300;400;500;600;700;800;900&display=swap');

    html
    {
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        scroll-padding-top: 60px;
        overflow: hidden;
    }
    
    body
    {
        margin: 0;
        padding: 0;
        font-family: Jost sans-serif;
        font-size: ${({ theme }) => theme.fontSize || '5vh'};
        height: 100%;
        width: 100%;
        background-color: ${({ theme }) => theme.colors.bodyBackground};
        color: ${({ theme }) => theme.colors.foreground};
    }
    
    #___gatsby, #gatsby-focus-wrapper
    {
        height: 100%;
        width: 100%;
    }
    
    *, *::before, *::after
    {
        box-sizing: border-box;
        -webkit-tap-highlight-color: transparent;
    }

    button
    {
        border: none;
        outline: none;
        cursor: pointer;
    }

    h1, h2, h3, h4, h5, h6
    {
        margin: 0;
    }
`