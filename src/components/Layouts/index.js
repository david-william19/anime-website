import styled from '@emotion/styled'
import React from 'react'
import Navbar from '../Navbar'

const Layout = ({ children }) => {
    return (
        <Container>
            <Navbar />
            {children}
        </Container>
    )
}

const Container = styled.div`
    height: 100%;
        @media (min-width: 768px) {
            display: flex;
        }
`

export default Layout