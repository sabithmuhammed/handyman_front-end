import axios from "axios";
import commonEndpoints from "./endpoints/commonEndpoints";
import { toast } from "react-toastify";
const Api = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}`,
    withCredentials: true,
});

export default Api;

Api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

Api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response.status === 403) {
            const message: string = error.response.data;
            if (message === "User Blocked") {
                window.location.href = "/block";

            }
            if (message === "Tradesman Blocked") {
                window.location.href = "/block?tradesman=true";
            }
        }

        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const response = await axios.get(
                    import.meta.env.VITE_BASE_URL + commonEndpoints.refresh,
                    { withCredentials: true }
                );
                const { accessToken } = response.data;
                localStorage.setItem("accessToken", accessToken);
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            } catch (error) {
                toast.error("Session timeout! Please login");
                window.location.href = "/login";
            }
        }

        return Promise.reject(error);
    }
);
