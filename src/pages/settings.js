import React from 'react'
import { useState, useEffect, useContext, useRef, useMemo, useReducer } from 'react'
import Container from 'components/Container';
import Content from 'components/Content';

export default function Settings(props)
{


    return (
        <Container pageId={1}>
            <Content isPrimary sectionId='settings'>
                <h1>settings</h1>
            </Content>
        </Container>
    )
}
