import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import { useReducer, useRef, useState, useEffect } from "react"

import { motion } from "framer-motion"
import Container from "components/Container"
import Content from 'components/Content';
import Seo from 'components/seo';
import InView from "react-intersection-observer"
import Test from "components/test"

const variants = {
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, delay: 0.5 },
  },
  hidden: {
    x: '-100%',
    opacity: 1,
  },
}

const variants2 =
{
  visible: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
  hidden: {
    opacity: 0
  },
}

export default function IndexPage()
{

  return (
    <Container pageId={0}>
      <Seo title='Home' />
      <Content isPrimary sectionId='home'>
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
    // <Template>
    //   <AnimatePresence>

    //     <Router>
    //       <Home path='/' />
    //       <Settings path='/settings' />
    //     </Router>
    //   </AnimatePresence >
    // </Template >
  )
}