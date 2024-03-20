import { useParams } from 'react-router-dom'
import { useUser } from '@/hooks/entity/useUser.ts'
import { Loading } from '@/components/Loading.tsx'
import { Box, Breadcrumbs, Card, Stack, Typography } from '@mui/material'
import { Link } from '@/components/Link.tsx'

const UserPage = () => {
    const { id } = useParams()

    const onError = (err: Error) => {}

    const { data, isLoading, isError } = useUser(Number(id), onError)

    if (isLoading) {
        return <Loading />
    }

    if (isError) {
        return (
            <Card>
                <Box border="thin">
                    <Typography>Пользователь не найден</Typography>
                </Box>
            </Card>
        )
    }

    return (
        <>
            <Breadcrumbs sx={{ mb: 2 }}>
                <Link to={'/admin/users'}>Пользователи</Link>
                <Link to={`/admin/users/${id}`}>{data.email}</Link>
            </Breadcrumbs>
            <Stack>
                <Typography>ID: {data.id}</Typography>
                <Typography>Email: {data.email}</Typography>
                <Typography>Роль: {data.role}</Typography>
                <Typography>
                    Создан: {new Date(data.createdAt * 1000).toUTCString()}
                </Typography>
            </Stack>
        </>
    )
}

export default UserPage
