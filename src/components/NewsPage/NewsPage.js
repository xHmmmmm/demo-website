import { AnimatePresence, motion, useAnimation } from "framer-motion";
import React from 'react'
import { useState, useEffect, useReducer } from 'react'
import styled from 'styled-components';
import BigNewsTile from './BigNewsTile';
import NewsTile from './NewsTile';
import { useView } from 'components/contexts/ViewContext';
import NewsPreview from "./NewsPreview";
import { mainNews, news } from "./news";

const NewsPageDiv = styled(motion.div)`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: 1fr;
    gap: 0.5em;
    overflow: hidden;

    width: 100%;
    height: 100%;
    max-height: 100vh;
    padding: 0.5em 0.8em;

    @media(max-width: ${({ theme }) => theme.narrowScreen})
    {
        grid-template-columns: repeat(3, 1fr);
        grid-auto-rows: 1fr;
    }

    @media(max-width: ${({ theme }) => theme.mobileScreen})
    {
        grid-template-columns: repeat(2, 1fr);
        grid-auto-rows: 1fr;
        padding: 0.5em;
        gap: 0.5em;
    }
`

export default function NewsPage({ inView, variants })
{
    const animation = useAnimation()
    const [previewTitle, setPreviewTitle] = useState('s')
    const [previewContent, setPreviewContent] = useState('s')
    const [isPreviewVisible, togglePreview] = useReducer((prev) => !prev, false)

    const { isMobile } = useView()

    useEffect(() =>
    {
        if (inView) animation.start("visible")
        else animation.start("hidden")
    }, [animation, inView])

    function openPreview(title, content)
    {
        setPreviewTitle(title)
        setPreviewContent(content)
        togglePreview()
    }

    return (
        inView && <NewsPageDiv variants={variants} initial='hidden' animate={animation}>
            <BigNewsTile news={mainNews} open={openPreview} />
            <NewsTile news={news} open={openPreview} />
            <NewsTile news={news} open={openPreview} />
            <NewsTile news={news} open={openPreview} />

            {!isMobile &&
                <>
                    <NewsTile news={news} open={openPreview} />
                    <NewsTile news={news} open={openPreview} />
                    <NewsTile news={news} open={openPreview} />
                    <NewsTile news={news} open={openPreview} />
                    <NewsTile news={news} open={openPreview} />
                </>
            }
            <AnimatePresence>

                {isPreviewVisible && <NewsPreview title={previewTitle} content={previewContent} close={togglePreview} />}
            </AnimatePresence>
        </NewsPageDiv>
    )
}
