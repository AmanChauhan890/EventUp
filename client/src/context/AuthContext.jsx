import { createContext, useState, useEffect } from "react";
import api from '../utils/axios.jsx';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const[loading, setLoading] = useState(true);

    useEffect(() => {
        const userInfo = localStorage.getItem("userInfo");
        if(userInfo){
            setUser(JSON.parse(userInfo));
        }
        setLoading(false);
    }, []);

    const login = async(email, password) => {
        try{
            const {data} = await api.post('auth/login', {email, password});
            setUser(data);
            localStorage.setItem('userInfo', JSON.stringify(data));
            localStorage.setItem('token', data.token);
            return data;
        }catch(err){
            throw err.response?.data?.message || 'Login failed';
        }
    };

    const register = async(name, email, password) => {
        try{
            const { data } = await api.post('/auth/register', { name, email, password});
            return data;
        }catch(err){
            throw err.response?.data?.message || 'Register failed';
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('userInfo');
        localStorage.removeItem('token');
    }

    return (
        <AuthContext.Provider value = {{ user, login, register, logout, loading }}>
            {!loading && children }
        </AuthContext.Provider>
    )
}