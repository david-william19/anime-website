import styled from '@emotion/styled'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaBook, FaHome } from "react-icons/fa";

function Navbar() {
    let activeStyle = {
        color: "#DF8E52",
    };
    let inactiveStyle = {
        color: "#F3D184"
    }

    return (
        <NavbarWrapper>
            <Nav>
                <NavLink to={'/'} style={({ isActive }) =>
                    isActive ? activeStyle : inactiveStyle
                }>
                    <FaHome size={'26px'} />
                    <Paragraph>Home</Paragraph>
                </NavLink>
            </Nav>
            <Nav>
                <NavLink to={'/anime-collection'} style={({ isActive }) =>
                    isActive ? activeStyle : inactiveStyle
                }>
                    <FaBook size={'24px'} />
                    <Paragraph>Collection</Paragraph>
                </NavLink>
            </Nav>
        </NavbarWrapper>
    )
}

const NavbarWrapper = styled.ul`
    background-color: #3D3B38;
    display: flex;
    bottom: 0;
    width: 100%;
    padding: 15px 0;
    justify-content: center;
    align-items: end;
    gap: 50px;
    position: -webkit-sticky;
    position: sticky;
    bottom: 0;
    position: absolute;
    @media (min-width: 768px) {
        position: relative;
        width: 103px;
        gap: 30px;
        flex-direction: column;
        align-items: center;
        position: relative;
    }
`
const Paragraph = styled.p`
    margin-top: 5px;
    display: block;
    font-size: 13px;
`

const Nav = styled.li`
    text-align: center;
    list-style-type: none;
    a {
        text-decoration: none;
    }
`

export default Navbar