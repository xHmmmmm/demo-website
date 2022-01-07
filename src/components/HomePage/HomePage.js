import { motion, useAnimation } from "framer-motion";
import React from 'react'
import { useEffect } from 'react'
import styled from 'styled-components';
import Typewriter from 'typewriter-effect';

const HomePageDiv = styled(motion.div)`
    display: flex;
    flex-direction: column;
    background-size: cover;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;

    .Typewriter
    {
        font-family: 'Roboto Mono';
        font-size: 2.5em;
        max-width: 80% ;
        text-align: center;
        
        @media(max-width: 1024px)
        {
            font-size: 8vw;
        }
    }

    .cursor
    {
        width: 1ch;
        height: 1.3em;
        margin-top: 0.15ch;
    }
`

export default function HomePage({ inView, variants })
{
    const animation = useAnimation()

    useEffect(() =>
    {
        if (inView) animation.start("visible")
        else animation.start("hidden")
    }, [animation, inView])

    return (
        inView && <HomePageDiv variants={variants} initial='hidden' animate={animation}>
            <Typewriter options={{ cursor: '', cursorClassName: 'cursor' }} onInit={(typewriter) => { typewriter.typeString('Lorem Ipsum...').pauseFor(2000).deleteAll().typeString('Maybe not yet').start() }} />
        </HomePageDiv >
    )
}
