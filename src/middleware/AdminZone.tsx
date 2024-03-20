import { useAuth } from '@/hooks/useAuth.ts'
import { Loading } from '@/components/Loading.tsx'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useUserStore } from '@/zustand/store.ts'

export const AdminZone = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const logout = useUserStore((state) => state.logout)

    const handleError = (err: Error) => {
        logout()
        navigate('/')
    }

    const { isError, isLoading } = useAuth(1, handleError)

    if (isLoading) {
        return <Loading />
    }

    if (isError) {
        return <Navigate to="/" state={{ from: location }} />
    }

    return <Outlet />
}
