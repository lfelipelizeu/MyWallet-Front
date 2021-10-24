import styled from 'styled-components';
import GlobalStyle from "../styles/globalStyle.js";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SignUp from './SignUp.js';
import SignIn from './SignIn.js';

export default function App() {
  return (
    <>
      <GlobalStyle />
      <Container>
        <BrowserRouter>
          <Switch>
            <Route path='/signup' component={SignUp} exact />
            <Route path='/signin' component={SignIn} exact />
          </Switch>
        </BrowserRouter>
      </Container>
    </>
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