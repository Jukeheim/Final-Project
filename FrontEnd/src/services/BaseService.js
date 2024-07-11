import axios from 'axios';
import { getAccessToken, logout } from '../stores/AccessTokenStore';

const INVALID_STATUS_CODES = [401];

const createHttp = (useAccessToken = false) => {
    const http = axios.create({
        baseURL: "http://localhost:3000", // This should point to your local backend
    });

    console.log("Base URL:", http.defaults.baseURL); // This should output 'http://localhost:3000'

    if (useAccessToken) {
        http.interceptors.request.use(
            (config) => {
                config.headers.Authorization = `Bearer ${getAccessToken()}`;
                return config;
            },
            (err) => Promise.reject(err)
        );
    }

    http.interceptors.response.use(
        function (response) {
            return response.data;
        },
        function (error) {
            if (
                error?.response?.status &&
                INVALID_STATUS_CODES.includes(error.response.status)
            ) {
                if (getAccessToken()) {
                    logout();
                }
            }

            return Promise.reject(error.response?.data || error.message);
        }
    );

    return http;
};

export default createHttp;
