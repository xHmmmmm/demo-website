import { motion } from "framer-motion"
import React from 'react'
import styled from "styled-components"
import { useView } from '../contexts/ViewContext';

const NewsTileContainer = styled(motion.article)`
    background-color: ${({ theme }) => theme.colors.contrastBackground};

    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr auto;

    color: ${({ theme }) => theme.colors.foreground};
    font-size: clamp(0.7em, 2vw, 1.1em);
    border-radius: 0.1em;

    > div:first-of-type
    {
        background-color: #bbbbbb;
        border-radius: inherit;
    }

    @media(max-width: ${({ theme }) => theme.narrowScreen})
    {
        font-size: clamp(0.6em, 1.2vw, 1.2em);
    }

    @media(max-width: ${({ theme }) => theme.mobileScreen})
    {
        grid-column: 1 / span 2;

        grid-template-columns: 0.3fr 0.7fr;
        grid-template-rows: 1fr;

        font-size: clamp(0.75em, 1.2vw, 1.2em);
    }
   
    @media(min-aspect-ratio: 2/1)
    {
        grid-template-columns: 0.4fr 0.6fr;
        grid-template-rows: 1fr;
    }
`

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.3em;
    padding: 0.5em;

    > h1
    {
        font-size: 0.9em;
    }

    > p
    {
        font-size: 0.5em;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        line-clamp: 3; 
        -webkit-box-orient: vertical;
    } 

    > button
    {
        margin-left: auto;
        color: ${({ theme }) => theme.colors.foreground};
        background-color: transparent;
        font-size: 0.5em;
        font-weight: 600;
        margin-top: 0.3em;
    }
`

export default function NewsTile({ news, open })
{
    const { isMobile } = useView()

    return (
        <NewsTileContainer onClick={() => isMobile && open(news.title, news.content)}>
            <div />

            <TextContainer>

                <h1>{news.title}</h1>
                <p>{news.content}</p>
                {!isMobile && <button onClick={() => open(news.title, news.content)}>Read more</button>}
            </TextContainer>
        </NewsTileContainer >
    )
}
