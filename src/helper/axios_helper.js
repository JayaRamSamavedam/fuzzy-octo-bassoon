import axios from 'axios';
import { setUser, setToken, logout } from '../features/authSlice';
import { useSelector } from 'react-redux';

export const getAuthToken = () => {
    return window.localStorage.getItem('auth_token');
};

export const setAuthHeader = (token) => {
    window.localStorage.setItem('auth_token', token);
};



axios.defaults.baseURL = 'http://localhost:1593';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const Request = (method, url, data) => {
    // const token = useSelector(state=>state.token);
    // console.log(token);
    let headers = {};
    if (getAuthToken() !== null && getAuthToken() !== "null") {
        headers = {'Authorization': `Bearer ${getAuthToken()}`};
    }

    return axios({
        method: method,
        url: url,
        headers: headers,
        data: data});
};