import { RoleEntry, UserEntry } from './entity.ts'

export interface Response<T> {
    data: T
}

export interface AuthDto {
    accessToken: string
}

export interface GetUsersDto {
    entries: UserEntry[]
    count: number
}

export interface GetRolesDto {
    entries: RoleEntry[]
    count: number
}

export interface GetUserDto {
    id: number
    email: string
    role: string
    createdAt: number
}

export interface GetRoleDto {
    id: number
    name: string
}
