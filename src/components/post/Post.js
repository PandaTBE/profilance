import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { confirmPost, deletePost } from '../../redux/news-reducer'
const PostWrapper = styled.div`
margin-top: 10px;
width: 100%;
min-height: 50px;
border: 1px solid grey;
border-radius: 5px;
padding: 10px;
`
const Title = styled.div`
text-transform: uppercase;
font-size: 20px;
font-weight: 600;
`
const TitleWrapper = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
`
const Post = ({ title, text, date, id }) => {
    const { adminAuth } = useSelector(state => state.authReducer)
    const { confirmedNews } = useSelector(state => state.newsReducer)
    const dispatch = useDispatch()
    const delteHandler = () => {
        dispatch(deletePost(id))
    }
    const confirmHandler = () => {
        dispatch(confirmPost(id))
    }
    const confirmed = confirmedNews.findIndex(item => item.id === id)
    return (
        <PostWrapper>
            <TitleWrapper>
                <Title>{title}</Title>
                <div>{date}</div>
            </TitleWrapper>
            <div>{text}</div>
            {adminAuth &&
                <div>
                    <button onClick={delteHandler}>Удалить пост</button>
                    {confirmed < 0 ? <button onClick={confirmHandler}>Одобрить</button> : null}

                </div>}
        </PostWrapper>
    )
}

export default Post