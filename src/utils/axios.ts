import axios from "axios";

// Axios Interceptor Instance
export const AxiosInstance = axios.create({
    baseURL: process.env.BASE_URL
});