import { createStore, combineReducers, compose } from 'redux'
import authReducer from './auth-reducer'
import newsReducer from './news-reducer'

const rootReducer = combineReducers({
    authReducer,
    newsReducer
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers())

export default store