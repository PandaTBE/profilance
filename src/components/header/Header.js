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

const Header = () => {
    return (
        <Wrapper>
            <Container>
                <NavLink to='/main' className={s.link} activeClassName={s.link__active}>Главная</NavLink>
                <NavLink to='/news' className={s.link} activeClassName={s.link__active}>Новости</NavLink>
                <NavLink to='/auth' className={s.link} activeClassName={s.link__active}>Вход</NavLink>
            </Container>
        </Wrapper>
    )
}

export default Header