import styled from 'styled-components';
import { useEffect, useContext } from 'react';
import UserContext from '../contexts/UserContext.js';

export default function Transactions () {
    const { user } = useContext(UserContext);

    return (
        <HelloUser>Olá, {user.name.split(' ')[0]}</HelloUser>
    );
}

const HelloUser = styled.h2`
    color: #ffffff;
    font-size: 26px;
    font-weight: 700;
`;