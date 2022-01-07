import { AnimatePresence, motion, useAnimation } from "framer-motion";
import React from 'react'
import { useEffect, useReducer } from 'react'
import { RiShoppingCart2Line } from "react-icons/ri";
import styled from 'styled-components';
import ProductTile from './ProductTile';
import { products } from './products';
import Cart from "./Cart";

const ProductsPageDiv = styled(motion.div)`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: min-content repeat(3, 1fr);
    height: 100%;
    position: relative;
    padding: 0.8em;
    gap: 0.6em;

    > h1
    {
        display: flex;
        align-items: center;
        grid-row: 1;
        grid-column: 1/span 2;
        font-size: 1.2em;
    }

    @media(max-width: ${({ theme }) => theme.mobileScreen})
    {
        grid-template-columns: 1fr;
        grid-auto-rows: min-content;
        padding: 0.5em;

        > h1
        {
            grid-column: 1;
            font-size: 1.2em;
        }
    }
`

const CartButton = styled(motion.button)`
    display: flex;
    padding: 0.5em;
    font-size: 1em;
    background-color: ${({ theme }) => theme.colors.contrastBackground};
    color: ${({ theme }) => theme.colors.foreground};
    border-radius: 0.1em;
    grid-column: 3;
    position: relative;
    transition: background-color 0.3s ease-in-out;
    box-shadow: rgba(0, 0, 0, 0.01) 0px 2px 8px 0px;
    margin-left: auto;

    &:hover
    {
        background-color: ${({ theme }) => theme.colors.contrastBackgroundHover};
    }

    > span
    {
        position: absolute;
        display: grid;
        place-items: center;
        border-radius: 0.3em;
        font-size: 0.7em;
        bottom: -0.4em;
        right: 1.9em;
        min-width: 1.5em;
        height: 1.5em;
        padding-inline: 0.3em;
        background-color: ${({ theme }) => theme.colors.accent};
    }

    @media(max-width: ${({ theme }) => theme.mobileScreen})
    {
        position: fixed;
        top: initial;
        right: initial;
        left: 1em;
        bottom: 1em;

        > span
        {
            right: initial;
            left: 1.9em;
        }
    }
`

function cartReducer(cart, data)
{
    switch (data.action)
    {
        case cartActions.add: return add(data.productId)
        case cartActions.remove: return remove(data.productId)
    }

    function add(productId)
    {
        const previousContent = cart.find((product) => product.id === productId)

        if (previousContent)
        {
            const newContent = { ...previousContent }
            newContent.amount++
            const newCart = cart.filter((product) => product.id !== productId)

            return [...newCart, newContent].sort((a, b) => a.name.localeCompare(b.name))
        }
        else
        {
            const productDetails = products.find((product) => product.id === productId)
            const newContent = { ...productDetails, price: (Math.round(productDetails.price * 100) / 100).toFixed(2), amount: 1 }

            return [...cart, newContent].sort((a, b) => a.name.localeCompare(b.name))
        }
    }

    function remove(productId)
    {
        const previousContent = cart.find((product) => product.id === productId)

        if (previousContent)
        {
            if (previousContent.amount <= 1)
            {
                const newCart = cart.filter((product) => product.id !== productId)

                return newCart
            }
            else
            {
                const newContent = { ...previousContent, amount: --previousContent.amount }
                const newCart = cart.filter((product) => product.id !== productId)

                return [...newCart, newContent].sort((a, b) => a.name.localeCompare(b.name))
            }
        }
    }
}

const cartActions = {
    add: 'add',
    remove: 'remove'
}

export default function ProductsPage({ inView, variants })
{
    const animation = useAnimation()
    const [cart, dispatchCart] = useReducer(cartReducer, [], initializeCart)
    const [isCartOpened, toggleCart] = useReducer((prev) => !prev, false)

    useEffect(() =>
    {
        // API call IRL
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    useEffect(() =>
    {
        if (inView) animation.start("visible")
        else animation.start("hidden")
    }, [animation, inView])

    function initializeCart(cart)
    {
        // API call IRL
        if (typeof window !== 'undefined') 
        {
            return JSON.parse(localStorage.getItem('cart')) ?? cart
        }
    }

    function addToCart(productId)
    {
        dispatchCart({ action: cartActions.add, productId })
    }

    function removeFromCart(productId)
    {
        dispatchCart({ action: cartActions.remove, productId })
    }

    return (
        inView && <ProductsPageDiv variants={variants} initial='hidden' animate={animation}>
            {inView && <CartButton onClick={toggleCart}>
                <RiShoppingCart2Line />
                {cart.length != 0 && <span>{cart.length}</span>}
            </CartButton>}

            <h1>Products</h1>
            {products.map((product) =>
                <ProductTile key={product.id} product={product} addToCart={addToCart} />
            )}
            <AnimatePresence>

                {isCartOpened && <Cart close={toggleCart} cart={cart} addItem={addToCart} removeItem={removeFromCart} />}
            </AnimatePresence>

        </ProductsPageDiv>
    )
}
