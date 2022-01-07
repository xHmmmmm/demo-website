import { motion } from "framer-motion"
import React from 'react'
import { useState, useEffect, useContext, useRef, useMemo, useReducer } from 'react'
import { RiArrowUpDownLine } from "react-icons/ri"
import styled from "styled-components"

const NoticeContainer = styled(motion.div)`
    position: fixed;
    bottom: 4em;
    right: 4em;
    z-index: 30;

    display: grid;
    grid-template-columns: 1fr min-content;
    grid-template-rows: min-content min-content;
    grid-template-areas:
    'text icon'
    'button icon';
    gap: 1em;
    
    text-align: right;
    font-size: 0.4em;
    user-select: none;

    > svg
    {
        grid-area: icon;
        height: 100%;
        width: auto;
    }
`

const ConfirmButton = styled.button`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.foreground};
    border: 0.1em solid ${({ theme }) => theme.colors.foreground};
    border-radius: 0.2em;
    padding: 0.3em;
    font-size: 1em;
    font-weight: 600;

    transition-property: background-color, color;
    transition-duration: 0.3s;
    transition-timing-function: ease-in-out;

    &:hover
    {
        background-color: ${({ theme }) => theme.colors.foreground};
        color: ${({ theme }) => theme.colors.primaryBackground};
    }
`

export default function Notice({ hide })
{

    return (
        <NoticeContainer initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
            <p>Try to navigate<br />using arrow keys</p>
            <RiArrowUpDownLine />
            <ConfirmButton onClick={hide}>I got it</ConfirmButton>
        </NoticeContainer>
    )
}
