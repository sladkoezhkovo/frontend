export interface Dto<T> {
    data: T
}

export interface ListDto<T> {
    entries: T[]
    count: number
}

export interface AuthDto {
    accessToken: string
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
