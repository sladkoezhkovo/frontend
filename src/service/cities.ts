import api from '@/api/api.ts'
import { ListDto, Response } from '@/types/dto.ts'
import { CityEntry } from '@/types/entity.ts'

export async function getCities(limit: number, offset: number) {
    const res = await api.get<Response<ListDto<CityEntry>>>(
        `/cities?limit=${limit}&offset=${offset}`
    )

    return res.data.data
}

export async function getCity(id: number) {
    const res = await api.get<Response<Response<CityEntry>>>(`/cities/${id}`)
    return res.data.data
}
