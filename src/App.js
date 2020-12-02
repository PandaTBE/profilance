import React, { useState } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import Header from './components/header/Header'
import styled from 'styled-components'
import Main from './components/main/Main'
import { Provider } from 'react-redux'
import store from './redux/redux-store'
import News from './components/News/News'
import AuthModal from './components/login/AuthModal'

const Container = styled.div`
margin: 0 auto;
padding-top: 20px;
max-width: 1180px;
`


const AppWrapper = () => {

  const [modalActive, setModalActive] = useState(false)
  return (
    <div>
      <Header setModalActive={setModalActive} />
      <Container>
        <Switch>
          <Route exact path='/' render={() => <Redirect to='/main' />} />
          <Route path='/main' render={() => <Main />} />
          <Route path='/news' render={() => <News />} />
          <Route path='*' render={() => <div>404 Error</div>} />
        </Switch>
      </Container>
      <AuthModal modalActive={modalActive} setModalActive={setModalActive} />
    </div>
  );
}

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppWrapper />
      </Provider>
    </BrowserRouter>
  )
}

export default App;