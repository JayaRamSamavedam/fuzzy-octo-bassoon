// src/components/Login.js

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setToken, logout } from '../features/authSlice';
import { Request, setAuthHeader } from '../helper/axios_helper';

const Login = () => {
    const [singUpData,setSignUpData] = useState({
        firstName:'',
        lastName:'',
        login:'',
        password:''
    });
    const handleChangeSignup = (e)=>{
        setSignUpData({ ...singUpData, [e.target.name]: e.target.value });
    }
    const [formData, setFormData] = useState({
        login: '',
        password: '',
    });
    const tok = useSelector(state=>state.token);
    console.log(tok);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await Request("POST", "/login", formData,tok);
            console.log(response);
            if (response.status === 200) {
                const  token  = response.data.token;
                console.log(token);
                
                const user={
                  "username": response.data.login,
                  "firstName": response.data.firstName,
                  "lastName": response.data.lastName,
                  "id":response.data.id
                }
                setAuthHeader()
                dispatch(setUser(user));
                dispatch(setToken(token));
                setFormData({ login: '', password: '' });
                setError('');
            } else {
                setError('Login failed. Please check your credentials.');
            }
        } catch (error) {
            setError('Login failed. Please check your credentials.');
            console.error('Login error:', error);
        }
    };
    const handleLogout = () => {
        window.localStorage.setItem("admin",false);
        dispatch(setUser(null));
        dispatch(setToken(null));
        dispatch(logout());
    };
    return (
        <div>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {user ? (
                <div>
                    <p>Welcome, {user.username}!</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="login"
                        placeholder="Username"
                        value={formData.login}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <button type="submit">Login</button>
                </form>
            )}
        </div>
    );
};

export default Login;
