import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '@/zustand/store'
import { AuthService } from '@/service/auth'
import { Box, Button, Container, Typography } from '@mui/material'
import { Link } from '@/components/Link'

import Logo from '@/assets/sladkoezhkovo.svg'
import { AdminHeader } from '@/components/AdminHeader.tsx'

interface props {
    isAdmin: boolean
}

export const Header = ({ isAdmin }: props) => {
    const email = useUserStore((state) => state.email)
    const logoutState = useUserStore((state) => state.logout)

    const queryClient = useQueryClient()

    const navigate = useNavigate()

    const { mutate: logoutFn } = useMutation({
        mutationFn: AuthService.logout,
        onSuccess: () => {
            console.log('logout')
            logoutState()

            queryClient.fetchQuery(['auth'])

            navigate('/')
        },
    })

    return (
        <Container
            sx={{
                py: 4,
                width: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            <Link to={'/'}>
                <img src={Logo} alt={'sladkoezhkovo.'} />
            </Link>

            {isAdmin && <AdminHeader />}

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {email ? (
                    <>
                        <Typography sx={{ mr: 2 }}>{email}</Typography>
                        <Button
                            variant={'contained'}
                            onClick={() => logoutFn()}
                        >
                            Выход
                        </Button>
                    </>
                ) : (
                    <Button
                        variant={'contained'}
                        onClick={() => navigate('/sign-in')}
                    >
                        Авторизоваться
                    </Button>
                )}
            </Box>
        </Container>
    )
}
