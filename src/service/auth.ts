import api from '../api/api.ts'
import { Dto, AuthDto } from '../types/dto.ts'

export class AuthService {
    static async signIn(email: string, password: string) {
        const res = await api.post<Dto<AuthDto>>(
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

    static async logout() {
        await api.post('/logout')
        localStorage.removeItem('access_token')
    }

    static async checkAuth(roleId: number) {
        const r = await api.post(`/auth?role_id=${roleId}`)
    }

    static async refresh() {
        const r = await api.get<Dto<AuthDto>>('/refresh', {
            withCredentials: true,
        })
        localStorage.setItem('access_token', r.data.data.accessToken)
    }
}
