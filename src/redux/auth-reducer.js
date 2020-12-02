
const USERS = {
    user: {
        username: 'user',
        password: 'user'
    },
    admin: {
        username: 'admin',
        password: 'admin'
    }
}
const LOGIN = 'auth-reducer/LOGIN'
const LOGOUT = 'auth-reducer/LOGOUT'

const initialState = {
    user: {},
    admin: {},
    userAuth: false,
    adminAuth: false,
    error: ''
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            if (action.data.username === USERS.admin.username && action.data.password === USERS.admin.password) {
                return {
                    ...state,
                    admin: { ...action.data },
                    adminAuth: true,
                    error: ''
                }
            } else if (action.data.username === USERS.user.username && action.data.password === USERS.user.password) {
                return {
                    ...state,
                    user: { ...action.data },
                    userAuth: true,
                    error: ''
                }
            } else {
                const message = 'Неверный логин или пароль'
                return {
                    ...state,
                    error: message

                }
            }
        case LOGOUT:
            return {
                ...state,
                user: {},
                admin: {},
                userAuth: false,
                adminAuth: false
            }

        default:
            return state
    }
}

export const login = (data) => ({ type: LOGIN, data })
export const logout = () => ({ type: LOGOUT })


export default authReducer