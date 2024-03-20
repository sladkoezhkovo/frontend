import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useLocation, useNavigate } from 'react-router-dom'
import { useUserStore } from '@/zustand/store.ts'
import { signIn } from '@/service/auth'
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    FormLabel,
    Input,
    Container,
    TextField,
    Card,
    Typography,
} from '@mui/material'

function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const { state } = useLocation()

    const [error, setError] = useState<string | null>(null)
    const queryClient = useQueryClient()
    const update = useUserStore((state) => state.update)

    const { mutate } = useMutation({
        mutationFn: () => signIn(email, password),
        onSuccess: () => {
            setError(null)
            update(email)
            navigate(state ? state.from : '/')
        },
        onError: (err) => {
            if (err instanceof Error) {
                setError('Неверный логин или пароль')
            }
        },
    })

    const isAuth = !!useUserStore((state) => state.email)

    if (isAuth) {
        return (
            <div className="flex justify-center">
                <h2>Вы уже авторизованы</h2>
            </div>
        )
    }

    const handleButton = async () => {
        if (!isError) {
            mutate()
        }
        queryClient.fetchQuery(['auth'])
    }

    const validateEmail = (email: string) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
    }

    const isError = validateEmail(email) == null || password.length < 8

    return (
        <Container
            sx={{
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <FormControl sx={{ py: 8, gap: 2 }}>
                <Box>
                    <TextField
                        required
                        label={'Email'}
                        error={validateEmail(email) == null}
                        placeholder="Введите email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Box>
                <Box>
                    <TextField
                        label={'Пароль'}
                        required
                        error={password.length < 8}
                        placeholder="Введите пароль"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Box>

                <Button
                    variant={'contained'}
                    disabled={isError}
                    onClick={handleButton}
                >
                    Авторизоваться
                </Button>
                <FormHelperText color="danger">{error}</FormHelperText>
            </FormControl>
        </Container>
    )
}

export { LoginPage }
