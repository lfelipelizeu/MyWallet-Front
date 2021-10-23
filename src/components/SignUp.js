import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SignPage, Title, SignForm, SubmitButton } from '../styles/signStyles.js';
import { Input } from '../styles/inputStyle.js';

export default function SignUp () {
    return (
        <SignPage>
            <Title>MyWallet</Title>
            <SignForm>
                <Input type="text" placeholder="Nome" required />
                <Input type="email" placeholder="Email" required />
                <Input type="password" placeholder="Senha" required />
                <Input type="password" placeholder="Confirme a senha" required />
                <SubmitButton>Cadastrar</SubmitButton>
            </SignForm>
            <Link to='/'>
                Já tem uma conta? Entre agora!
            </Link>
        </SignPage>
    );
}