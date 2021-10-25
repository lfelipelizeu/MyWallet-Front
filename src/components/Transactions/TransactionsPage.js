import styled from 'styled-components';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { RiLogoutBoxRLine as LogoutIcon } from 'react-icons/ri';
import UserContext from '../../contexts/UserContext.js';
import TransactionsList from './TransactionsList.js';
import NewIncome from './NewIncome.js';
import NewOutcome from './NewOutcome.js';

export default function TransactionsPage () {
    const { user } = useContext(UserContext);
    const history = useHistory();

    function logout () {
        localStorage.clear();
        history.push('/signin');
    }

    return (
        <Container>
            <PageHeader>
                <HelloUser>Olá, {user?.name.split(' ')[0]}</HelloUser>
                <LogoutIcon onClick={() => logout()} style={{ color: '#ffffff', fontSize: '25px' }} />
            </PageHeader>
            <TransactionsList />
            <ButtonsBox>
                <NewIncome />
                <NewOutcome />
            </ButtonsBox>
        </Container>
    );
}

const Container = styled.div`
    width: 90%;
    height: 100%;
    padding: 25px 0 16px;
`;

const PageHeader = styled.header`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 22px;
`;

const HelloUser = styled.h2`
    color: #ffffff;
    font-size: 26px;
    font-weight: 700;
`;

const ButtonsBox = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`;