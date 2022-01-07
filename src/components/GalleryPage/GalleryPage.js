import { motion, useAnimation } from "framer-motion";
import React from 'react'
import { useEffect } from 'react'
import styled from 'styled-components';
import Gallery from "./Gallery";

const GalleryPageDiv = styled(motion.div)`
    display: flex;
    flex-direction: column;
    background-size: cover;
    width: 100%;
    height: 100%;
    padding: 0.5em 0.8em 0.8em 0.8em;
    padding: 1.5em 0.8em;
    gap: 0.6em;

    @media(max-width: ${({ theme }) => theme.mobileScreen})
    {
        padding: 0.3em;
    }
`

export default function GalleryPage({ inView, variants })
{
    const animation = useAnimation()

    useEffect(() =>
    {
        if (inView) animation.start("visible")
        else animation.start("hidden")
    }, [animation, inView])

    return (
        inView && <GalleryPageDiv variants={variants} initial='hidden' animate={animation}>
            <Gallery />
        </GalleryPageDiv>
    )
}
