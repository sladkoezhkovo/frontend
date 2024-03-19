import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.ts'
import { useToast } from '@chakra-ui/react'
import { Loading } from '../components/Loading.tsx'
import { useUserStore } from '../zustand/store.ts'

const AdminZone = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const toast = useToast()

    const logout = useUserStore((state) => state.logout)

    const handleError = (err: Error) => {
        toast({
            title: err.message,
            status: 'error',
            isClosable: true,
            position: 'bottom-left',
        })
        navigate('/')
    }

    const { isError, isLoading } = useAuth(1, handleError)

    if (isLoading) {
        return <Loading />
    }

    if (isError) {
        // logout()
        return <Navigate to="/" state={{ from: location }} />
    }

    return <Outlet />
}

export { AdminZone }
