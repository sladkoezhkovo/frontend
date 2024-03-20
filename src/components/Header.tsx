import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '@/zustand/store'
import { AuthService } from '@/service/auth'
import { Box, Button, Container, Typography } from '@mui/material'
import { Link } from '@/components/Link'

import Logo from '@/assets/sladkoezhkovo.svg'
import { AdminHeader } from '@/components/AdminHeader.tsx'
import LogoutIcon from '@mui/icons-material/Logout'

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
        <Box sx={{ w: 1, boxShadow: 2, py: 3, mb: 2 }}>
            <Container
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-around',
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
                            <Button onClick={() => logoutFn()}>
                                <LogoutIcon />
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
        </Box>
    )
}
