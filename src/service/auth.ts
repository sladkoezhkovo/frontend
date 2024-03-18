import api from '../api/api.ts'
import { Response, AuthDto } from '../types/dto.ts'

export async function signIn(email: string, password: string) {
    const res = await api.post<Response<AuthDto>>(
        '/sign-in',
        {
            email,
            password,
        },
        {
            withCredentials: true,
        }
    )

    localStorage.setItem('access_token', res.data.data.accessToken)
}

export async function logout() {
    await api.post('/logout')
    localStorage.removeItem('access_token')
}

export async function checkAuth(roleId: number) {
    const r = await api.post(`/auth?role_id=${roleId}`)

    return true
}

export async function refresh() {
    const r = await api.get<Response<AuthDto>>('/refresh', {
        withCredentials: true,
    })
    localStorage.setItem('access_token', r.data.data.accessToken)
}
