import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { HiOutlinePlusCircle as AddIcon } from 'react-icons/hi';

export default function NewIncome () {
    const history = useHistory();
    
    return (
        <NewButton onClick={() => history.push('/newtransaction/income')}>
            <AddIcon style={{ color: '#ffffff', fontSize: '25px' }} />
            <NewText>Nova entrada</NewText>
        </NewButton>
    );
}

const NewButton = styled.button`
    width: 48%;
    height: 115px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #A328D6;
    border: none;
    border-radius: 5px;
    padding: 10px;
`;

const NewText = styled.span`
    width: 50px;
    text-align: left;
    color: #ffffff;
    font-size: 17px;
    font-weight: 700;
`;