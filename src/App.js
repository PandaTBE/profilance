import React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import Header from './components/header/Header'
import styled from 'styled-components'
import Main from './components/main/Main'
import { Provider } from 'react-redux'
import store from './redux/redux-store'

const Container = styled.div`
margin: 0 auto;
padding-top: 20px;
max-width: 1180px;
`


const AppWrapper = () => {
  return (
    <div>
      <Header />
      <Container>
        <Switch>
          <Route exact path='/' render={() => <Redirect to='/main' />} />
          <Route path='/main' render={() => <Main />} />
          <Route path='*' render={() => <div>404 Error</div>} />
        </Switch>
      </Container>
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