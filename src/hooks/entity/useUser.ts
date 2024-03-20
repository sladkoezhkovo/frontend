import { useQuery } from 'react-query'
import { UserService } from '@/service/users.ts'
import { RoleService } from '@/service/roles.ts'

export const useUser = (userId: number, onError: (err: Error) => void) => {
    return useQuery({
        queryFn: () => UserService.getUser(userId),
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
        queryFn: () => RoleService.getRole(roleId),
        queryKey: ['roles', roleId],
    })
}
