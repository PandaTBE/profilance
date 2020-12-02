import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { logout } from '../../redux/auth-reducer'
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
    const { adminAuth, userAuth } = useSelector(state => state.authReducer)
    const dispatch = useDispatch()
    const logoutHandler = () => {
        dispatch(logout())
    }
    return (
        <Wrapper>
            <Container>
                <NavLink to='/main' className={s.link} activeClassName={s.link__active}>Главная</NavLink>
                <NavLink to='/news' className={s.link} activeClassName={s.link__active}>Новости</NavLink>
                <div>
                    {(adminAuth || userAuth)
                        ?
                        <LogInLogOut onClick={() => logoutHandler()}>Выход</LogInLogOut>
                        :
                        <LogInLogOut onClick={() => setModalActive(true)} >Вход</LogInLogOut>
                    }
                </div>


            </Container>
        </Wrapper>
    )
}

export default Header