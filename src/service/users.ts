import api from '../api/api.ts'
import { GetUsersDto, Response } from '../types/dto.ts'

export async function getUsers(limit: number, offset: number) {
    const res = await api.get<Response<GetUsersDto>>(
        `/users?limit=${limit}&offset=${offset}`
    )

    return res.data.data
}
