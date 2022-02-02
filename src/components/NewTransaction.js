import styled from 'styled-components';
import { useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { postNewTransaction } from '../services/mywallet.js';
import { Input } from '../styles/inputStyle.js';
import UserContext from '../contexts/UserContext.js';
import { ErrorAlert } from './SweetAlerts.js';

export default function NewTransaction () {
    const { user } = useContext(UserContext);
    const { type } = useParams();
    const [value, setValue] = useState('');
    const [description, setDescription] = useState('');
    const history = useHistory();

    if (!user) return history.push('/signin');

    async function addNewTransaction (event) {
        event.preventDefault();

        const body = {
            description,
            value: Number(value.replace(',','.')),
            type
        };

        try {
            await postNewTransaction(body, user.token);

            history.push('/');
        } catch (error) {
            const errorStatus = error.response?.status;

            if (errorStatus === 422) return ErrorAlert('Dados inválidos!');
            if (errorStatus === 401) {
                ErrorAlert('Você não está logado!');
                return history.push('/signin');
            }
            if (errorStatus === 500) return ErrorAlert('Erro desconhecido! Tente novamente');
            if (!errorStatus) return ErrorAlert('Servidor offline');
        }
    }

    return (
        <Container>
            <PageTitle>Nova {type === 'income' ? 'entrada' : 'saída'}</PageTitle>
            <Form onSubmit={addNewTransaction}>
                <Input type="text" placeholder="Valor" onChange={(event) => setValue(event.target.value)} required />
                <Input type="text" placeholder="Descrição" onChange={(event) => setDescription(event.target.value)} required />
                <Button>Salvar {type === 'income' ? 'entrada' : 'saída'}</Button>
            </Form>
        </Container>
    )
}

const Container = styled.div`
    width: 90%;
    height: 100%;
    padding: 25px 0 16px;
`;

const PageTitle = styled.h2`
    color: #ffffff;
    font-size: 26px;
    font-weight: 700;
    margin-bottom: 40px;
`;

const Form = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Button = styled.button`
    width: 100%;
    height: 46px;
    background-color: #A328D6;
    border: none;
    border-radius: 5px;
    color: #FFFFFF;
    font-weight: 700;
    font-size: 20px;
`;