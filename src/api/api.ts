import axios, {AxiosError} from "axios";
import {TimeoutError} from "../errors/forbidden.ts";

const BASE_URL = "http://127.0.0.1:8000/api"

const api = axios.create({
    baseURL: BASE_URL,
    timeout: 1000,
})

api.interceptors.request.use((config) => {
    const access = localStorage.getItem("access_token")
    if (access) {
        config.headers.Authorization = `Bearer ${access}`
    }
    return config
})

api.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        if (error instanceof AxiosError) {
            if (error.response != null) {
                const status = error.response.status
                console.log("response status", status)
                if(status == 403) {
                    api.post("/refresh", {}, {withCredentials: true})
                }
            }
        }
        return error;
    }
)

export default api