import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { SignPage, Title, SignForm, SubmitButton } from '../styles/signStyles.js';
import { Input } from '../styles/inputStyle.js';
import { signUp } from '../services/mywallet.js'; 
import { ErrorAlert, SuccessAlert } from './SweetAlerts.js';

export default function SignUp () {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const history = useHistory();

    async function signUpNewUser (event) {
        event.preventDefault();

        const body = {
            name,
            email,
            password,
            repeatPassword
        };

        if (password !== repeatPassword) return ErrorAlert('As senhas precisam ser iguais!');

        try {
            await signUp(body);
            SuccessAlert('Cadastro concluído!')
            history.push('/signin');
        } catch (error) {
            const errorStatus = error.response?.status;

            if (errorStatus === 400) return ErrorAlert('Dados inválidos!');
            if (errorStatus === 409) return ErrorAlert('Email já cadastrado!');
            if (errorStatus === 500) return ErrorAlert('Erro desconhecido! Tente novamente');
            if (!errorStatus) return ErrorAlert('Servidor offline');
        }
    }

    return (
        <SignPage>
            <Title>MyWallet</Title>
            <SignForm onSubmit={signUpNewUser}>
                <Input type="text" placeholder="Nome" onChange={(event) => setName(event.target.value)} required />
                <Input type="email" placeholder="Email" onChange={(event) => setEmail(event.target.value)} required />
                <Input type="password" placeholder="Senha" onChange={(event) => setPassword(event.target.value)} required />
                <Input type="password" placeholder="Confirme a senha" onChange={(event) => setRepeatPassword(event.target.value)} required />
                <SubmitButton>Cadastrar</SubmitButton>
            </SignForm>
            <Link to='/signin'>
                Já tem uma conta? Entre agora!
            </Link>
        </SignPage>
    );
}