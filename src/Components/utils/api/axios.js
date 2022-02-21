import axios from "axios";

const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    timeout: 2000
});

async function getUsers(){
    const response = await instance.get('/users');
    return response.data;
}

export {getUsers};