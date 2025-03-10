import axios from "axios";
import Cookies from "js-cookie";

export function AxiosInstance() {
    const token = Cookies.get("accessToken");

    const axiosInstance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_BASE_URL,
        headers: {
            Authorization: token ? `Bearer ${token}` : "",
        },
    });

    return axiosInstance;
}
