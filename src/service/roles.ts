import api from '@/api/api.ts'
import { Dto, ListDto } from '@/types/dto.ts'
import { RoleEntry } from '@/types/entity.ts'

export class RoleService {
    static async getRoles(limit: number, offset: number) {
        const res = await api.get<Dto<ListDto<RoleEntry>>>(
            `/roles?limit=${limit}&offset=${offset}`
        )

        return res.data.data
    }

    static async getRole(id: number) {
        const res = await api.get<Dto<RoleEntry>>(`/roles/${id}`)
        return res.data.data
    }

    static async deleteRole(id: number) {
        await api.delete(`/roles/${id}`)
    }
}
