import { Outlet } from 'react-router-dom'
import { Box, Container } from '@mui/material'
import { Header } from '@/components/Header'

// interface props {
//     isAdmin: boolean
// }

export function AppLayout() {
    return (
        <Box>
            <Header isAdmin={true} />
            <Container className="mb-24">
                <Outlet />
            </Container>
            <footer className="flex justify-center">
                2024 &copy; Evteev Dmitry
            </footer>
        </Box>
    )
}
