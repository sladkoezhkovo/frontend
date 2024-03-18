export interface Response<T> {
    data: T
}

export interface AuthDto {
    accessToken: string
}

export interface GetUsersDto {
    entries: UserEntry[]
}
