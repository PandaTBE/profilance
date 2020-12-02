import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const Container = styled.div`
display: flex;
justify-content: center;
`
const EmptyMessage = styled.div`
font-size: 30px;
`

const News = () => {
    const { confirmedNews } = useSelector(state => state.newsReducer)
    return (
        <Container>
            {!confirmedNews.length > 0 ? <EmptyMessage>Пока нет никаких новостей :(</EmptyMessage> : <div>news</div>}
        </Container>
    )
}

export default News