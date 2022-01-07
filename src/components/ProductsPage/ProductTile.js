import { motion } from "framer-motion"
import React from 'react'
import { useState } from 'react'
import { RiAddLine, RiCheckLine } from "react-icons/ri"
import styled from "styled-components"

const ProductTileContainer = styled(motion.article)`
    background-color: ${({ theme }) => theme.colors.contrastBackground};

    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr auto;

    color: ${({ theme }) => theme.colors.foreground};
    font-size: clamp(0.7em, 2vw, 1.1em);

    > div:first-of-type
    {
        background-color: #bbbbbb;
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
    display: grid;
    grid-template-columns: 1fr min-content;
    grid-template-rows: 1fr 1fr;
    grid-template-areas:
    'name button'
    'price button';
    gap: 0.3em;
    padding: 0.5em;

    > h1
    {
        grid-area: name;
        display: flex;
        align-items: center;
        font-size: 0.9em;
    }

    > p
    {
        grid-area: price;
        display: flex;
        align-items: center;
        font-size: 0.5em;
        overflow: hidden;
    } 

    > button
    {
        grid-area: button;
        display: grid;
        place-items: center;
        margin-block: auto;
        color: ${({ theme }) => theme.colors.foreground};
        background-color: green;
        border-radius: 0.1em;
        font-size: 1.5em;

        > svg
        {
            color: white;
        }
    }
`

let timeout;

export default function ProductTile({ product, addToCart })
{
    const [itemWasAdded, setItemWasAdded] = useState(false)

    function itemAdded()
    {
        clearTimeout(timeout)
        setItemWasAdded(true)
        timeout = setTimeout(() =>
        {
            setItemWasAdded(false)
        }, 2000)

        addToCart(product.id)
    }

    return (
        <ProductTileContainer>
            <div />

            <TextContainer>
                <h1>{product.name}</h1>
                <p>{(Math.round(product.price * 100) / 100).toFixed(2)}$</p>
                <button onClick={itemAdded}>
                    {
                        itemWasAdded ?
                            <RiCheckLine /> :
                            <RiAddLine />
                    }
                </button>
            </TextContainer>
        </ProductTileContainer >
    )
}
