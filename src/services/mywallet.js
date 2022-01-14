import axios from 'axios';
const BASE_URL = 'https://appmywallet.herokuapp.com';

function signUp (body) {
    return axios.post(`${BASE_URL}/sign-up`, body);
}

function signIn (body) {
    return axios.post(`${BASE_URL}/sign-in`, body);
}

function getTransactions (token) {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    return axios.get(`${BASE_URL}/transactions`, config);
}

function postNewTransaction (body, token) {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    return axios.post(`${BASE_URL}/transactions`, body, config);
}

export {
    signUp,
    signIn,
    getTransactions,
    postNewTransaction
}