import React from 'react'
import styled from "styled-components"
import { useView } from 'components/contexts/ViewContext';

const BigNewsTileContainer = styled.article`
    grid-row: 1 / span 2;
    grid-column: 1 / span 2;
    background-color: ${({ theme }) => theme.colors.contrastBackground};

    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 0.3fr;

    color: ${({ theme }) => theme.colors.foreground};
    font-size: clamp(0.8em, 1vw, 1.2em);

    > div:first-of-type
    {
        background-color:  ${({ theme }) => theme.colors.accent};
    }

    @media(max-width: ${({ theme }) => theme.mobileScreen})
    {
        font-size: clamp(0.7em, 4vw, 1.5em);
        grid-template-columns: 0.4fr 0.6fr;
        grid-template-rows: 1fr;
    }
    
    @media(min-aspect-ratio: 2/1)
    {
        grid-template-columns: 0.5fr 0.5fr;
        grid-template-rows: 1fr;
    }
`

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.3em;
    padding: 0.5em;

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

    @media(max-width: ${({ theme }) => theme.mobileScreen})
    {
        > p
        {
            font-size: 0.6em;
        }
    }

    @media(min-aspect-ratio: 2/1)
    {
        padding: 0.8em;

        > p
        {
            font-size: 1.1em;
        }
    }
`

export default function BigNewsTile({ open, news })
{
    const { isMobile } = useView()

    return (
        <BigNewsTileContainer onClick={() => isMobile && open(news.title, news.content)}>
            <div>

            </div>

            <TextContainer>

                <h1>{news.title}</h1>
                <p>{news.content}</p>
                {!isMobile && <button onClick={() => open(news.title, news.content)}>Read more</button>}
            </TextContainer>
        </BigNewsTileContainer>
    )
}
