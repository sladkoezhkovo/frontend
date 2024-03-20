import {
    Box,
    Button,
    Container,
    List,
    ListItem,
    Typography,
} from '@mui/material'
import { Outlet, useNavigate } from 'react-router-dom'
import { useSelectedTableStore, useTableStateStore } from '@/zustand/store.ts'

const tables = [
    {
        key: 'users',
        name: 'Пользователи',
    },
    {
        key: 'roles',
        name: 'Роли',
    },
    {
        key: 'cities',
        name: 'Города',
    },
]

const DashboardPage = () => {
    const { table: selected, update } = useSelectedTableStore()

    const reset = useTableStateStore((state) => state.reset)

    const navigate = useNavigate()

    const select = (table: string) => {
        update(table)
        navigate(table)
        reset()
    }

    const isSelected = (t: string) => selected == t

    return (
        <Container>
            <Box className="shadow-lg" sx={{ py: 2, px: 4, mb: 4 }}>
                <Typography variant={'h5'}>Выбор таблицы</Typography>
                <Box sx={{ display: 'flex' }}>
                    <List sx={{ display: 'flex', gap: 2 }}>
                        {tables.map((t) => (
                            <ListItem key={t.key} sx={{ p: 0 }}>
                                <Button
                                    disabled={isSelected(t.key)}
                                    variant={
                                        isSelected(t.key)
                                            ? 'outlined'
                                            : 'contained'
                                    }
                                    onClick={() => select(t.key)}
                                >
                                    {t.name}
                                </Button>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Box>

            <Box className="shadow-lg" sx={{ py: 2, px: 4 }}>
                {isSelected('') ? (
                    <Typography variant={'h4'}>Таблица не выбрана</Typography>
                ) : (
                    <Outlet />
                )}
            </Box>
        </Container>
    )
}

export { DashboardPage }
