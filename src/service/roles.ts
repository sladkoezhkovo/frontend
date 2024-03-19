import api from '../api/api.ts'
import { GetRoleDto, GetRolesDto, Response } from '../types/dto.ts'

export async function getRoles(limit: number, offset: number) {
    const res = await api.get<Response<GetRolesDto>>(
        `/roles?limit=${limit}&offset=${offset}`
    )

    return res.data.data
}

export async function getRole(id: number) {
    const res = await api.get<Response<GetRoleDto>>(`/roles/${id}`)
    return res.data.data
}
