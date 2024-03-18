// REDUX

import {useQuery} from "react-query";
import {checkAuth} from "../service/auth.ts";

export const useAuth = (roleId: number, onError: (err: Error) => void) => {
    return useQuery({
        queryFn: () => checkAuth(roleId),
        queryKey: ['auth'],
        onError: (err) => {
            console.log(err)
            if (err instanceof Error) {
                onError(err)
            }
        },
        retry: false,
    })
}