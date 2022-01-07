import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;400;500;600;700&family=Jost:wght@100;200;300;400;500;600;700;800;900&family=Roboto+Mono:wght@100;200;300;400;500;600;700&display=swap');

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
        text-decoration: none;
        -webkit-tap-highlight-color: transparent;
        margin: 0;
        padding: 0;
    }

    button
    {
        border: none;
        outline: none;
        cursor: pointer;
    }

    input, input:active, textarea
    {
        border: none;
        outline: none;
    }

    ::-webkit-scrollbar
    {
        width: 15px;
        background-color: ${({ theme }) => theme.colors.primaryBackground};

        @media(max-width: 1024px)
        {
            display: none;
        }
    }
    
    ::-webkit-scrollbar-thumb
    {
        background-color: ${({ theme }) => theme.colors.scrollbarThumb};
                
        :hover
        {
            background-color: ${({ theme }) => theme.colors.scrollbarThumbHover};
        }
    }

    .Typewriter
    {
        position: relative;
        min-height: 1.3em;
        font-family: 'Roboto Mono';
        font-weight: 500;
        font-size: 3em;
    }

    .cursor
    {
        position: absolute;
        justify-self: end;
        align-self: baseline;
        margin-left: 0.15em;
        background-color: ${({ theme }) => theme.colors.accent};
        animation: blink 1s ease-in-out infinite alternate;

        @keyframes blink
        {
            50% { opacity: 0; }
        }
    }
`