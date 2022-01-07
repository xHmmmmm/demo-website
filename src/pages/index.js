import * as React from "react"
import { useReducer, useEffect } from "react"
import Container from "components/Container"
import Content from 'components/Content';
import Seo from 'components/seo';
import InView from "react-intersection-observer"
import HomePage from 'components/HomePage/HomePage';
import GalleryPage from "components/GalleryPage/GalleryPage"
import { scrollToSection, sections } from "sections"
import Notice from 'components/Notice';
import { AnimatePresence } from "framer-motion"
import { useView } from 'components/contexts/ViewContext';
import NewsPage from 'components/NewsPage/NewsPage';
import ProductsPage from 'components/ProductsPage/ProductsPage';

let visibleSectionId = sections[0].id

const opacityAppear =
{
    visible:
    {
        opacity: 1,
        transition: { duration: 0.5 },
    },
    hidden:
    {
        opacity: 0
    }
}

export default function IndexPage()
{
    const { isMobile } = useView()
    const setVisibleSectionId = (e) => { visibleSectionId = e.target.id }

    const [alreadyVisited, setAlreadyVisited] = useReducer(() =>
    {
        localStorage.setItem('alreadyVisited', JSON.stringify(true))
        return true
    }, false, initializeArrowsNotice)

    useEffect(() =>
    {
        alreadyVisited && setAlreadyVisited()
    }, [])

    useEffect(() =>
    {
        document.addEventListener('keyup', scroll)
        return () => document.removeEventListener('keyup', scroll)
    }, [])

    useEffect(() =>
    {
        document.addEventListener('keyup', scroll)
        return () => document.removeEventListener('keyup', scroll)
    }, [])

    function initializeArrowsNotice(initializer)
    {
        if (typeof window !== 'undefined') 
        {
            return JSON.parse(localStorage.getItem('alreadyVisited')) ?? initializer
        }
    }

    function scroll(e)
    {
        if (e.keyCode === 38 || e.keyCode === 40)
        {
            setAlreadyVisited()
            let nextIndex = sections.findIndex((section) => section.id === visibleSectionId)

            if (e.keyCode === 38) nextIndex--
            if (e.keyCode === 40) nextIndex++
            nextIndex = Math.min(Math.max(nextIndex, 0), sections.length - 1)

            scrollToSection(sections[nextIndex].id)
        }
    }

    return (
        <Container pageId={0}>
            <Seo title='Home' />

            <AnimatePresence>
                {(!isMobile && !alreadyVisited) && <Notice hide={() => setAlreadyVisited(true)} />}
            </AnimatePresence>

            <InView threshold={0.01} onChange={(inView, e) => inView && setVisibleSectionId(e)}>
                {({ ref, inView }) => (
                    <Content ref={ref} sectionId={sections[0].id}>
                        <HomePage inView={inView} variants={opacityAppear} />
                    </Content>
                )}
            </InView>
            <InView threshold={0.01} onChange={(inView, e) => inView && setVisibleSectionId(e)}>
                {({ ref, inView }) => (
                    <Content ref={ref} sectionId={sections[1].id}>
                        <GalleryPage inView={inView} variants={opacityAppear} />
                    </Content>
                )}
            </InView>
            <InView threshold={0.01} onChange={(inView, e) => inView && setVisibleSectionId(e)}>
                {({ ref, inView }) => (
                    <Content ref={ref} sectionId={sections[2].id}>
                        <NewsPage inView={inView} variants={opacityAppear} />

                    </Content>
                )}
            </InView>
            <InView threshold={0.01} onChange={(inView, e) => inView && setVisibleSectionId(e)}>
                {({ ref, inView }) => (
                    <Content ref={ref} sectionId={sections[3].id}>
                        <ProductsPage inView={inView} variants={opacityAppear} />

                    </Content>
                )}
            </InView>
        </Container>
    )
}