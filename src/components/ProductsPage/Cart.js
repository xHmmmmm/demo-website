import React from 'react'
import { useState, useEffect, useRef } from 'react'
import styled from "styled-components"
import { motion } from 'framer-motion';
import CartItem from './CartItem';
import { RiCloseLine } from "react-icons/ri";

const CartWrapper = styled(motion.div)`
    position: fixed;
    background-color: #000000dd;
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;

    display: grid;
    place-items: center;
    z-index: 50;
    font-size: clamp(0.6em, 1.2vw, 1em);
`

const StyledCart = styled.div`
    display: grid;
    background-color: ${({ theme }) => theme.colors.contrastBackground};
    padding: 1em;
    width: 100%;
    gap: 0.5em;
    grid-template-columns: 1fr min-content;
    grid-auto-rows: min-content 1fr;

    > svg
    {
        height: 100%;
        width: auto;
        cursor: pointer;
    }
`

const ItemsList = styled.table`
    grid-column: 1/span 2;
`

const Header = styled.h1`
    display: flex;
`

const EmptyNotice = styled.p`
    text-align: center;
    grid-column: 1/span 2;
`

const CartTotal = styled.p`
    grid-column: 1/span 2;
    text-align: right;
`

const variants = {
    closed: { opacity: 0, transition: { duration: 0.2 } },
    open: { opacity: 1, transition: { duration: 0.2 } }
}

export default function Cart({ close, cart, addItem, removeItem })
{
    const cartRef = useRef(null)
    const [cartTotal, setCartTotal] = useState(0)

    useEffect(() =>
    {
        const total = cart.reduce((a, b) => (a + b['price'] * b['amount']), 0)
        setCartTotal((Math.round(total * 100) / 100).toFixed(2))
    }, [cart])

    function closeCart(e)
    {
        if (cartRef && !cartRef.current.contains(e.target)) close()
    }

    return (
        <CartWrapper onClick={closeCart} variants={variants} initial='closed' animate='open' exit='closed'>
            <StyledCart ref={cartRef}>
                <Header>Cart</Header>
                <RiCloseLine onClick={close} />
                <ItemsList>
                    <tbody>
                        {cart.map((item) =>
                            <CartItem key={item.id} item={item} addItem={addItem} removeItem={removeItem} />
                        )}
                    </tbody>
                </ItemsList>
                {cart.length > 0 && <CartTotal>{cartTotal}$</CartTotal>}
                {cart.length === 0 && <EmptyNotice>Cart is empty :/</EmptyNotice>}
            </StyledCart>
        </CartWrapper >
    )
}
