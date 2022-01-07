import { GatsbyImage } from "gatsby-plugin-image"
import React from 'react'
import { useState, useRef, useReducer } from 'react'
import styled from 'styled-components';
import { motion, AnimatePresence } from "framer-motion"
import { labels } from "assets/labels";
import { graphql, useStaticQuery } from 'gatsby';
import { RiArrowLeftSFill, RiArrowRightSFill } from 'react-icons/ri'

const StyledGalleryContainer = styled.div`
    display: flex;
    max-width: 100%;
    height: 100%;
    margin: auto;
    position: relative;    
`

const ButtonGroup = styled.div`
    display: flex;
    position: absolute;
    bottom: 1em;
    right: 1em;
    z-index: 29;

    > button
    {
        display: flex;
        background-color: #ffffffaa;
        border-radius: 0.3em 0 0 0.3em;
        transition: background-color 0.3s linear;

        > svg
        {
            fill: #000000aa;
            height: 5em;
            width: 5em;
        }

        &:last-of-type
        {
            border-radius: 0 0.3em 0.3em 0; 
        }

        @media (hover: hover)
        {
            &:hover
            {
                background-color: #ccccccaa;
            }
        }
    }

    @media(max-width: ${({ theme }) => theme.mobileScreen})
    {
        bottom: initial;
        top: 0.7em;
        right: 0.7em;
        
        > button
        {
            > svg
            {
                height: 4em;
                width: 4em;
            }
        }
    }
`

const StyledImageContainer = styled(motion.div)`
    position: relative;

    > hgroup
    {
        display: flex;
        flex-direction: column;
        color: white;
        padding: 1em;
        position: absolute;
        bottom: 0;
        z-index: 21;
        background: linear-gradient(0deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.55) 70%, transparent);
        justify-content: flex-end;

        height: 20%;
        width: 100%;

        > h3
        {
            font-size: 0.8em;
            margin-bottom: 0.3em;
        }

        > h6
        {
            color: #aaaaaa;
            font-weight: 500;
            font-size: 0.5em;
        }

        @media(max-width: 1024px)
        {
            padding: 0.7em;
        }
    }
`

const StyledPreviewContainer = styled(StyledImageContainer)`
    z-index: 50;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    inset: 0;
    overflow: hidden;
    background-color: #000000dd;

    > div
    {
        margin: auto;
        position: relative;

        > button
        {
            background-color: #0000004f;
            position: absolute;
            top: 50%;
            height: 100%;
            z-index: 51;
            transition: background-color 0.3s linear;
            transform: translateY(-50%);

            > svg
            {
                fill: #cccccc;
                z-index: 21;
                height: 3em;
                width: 3em;
            }

            &:first-of-type
            {
                left: 0;
            }

            &:last-of-type
            {
                right: 0;
            }
        }
    }
`

const StyledGatsbyImage = styled(GatsbyImage)`
    height: 100%;
`

const StyledGatsbyPreview = styled(motion(GatsbyImage))`
    height: 100%;
    min-width: none;

    *
    {
        max-height: 100vh;
        max-width: 100vw;
    }
`

const variants = {
    initial: { opacity: 0, transition: { duration: 0.2 } },
    animate: {
        opacity: 1,
        transition: {
            duration: 0.2
        }
    }
}

export default function Gallery()
{
    const { gallery } = useStaticQuery(graphql`
    query {
        gallery: allFile(filter: {relativeDirectory: {}}) {
            edges {
                node {
                    id
                    base
                    childImageSharp {
                        gatsbyImageData(
                            placeholder: BLURRED
                            blurredOptions: {width: 1000}
                            quality: 100

                        )
                    }
                }
            }
        }
    }`)

    const [imageIndex, setImageIndex] = useState(1)
    const [isOpened, toggleOpened] = useReducer((prev) => !prev, false)
    const previewRef = useRef(null)

    function switchImage(direction)
    {
        if (imageIndex + direction < 0) setImageIndex(gallery.edges.length - 1)
        else if (imageIndex + direction === gallery.edges.length) setImageIndex(0)
        else setImageIndex((prev) => prev + direction)
    }

    function closePreview(e)
    {
        if (previewRef.current && !previewRef.current.contains(e.target)) toggleOpened()
    }

    return (
        <>
            {
                !isOpened && <StyledGalleryContainer>
                    <AnimatePresence exitBeforeEnter>

                        {gallery.edges.map(({ node }, index) =>
                        (
                            imageIndex === index && <StyledImageContainer onClick={toggleOpened} key={node.id} variants={variants} initial='initial' animate='animate' exit='initial'>
                                <StyledGatsbyImage image={node.childImageSharp.gatsbyImageData} alt={node.base} />
                                <hgroup>
                                    <h3>{labels[node.base.slice(0, -4)].name}</h3>
                                    <h6>by {labels[node.base.slice(0, -4)].author}</h6>
                                </hgroup>
                            </StyledImageContainer>
                        ))}

                        <ButtonGroup>
                            <button onClick={() => switchImage(-1)}><RiArrowLeftSFill /></button>
                            <button onClick={() => switchImage(1)}><RiArrowRightSFill /></button>
                        </ButtonGroup>
                    </AnimatePresence>

                </StyledGalleryContainer >}

            <AnimatePresence>
                {
                    isOpened &&
                    <StyledPreviewContainer variants={variants} initial='initial' animate='animate' exit='initial' onClick={closePreview}>
                        <div ref={previewRef}>

                            <button onClick={() => switchImage(-1)}><RiArrowLeftSFill /></button>
                            <StyledGatsbyPreview image={gallery.edges[imageIndex].node.childImageSharp.gatsbyImageData} alt={gallery.edges[imageIndex].node.base} height='90vh' />
                            <button onClick={() => switchImage(1)}><RiArrowRightSFill /></button>
                        </div>
                    </StyledPreviewContainer>
                }
            </AnimatePresence>
        </>
    )
}