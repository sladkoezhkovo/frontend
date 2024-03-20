import { CircularProgress, Container } from '@mui/material'

const Loading = () => {
    return (
        <Container
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                py: 2,
                bg: 'white',
            }}
        >
            <CircularProgress />
        </Container>
    )
}

export { Loading }
