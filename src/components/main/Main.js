import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const Container = styled.div`
display: flex;
justify-content: center;
`
const Text = styled.div`
font-size: 30px;
`

const Main = () => {
    const { userAuth, adminAuth, user, admin } = useSelector(state => state.authReducer)
    return (
        <Container>
            {!(userAuth || adminAuth) && <Text>Привет, гость!</Text>}
            {userAuth && <Text>Привет, {user.username}</Text>}
            {adminAuth && <Text>Привет, {admin.username}</Text>}
        </Container>
    )
}

export default Main