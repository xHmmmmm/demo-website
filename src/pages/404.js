import * as React from "react"

import Seo from "components/seo"
import Typewriter from 'typewriter-effect';
import Container from "../components/Container";
import Content from 'components/Content';
import { Link } from "gatsby";
import styled from 'styled-components';
import { motion } from "framer-motion";
import { RiArrowLeftSFill } from "react-icons/ri";

const StyledDiv = styled(motion.div)`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-block: auto;
    padding: 1em;
`

const StyledLink = styled(motion(Link))`
    display: flex;
    font-size: 0.8em;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.foreground};
    padding: 0.5em 0.9em 0.5em 0.3em;
    background-color: ${({ theme }) => theme.colors.navigation};
    margin-top: 1.5em;
    border-radius: 0.2rem;
    align-items: center;

    > svg
    {
        height: 1.5em;
        width: 1.5em;
    }
`

const NotFoundPage = () => (
    <Container>
        <Seo title="404: Not found" />
        <Content>
            <StyledDiv>
                <h1 style={{ fontFamily: 'Roboto Mono', fontSize: '0.5em' }}>

                    <Typewriter options={{ cursor: '', cursorClassName: 'cursor' }} onInit={(typewriter) => { typewriter.typeString('Error 404').pauseFor(2000).deleteAll().typeString('Requested path not found').start() }} />
                </h1>
                <StyledLink to='/' whileHover={{ scale: 1.1 }}>
                    <RiArrowLeftSFill />
                    HOME
                </StyledLink>
            </StyledDiv>
        </Content>
    </Container>
)

export default NotFoundPage
