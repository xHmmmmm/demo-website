import React from 'react'
import { RiAddLine, RiSubtractLine } from "react-icons/ri"
import styled from "styled-components"

const StyledCartItem = styled.tr`
    grid-column: 1/span 2;
    align-items: center;

    > td
    {
        padding-inline: 0.3em;
        padding-bottom: 0.5em;
    }

    > td > button
    {
        display: flex;
        font-size: 1.3em;
        padding: 0.2em;
        color: white;
        transition: background-color 0.3s ease-in-out;
    }

    > td:first-of-type
    {
        padding-inline: 0 0.3em;
    }

    > td:last-of-type
    {
        padding-inline: 0.3em 0;
    }

    
    @media(max-width: ${({ theme }) => theme.mobileScreen})
    {
        font-size: 0.8em;
        margin-bottom: 0.5em;

        > td > button
        {
            font-size: 1.8em;
        }
    }
`

const RemoveButtonColumn = styled.td`
    width: 0;
    
    > button
    {
        background-color: #cc0000;

        @media(hover)
        {
            &:hover
            {
                background-color: #a10000;
            }
        }
    }
`

const AddButtonColumn = styled.td`
    width: 0;
    
    > button
    {
        background-color: #2e9e2e;

        @media(hover)
        {
            &:hover
            {
                background-color: #288228;
            }
        }
    }
`

const Id = styled.td`
    width: 5%;
`

const Name = styled.td`
    width: 90%;
`

const Price = styled.td`
    text-align: center;
`

const Amount = styled.td`
    text-align: center;
`

const Sum = styled.td`
    text-align: right;
`

export default function CartItem({ item, addItem, removeItem })
{


    return (
        <StyledCartItem>
            <Id>{item.id}</Id>
            <Name>{item.name}</Name>
            <Price>{item.price}$</Price>
            <RemoveButtonColumn>
                <button onClick={() => removeItem(item.id)}>
                    <RiSubtractLine />
                </button>
            </RemoveButtonColumn>
            <Amount>{item.amount}</Amount>
            <AddButtonColumn>
                <button onClick={() => addItem(item.id)}>
                    <RiAddLine />
                </button>
            </AddButtonColumn>
            <Sum>{(Math.round((item.price * item.amount) * 100) / 100).toFixed(2)}$</Sum>
        </StyledCartItem >
    )
}
