import { AnimatePresence, motion } from "framer-motion"
import React from 'react'
import { useState, useEffect, useContext, useRef, useMemo, useReducer } from 'react'
import Content from 'components/Content';
import Seo from 'components/seo';
import InView from "react-intersection-observer";
import Test from "components/test";
import Container from 'components/Container';

const variants = {
    visible: {
        x: 0,
        opacity: 1,
        transition: { duration: 0.5, delay: 0.5 },
    },
    hidden: {
        x: '-30vw',
        opacity: 1,
    },
}

const variants2 = {
    visible: {
        x: 0,
        opacity: 1,
        transition: { duration: 0.5, delay: 0.5 },
    },
    hidden: {
        x: '120vw',
        opacity: 1,
    },
}

export default function Home(props)
{


    return (
        <Container>
            <Content isPrimary sectionId='home'>
                <Seo title='Home' />
                <motion.h1>
                    HOME
                </motion.h1>
            </Content>
            <InView threshold={0.3}>
                {({ ref, inView }) => (
                    <Content ref={ref} sectionId='cos'>
                        <Test inView={inView} variants={variants} />
                        <Test inView={inView} variants={variants2} />
                        <Test inView={inView} variants={variants2} />
                        <Test inView={inView} variants={variants2} />
                        <Test inView={inView} variants={variants2} />
                        <Test inView={inView} variants={variants2} />
                        <Test inView={inView} variants={variants2} />
                        <Test inView={inView} variants={variants2} />
                    </Content>
                )}
            </InView>
            <Content isPrimary sectionId='xd'>

            </Content>
        </Container>
    )
}
