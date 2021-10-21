import React from 'react'
import { useState, useEffect, useContext, useRef, useMemo, useReducer } from 'react'
import Container from 'components/Container';
import Content from 'components/Content';
import Seo from 'components/seo';

export default function Settings(props)
{


    return (
        <Container pageId={1}>
            <Seo title='Settings' />
            <Content isPrimary sectionId='settings'>
                <h1>settings</h1>
            </Content>
        </Container>
    )
}
