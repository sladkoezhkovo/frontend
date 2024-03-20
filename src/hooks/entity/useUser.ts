import { useQuery } from 'react-query'
import { getUser } from '../../service/users.ts'
import { getRole } from '../../service/roles.ts'

export const useUser = (userId: number, onError: (err: Error) => void) => {
    return useQuery({
        queryFn: () => getUser(userId),
        queryKey: ['user', userId],
        onError: (err) => {
            if (err instanceof Error) {
                onError(err)
            }
        },
    })
}

export const useRole = (roleId: number) => {
    return useQuery({
        queryFn: () => getRole(roleId),
        queryKey: ['roles', roleId],
    })
}
