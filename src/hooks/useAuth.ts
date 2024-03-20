// REDUX

import { useQuery } from 'react-query'
import { AuthService } from '../service/auth.ts'
import { RequestError } from '../errors/forbidden.ts'

export const useAuth = (
    roleId: number,
    onError: (err: RequestError) => void
) => {
    return useQuery({
        queryFn: () => AuthService.checkAuth(roleId),
        queryKey: ['auth'],
        onError: (err) => {
            if (err instanceof Error) {
                onError(err)
            }
        },
        retry: false,
    })
}
