// REDUX

import { useQuery } from 'react-query'
import { checkAuth } from '../service/auth.ts'
import { RequestError } from '../errors/forbidden.ts'

export const useAuth = (
    roleId: number,
    onError: (err: RequestError) => void
) => {
    return useQuery({
        queryFn: () => checkAuth(roleId),
        queryKey: ['auth'],
        onError: (err) => {
            if (err instanceof RequestError) {
                onError(err)
            }
        },
        retry: false,
    })
}
