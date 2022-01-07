import React from 'react'
import { useRef } from 'react'
import { RiCloseLine } from "react-icons/ri"
import styled from "styled-components"
import { motion } from 'framer-motion';

const NewsPreviewWrapper = styled(motion.div)`
    position: fixed;
    background-color: #000000dd;
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;

    display: grid;
    place-items: center;
    z-index: 50;
`

const StyledNewsPreview = styled.div`
    background-color: ${({ theme }) => theme.colors.contrastBackground};
    padding: 1em;
    gap: 0.3em;
    display: grid;
    grid-template-columns: 1fr min-content;
    grid-template-rows: min-content min-content;

    > svg
    {
        height: 100%;
        width: auto;
        cursor: pointer;
    }

    > h1
    {
        font-size: 0.9em;
    }

    > p
    {
        font-size: 0.6em;
        grid-column: 1 / span 2;
    }
`

const variants = {
    closed: { opacity: 0, transition: { duration: 0.2 } },
    open: { opacity: 1, transition: { duration: 0.2 } }
}

export default function NewsPreview({ title, content, close })
{
    const previewRef = useRef(null)

    function closePreview(e)
    {
        if (previewRef && !previewRef.current.contains(e.target))
        {
            close()
        }
    }

    return (
        <NewsPreviewWrapper onClick={closePreview} variants={variants} initial='closed'
            animate='open'
            exit='closed'>

            <StyledNewsPreview ref={previewRef}>
                <h1>{title}</h1>
                <RiCloseLine onClick={close} />
                <p>{content}</p>
            </StyledNewsPreview>
        </NewsPreviewWrapper>
    )
}
