import { createStore, combineReducers } from 'redux'
import authReducer from './auth-reducer'

const rootReducer = combineReducers({
    authReducer
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers())

export default store