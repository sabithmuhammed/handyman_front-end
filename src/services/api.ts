import axios from "axios";
import commonEndpoints from "./endpoints/commonEndpoints";
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
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const response = await axios.post(import.meta.env.VITE_BASE_URL+commonEndpoints.refresh);
                const {accessToken} = response.data
                localStorage.setItem('accessToken',accessToken)
                originalRequest.headers.Authorization = `Bearer ${accessToken}`
            } catch (error) {
                console.log(error);
                
            }
        }
        return Promise.reject(error);
    }
    
);
