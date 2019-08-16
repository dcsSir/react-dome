import jsonp from 'jsonp'
import axiosInstance from './ajax';

export const reqLogin = (username,password) => axiosInstance.post('/login',{username,password});

export const reqValidateUser = (id) => axiosInstance.post('/validate/user',{id});

export const getWeather =
    (city) => {
        // return new Promise()
    }