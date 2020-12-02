import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import s from './header.module.css'
const Wrapper = styled.div`
background-color: aqua;
height: 80px;
`
const Container = styled.div`
margin: 0 auto;
height: 100%;
max-width: 1180px;
display: flex;
justify-content: space-around;
align-items: center;
`
const LogInLogOut = styled.div`
color: #ffffff;
text-transform: uppercase;
text-decoration: none;
font-size: 20px;
font-weight: 700;
transition: 0.5s all;
cursor: pointer;
&:hover {
    color: rgb(50, 86, 205);
}
`

const Header = ({ setModalActive }) => {
    return (
        <Wrapper>
            <Container>
                <NavLink to='/main' className={s.link} activeClassName={s.link__active}>Главная</NavLink>
                <NavLink to='/news' className={s.link} activeClassName={s.link__active}>Новости</NavLink>
                <LogInLogOut onClick={() => setModalActive(true)} >Вход</LogInLogOut>
            </Container>
        </Wrapper>
    )
}

export default Header