import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import * as yup from 'yup'
import { addPost, search, setSearchArr } from '../../redux/news-reducer'
import { formatDate } from '../../utils/formatDate'
import Post from '../post/Post'


const Container = styled.div``
const Form = styled.form`
width: 250px;
display: flex;
flex-direction: column;
align-items: center;
margin-top: 10px;
`
const Text = styled.div`
font-size: 30px;
text-transform: uppercase;
`
const Button = styled.button`
margin-top: 10px;
display: block;
height: 50px;
width: 250px;
background-color: aqua;
border-radius: 5px;
border: 1px solid grey;
text-transform: uppercase;
color: rgb(50, 86, 205);
font-weight: 600;
font-size: 17px;
padding: 0 10px;
`
const Input = styled.input`
box-sizing: border-box;
border: ${props => props.error ? '1px solid red' : '1px solid grey'} ;
margin-bottom: 10px;
width: 100%;
height: 50px;
border-radius: 5px;
padding: 0 10px;
font-size: 15px;
`
const TextArea = styled.textarea`
font-size: 15px;
padding: 10px;
box-sizing: border-box;
border: ${props => props.error ? '1px solid red' : '1px solid grey'} ;
margin-bottom: 10px;
width: 100%;
height: 50px;
border-radius: 5px;
resize: vertical;  
`
const FormBtn = styled.button`
box-sizing: border-box;
border: 1px solid grey;
width: 100%;
height: 50px;
font-size: 17px;
border-radius: 5px;
`
const ErrorMessage = styled.div`
border-radius: 5px;
margin-bottom: 5px;
box-sizing: border-box;
text-align: center;
padding: 3px 5px;
width: 250px;
border: 1px solid red;
font-size: 15px;
background-color: rgba(240, 132, 132, 0.3);
`



const News = () => {
    const { confirmedNews, allNews, searchArr } = useSelector(state => state.newsReducer)
    const { userAuth, adminAuth } = useSelector(state => state.authReducer)
    const [createNews, setCreateNews] = useState(false)
    const [symbols, setSymbols] = useState()
    const date = formatDate(new Date())
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setSearchArr((userAuth || adminAuth)))
    }, [userAuth, adminAuth, confirmedNews, allNews])
    // const postsArr = allNews.map(item => <Post
    //     key={item.id}
    //     id={item.id}
    //     title={item.title}
    //     text={item.text}
    //     date={item.date} />)
    // const confirmedPostsArr = confirmedNews.map(item => <Post
    //     key={item.id}
    //     id={item.id}
    //     title={item.title}
    //     text={item.text}
    //     date={item.date} />)
    const narr = searchArr.map(item => <Post
        key={item.id}
        id={item.id}
        title={item.title}
        text={item.text}
        date={item.date} />)

    const addPostHandler = (value, { resetForm }) => {
        const post = {
            ...value,
            date,
            id: (new Date).getTime() + Math.random()
        }
        dispatch(addPost(post))
        resetForm({})
    }
    const serchHandler = (e) => {
        setSymbols(e.target.value)
        if (e.target.value) {
            dispatch(search(e.target.value.toLowerCase(), (userAuth || adminAuth)));
        } else {
            dispatch(search('', (userAuth || adminAuth)));
        }
    }
    const validationSchema = yup.object().shape({
        title: yup.string().required('Это обязательное поле'),
        text: yup.string().required('Это обязательное поле')
    })
    const formik = useFormik({
        initialValues: {
            title: '',
            text: ''
        },
        validationSchema,
        onSubmit: (value, { resetForm }) => addPostHandler(value, { resetForm })

    })
    return (
        <Container>
            <Text>Новости</Text>
            <div>
                <div>Посик</div>
                <input placeholder='Что вы ищите?' value={symbols} onChange={serchHandler} />
            </div>
            {(userAuth && !createNews) && <Button onClick={() => setCreateNews(true)}>Добавить запись</Button>}
            {(userAuth && createNews) && <Button onClick={() => setCreateNews(false)}>Закрыть форму</Button>}
            {(createNews && userAuth) &&

                <Form onSubmit={formik.handleSubmit}>
                    {formik.touched.title && formik.errors.title ? <ErrorMessage>{formik.errors.title}</ErrorMessage> : null}
                    <Input
                        name="title"
                        type="text"
                        error={formik.touched.title && formik.errors.title}
                        placeholder='Название'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.title}
                    />
                    {formik.touched.text && formik.errors.text ? <ErrorMessage>{formik.errors.text}</ErrorMessage> : null}
                    <TextArea
                        name="text"
                        type="text"
                        error={formik.touched.text && formik.errors.text}
                        placeholder='Текст'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.text}
                    />
                    <FormBtn type='submit'>Создать</FormBtn>
                </Form>

            }
            {/* { (userAuth || adminAuth) ? postsArr : null}
            { !(userAuth || adminAuth) ? confirmedPostsArr : null}
            <hr /> */}
            {narr}
        </Container>
    )
}

export default News