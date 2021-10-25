import styled from 'styled-components';
import dayjs from 'dayjs';
import { useHistory } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import UserContext from '../../contexts/UserContext.js';
import { getTransactions } from '../../services/mywallet.js';

export default function TransactionsList () {
    const { user } = useContext(UserContext);
    const [transactions, setTransactions] = useState(null);
    const [total, setTotal] = useState(0);
    const history = useHistory();

    useEffect(() => {
        if (!user) return history.push('/signin');

        getTransactions(user?.token)
            .then((response) => {
                setTransactions(response.data);

                let sum = 0;
                response.data.forEach((transaction) => {
                    const value = Number(transaction.value.replace(/['R$ '.]+/g,"").replace(',','.'));
                    if (transaction.type === 'income') {
                            sum += value;
                    } else {
                            sum -= value;
                    }
                });
                setTotal(sum);
            })
            .catch((error) => {
                const errorStatus = error.response?.status;
                if (errorStatus === 401) {
                    alert('Sessão inválida! Entre novamente.');
                    return history.push('/signin');
                };
                if (errorStatus === 500) return alert('Erro desconhecido! Tente novamente');
                if (!errorStatus) return alert('Servidor offline');
            });
    }, []);

    return (
        <TransactionsBox>
            <div>
                {transactions?.map((transaction, index) => <Transaction key={index}>
                    <Day>{dayjs(transaction.date).format('DD/MM')}</Day>
                    <Description>{transaction.description}</Description>
                    <Value type={transaction.type}>{transaction.value}</Value>
                </Transaction>)}
            </div>
            <TotalRow>
                SALDO
                <Value positive={total >= 0}>{Math.abs(total).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</Value>
            </TotalRow>
        </TransactionsBox>
    );
}

const TransactionsBox = styled.div`
    width: 100%;
    height: calc(100% - 175px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #ffffff;
    border-radius: 5px;
    margin-bottom: 13px;
    padding: 23px 12px 10px;
`;

const Transaction = styled.div`
    width: 100%;
    display: flex;
    margin-bottom: 15px;
    position: relative;
`;

const Day = styled.span`
    color: #C6C6C6;
    font-size: 16px;
    margin-right: 5px;
`;

const Description = styled.span`
    font-size: 16px;
`;

const Value = styled.div`
    font-size: 16px;
    color: ${({ type, positive }) => type === 'income' || positive ? '#039B00' : '#C70000'};
    position: absolute;
    top: 0;
    right: 0;
`;

const TotalRow = styled.div`
    width: 100%;
    font-weight: 700;
    position: relative;
`;