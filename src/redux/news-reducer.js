const ADD_POST = 'news-reducer/ADD_POST'
const DELETE_POST = 'news-reducer/DELETE_POST'
const CONFIRM_REDUCER = 'news-reducer/CONFIRM_REDUCER'
const SEARCH = 'news-reducer/SEARCH'
const SET_SEARCH_ARR = 'news-reducer/SET_SEARCH_ARR'

const searchFunction = (arr, searchSymbols) => {
    if (searchSymbols.length === 0) {
        return arr
    }
    return arr.filter(item => {
        return item.title.toLowerCase().includes(searchSymbols)
            || item.text.toLowerCase().includes(searchSymbols)
            || item.date.toLowerCase().includes(searchSymbols)
    })
}

const initialState = {
    confirmedNews: [
        {
            title: "Название",
            text: "Начальный, одобренный пост",
            date: "02-12-2020",
            id: 1
        }
    ],
    allNews: [
        {
            title: "Название",
            text: "Начальный, одобренный пост",
            date: "02-12-2020",
            id: 1
        }
    ],
    searchArr: []
}

const newsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                allNews: [...state.allNews, action.data]
            }
        case DELETE_POST: {
            const index = state.allNews.findIndex(item => item.id === action.id)
            const newArr = [...state.allNews.slice(0, index), ...state.allNews.slice(index + 1)]
            const index2 = state.confirmedNews.findIndex(item => item.id === action.id)

            if (index2 >= 0) {
                const newArr2 = [...state.confirmedNews.slice(0, index), ...state.confirmedNews.slice(index + 1)]
                return {
                    ...state,
                    allNews: newArr,
                    confirmedNews: newArr2
                }
            }

            return {
                ...state,
                allNews: newArr
            }
        }
        case CONFIRM_REDUCER: {
            const index = state.allNews.findIndex(item => item.id === action.id)
            const confirmedPost = state.allNews[index]
            return {
                ...state,
                confirmedNews: [...state.confirmedNews, confirmedPost]
            }
        }
        case SEARCH: {
            let modifiedArr = []
            if (action.auth) {
                if (action.symbols) {
                    modifiedArr = searchFunction(state.allNews, action.symbols)
                } else {
                    modifiedArr = Object.create(state.allNews)
                }
            } else {
                if (action.symbols) {
                    modifiedArr = searchFunction(state.confirmedNews, action.symbols)
                } else {
                    modifiedArr = Object.create(state.confirmedNews)
                }
            }

            return {
                ...state,
                searchArr: modifiedArr
            }
        }
        case SET_SEARCH_ARR: {
            let arr = []
            if (action.auth) {
                arr = Object.create(state.allNews)
            } else {
                arr = Object.create(state.confirmedNews)
            }
            return {
                ...state,
                searchArr: arr

            }
        }
        default:
            return state
    }
}
export const addPost = (data) => ({ type: ADD_POST, data })
export const deletePost = (id) => ({ type: DELETE_POST, id })
export const confirmPost = (id) => ({ type: CONFIRM_REDUCER, id })
export const search = (symbols, auth) => ({ type: SEARCH, symbols, auth })
export const setSearchArr = (auth) => ({ type: SET_SEARCH_ARR, auth })
export default newsReducer