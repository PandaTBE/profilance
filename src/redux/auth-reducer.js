
export const LOGIN = {
    user: {
        login: 'user',
        password: 'user'
    },
    admin: {
        login: 'admin',
        password: 'admin'
    }
}

const initialState = {
    user: {},
    admin: {},
    userAuth: false,
    adminAuth: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state
    }
}



export default authReducer