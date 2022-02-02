import { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import { SignPage, Title, SignForm, SubmitButton } from '../styles/signStyles.js';
import { Input } from '../styles/inputStyle.js';
import { signIn } from '../services/mywallet.js';
import UserContext from '../contexts/UserContext.js';
import { ErrorAlert } from './SweetAlerts.js';

export default function SignUp () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { setUser } = useContext(UserContext);
    const history = useHistory();

    async function signUpNewUser (event) {
        event.preventDefault();
        setLoading(true);

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
            setLoading(false);
            if (errorStatus === 400) return ErrorAlert('Dados inválidos!');
            if (errorStatus === 404) return ErrorAlert('Usuário não encontrado.');
            if (errorStatus === 401) return ErrorAlert('Senha incorreta!');
            if (errorStatus === 500) return ErrorAlert('Erro desconhecido! Tente novamente');
            if (!errorStatus) return ErrorAlert('Servidor offline');
        }
    }

    return (
        <SignPage>
            <Title>MyWallet</Title>
            <SignForm onSubmit={signUpNewUser}>
                <Input type="email" placeholder="Email" onChange={(event) => setEmail(event.target.value)} required />
                <Input type="password" placeholder="Senha" onChange={(event) => setPassword(event.target.value)} required />
                <SubmitButton disabled={loading}>
                    {loading ?
                        <ThreeDots
                            color="#FFFFFF"
                            height="35px"
                        />
                        :
                        "Entrar"
                    }
                </SubmitButton>
            </SignForm>
            <Link to='/signup'>
                Primeira vez? Cadastre-se!
            </Link>
        </SignPage>
    );
}