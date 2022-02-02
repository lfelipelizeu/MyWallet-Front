import styled from 'styled-components';

const SignPage = styled.div`
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;

    a {
        color: #ffffff;
        text-decoration: none;
        font-size: 15px;
        font-weight: 700;
        margin-top: 32px;
    }
`;

const Title = styled.h1`
    font-size: 32px;
    color: #ffffff;
    text-align: center;
    margin-bottom: 28px;
`;

const SignForm = styled.form`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const SubmitButton = styled.button`
    width: 100%;
    height: 46px;
    background-color: #A328D6;
    border: none;
    border-radius: 5px;
    color: #FFFFFF;
    font-weight: 700;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export {
    SignPage,
    Title,
    SignForm,
    SubmitButton
}