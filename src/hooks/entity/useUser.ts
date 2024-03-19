import { useQuery } from 'react-query'
import { getUser } from '../../service/users.ts'

export const useUser = (userId: number, onError: (err: Error) => void) => {
    return useQuery({
        queryFn: () => getUser(userId),
        queryKey: ['user', userId],
        onError: (err) => {
            if (err instanceof Error) {
                onError(err)
            }
        },
        retry: false,
    })
}
