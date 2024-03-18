import axios, { AxiosError } from 'axios'
import { AuthDto, Response } from '../types/dto.ts'

const BASE_URL = 'http://127.0.0.1:8000/api'

const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
})

api.interceptors.request.use((config) => {
    const access = localStorage.getItem('access_token')
    if (access) {
        config.headers.Authorization = `Bearer ${access}`
    }
    return config
})

api.interceptors.response.use(
    (response) => {
        return response
    },
    async (error) => {
        if (error instanceof AxiosError) {
            const originalRequest = error.config!
            if (
                error.response &&
                error.response.status == 401 &&
                error.config &&
                // @ts-ignore
                !error.config._isRetry
            ) {
                // @ts-ignore
                originalRequest._isRetry = true
                try {
                    const response = await axios.get<Response<AuthDto>>(
                        `${BASE_URL}/refresh`,
                        {
                            withCredentials: true,
                        }
                    )
                    localStorage.setItem(
                        'access_token',
                        response.data.data.accessToken
                    )
                    return api.request(originalRequest)
                } catch (e) {
                    console.log('НЕ АВТОРИЗОВАН')
                }
            }
        }
        throw error
    }
)

export default api
