import styled from 'styled-components';
import { useState } from 'react';
import GlobalStyle from "../styles/globalStyle.js";
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import UserContext from '../contexts/UserContext.js';
import SignUp from './SignUp.js';
import SignIn from './SignIn.js';
import TransactionsPage from './Transactions/TransactionsPage.js';
import NewTransaction from './NewTransaction.js';

export default function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <GlobalStyle />
      <Container>
        <BrowserRouter>
          <Switch>
            <Route path='/signup' component={SignUp} exact />
            <Route path='/signin' component={SignIn} exact />
            <Route path='/' component={TransactionsPage} exact />
            <Route path='/newtransaction/:type' component={NewTransaction} exact />
            <Redirect to='/signin' />
          </Switch>
        </BrowserRouter>
      </Container>
    </UserContext.Provider>
  );
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;