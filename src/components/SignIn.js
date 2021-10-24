import { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { SignPage, Title, SignForm, SubmitButton } from '../styles/signStyles.js';
import { Input } from '../styles/inputStyle.js';
import { signIn } from '../services/mywallet.js';
import UserContext from '../contexts/UserContext.js';

export default function SignUp () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useContext(UserContext);
    const history = useHistory();

    async function signUpNewUser (event) {
        event.preventDefault();

        const body = {
            email,
            password
        };

        try {
            const response = await signIn(body);
            const user = response.data;

            setUser(user);
            localStorage.setItem('user', JSON.stringify({
                name: user.name,
                token: user.token
            }));

            history.push('/');
        } catch (error) {
            const errorStatus = error.response?.status;

            if (errorStatus === 400) return alert('Dados inválidos!');
            if (errorStatus === 404) return alert('Usuário não encontrado.');
            if (errorStatus === 401) return alert('Senha incorreta!');
            if (errorStatus === 500) return alert('Erro desconhecido! Tente novamente');
            if (!errorStatus) return alert('Servidor offline');
        }
    }

    return (
        <SignPage>
            <Title>MyWallet</Title>
            <SignForm onSubmit={signUpNewUser}>
                <Input type="email" placeholder="Email" onChange={(event) => setEmail(event.target.value)} required />
                <Input type="password" placeholder="Senha" onChange={(event) => setPassword(event.target.value)} required />
                <SubmitButton>Entrar</SubmitButton>
            </SignForm>
            <Link to='/signup'>
                Primeira vez? Cadastre-se!
            </Link>
        </SignPage>
    );
}