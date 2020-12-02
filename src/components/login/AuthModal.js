import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import * as yup from 'yup'
import { login } from '../../redux/auth-reducer'
const Container = styled.div`
transition: 0.5s all;
height: 100vh;
width: 100vw;
background-color: rgba(0,0,0,0.4);
position: fixed;
top: 0;
left: 0;
display: flex;;
justify-content: center;
align-items: center;
opacity: ${props => props.modalActive ? '1' : '0'};
pointer-events: ${props => props.modalActive ? 'all' : 'none'};
`
const Content = styled.div`
transition: 0.5s all;
padding: 20px;
border-radius: 12px;
background-color: #ffffff;
transform: ${props => props.modalActive ? 'scale(1)' : 'scale(0.5)'};
`
const Form = styled.form`
display: flex;
flex-direction: column;
align-items: center;
margin-top: 10px;
`
const Input = styled.input`
box-sizing: border-box; 
width: 320px;
height: 50px;
border-radius: 5px;
margin-bottom: 10px;
padding: 0 10px;
font-size: 20px;
border: ${props => props.error ? '1px solid red' : '1px solid grey'};
`
const Button = styled.button`
box-sizing: border-box;
width: 320px;
height: 50px;
border-radius: 5px;
padding: 0 10px;
font-size: 20px;
border: 1px solid grey;
`
const Text = styled.div`
text-align: center;
font-size: 20px;
font-weight: 700;
`
const ErrorMessage = styled.div`
border-radius: 5px;
margin-bottom: 5px;
box-sizing: border-box;
text-align: center;
padding: 3px 5px;
width: 320px;
border: 1px solid red;
font-size: 15px;
background-color: rgba(240, 132, 132, 0.3);
`
const AuthModal = ({ modalActive, setModalActive }) => {
    const { error, adminAuth, userAuth } = useSelector(state => state.authReducer)
    const dispatch = useDispatch()
    useEffect(() => {
        if (adminAuth || userAuth) {
            setModalActive(false)
        }
    }, [adminAuth, userAuth])
    const loginFormHandler = (value, { resetForm }) => {
        dispatch(login(value))
        resetForm({})
    }
    const validationSchema = yup.object().shape({
        username: yup.string().required('Это обязательное поле'),
        password: yup.string().required('Это обязательное поле')
    })
    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema,
        onSubmit: (value, { resetForm }) => loginFormHandler(value, { resetForm })

    })
    return (
        <Container modalActive={modalActive} onClick={() => setModalActive(false)}>
            <Content modalActive={modalActive} onClick={(e) => e.stopPropagation()}>
                <Text>Авторизация</Text>
                {error ? <div>{error}</div> : null}
                <Form onSubmit={formik.handleSubmit}>
                    {formik.touched.username && formik.errors.username ? <ErrorMessage>{formik.errors.username}</ErrorMessage> : null}
                    <Input
                        name="username"
                        type="text"
                        placeholder='Введите свой логин'
                        error={formik.touched.password && formik.errors.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.username}
                    />
                    {formik.touched.password && formik.errors.password ? <ErrorMessage>{formik.errors.password}</ErrorMessage> : null}
                    <Input
                        name="password"
                        type="password"
                        error={formik.touched.password && formik.errors.password}
                        placeholder='Введите свой пароль'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                    />

                    <Button type='submit'>Войти</Button>
                </Form>
            </Content>
        </Container>
    )
}

export default AuthModal