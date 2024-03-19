import api from '../api/api.ts'
import { GetUserDto, GetUsersDto, Response } from '../types/dto.ts'

export async function getUsers(limit: number, offset: number) {
    const res = await api.get<Response<GetUsersDto>>(
        `/users?limit=${limit}&offset=${offset}`
    )

    return res.data.data
}

export async function getUsersByRole(
    roleId: number,
    limit: number,
    offset: number
) {
    const res = await api.get<Response<GetUsersDto>>(
        `/users?roleId=${roleId}&limit=${limit}&offset=${offset}`
    )

    return res.data.data
}

export async function getUser(id: number) {
    const res = await api.get<Response<GetUserDto>>(`/users/${id}`)

    return res.data.data
}
