import axios from 'axios';
const BASE_URL = 'http://localhost:4000';

function signUp (body) {
    return axios.post(`${BASE_URL}/sign-up`, body);
}

export {
    signUp,
}