import api from '@/api/api.ts'
import { ListDto, Dto } from '@/types/dto.ts'
import { CityEntry } from '@/types/entity.ts'

export class CityService {
    static async getCities(limit: number, offset: number) {
        const res = await api.get<Dto<ListDto<CityEntry>>>(
            `/cities?limit=${limit}&offset=${offset}`
        )

        return res.data.data
    }

    static async getCity(id: number) {
        const res = await api.get<Dto<Dto<CityEntry>>>(`/cities/${id}`)
        return res.data.data
    }
}
