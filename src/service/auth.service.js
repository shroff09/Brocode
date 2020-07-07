import axios from 'axios';

const login = async (email, password) => {
    const {data} = await axios.post('http://localhost:3003/api/login', {
        email,
        password
    });
    return data;
};

const signUp = async (firstName, lastName, email, password) => {
    const {data} = await axios.post('http://localhost:3003/api/signup', {
        firstName, lastName, email, password
    });
};

export default {
    login,
    signUp
}