import React from 'react'
import { useSelector } from 'react-redux'

const Main = () => {
    const { userAuth, adminAuth } = useSelector(state => state.authReducer)
    return (
        <div>
            {!(userAuth || adminAuth) && <div>Привет, гость!</div>}
            {userAuth && <div>Привет, User!</div>}
            {adminAuth && <div>Привет, Admin!</div>}
        </div>
    )
}

export default Main