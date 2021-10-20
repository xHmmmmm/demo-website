import { motion, useAnimation } from "framer-motion"
import React from 'react'
import { useState, useEffect, useContext, useRef, useMemo, useReducer } from 'react'
import PropTypes from 'prop-types';

export default function Test({ inView, variants })
{
    const animation = useAnimation();

    useEffect(() =>
    {
        if (inView)
        {
            animation.start("visible");
        } else
        {
            animation.start("hidden");
        }
    }, [animation, inView]);

    return (
        <div>
            <motion.h1 variants={variants} initial='hidden' animate={animation}>TEST</motion.h1>
        </div>
    )
}

Test.propTypes =
{
    inView: PropTypes.bool.isRequired,
    variants: PropTypes.object.isRequired,
}