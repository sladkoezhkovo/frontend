import api from '../api/api.ts'
import { GetUserDto, ListDto, Dto } from '../types/dto.ts'
import { UserEntry } from '@/types/entity.ts'

export class UserService {
    static async getUsers(limit: number, offset: number) {
        const res = await api.get<Dto<ListDto<UserEntry>>>(
            `/users?limit=${limit}&offset=${offset}`
        )

        return res.data.data
    }

    static async getUsersByRole(roleId: number, limit: number, offset: number) {
        const res = await api.get<Dto<ListDto<UserEntry>>>(
            `/users?roleId=${roleId}&limit=${limit}&offset=${offset}`
        )

        return res.data.data
    }

    static async getUser(id: number) {
        const res = await api.get<Dto<GetUserDto>>(`/users/${id}`)

        return res.data.data
    }
}
