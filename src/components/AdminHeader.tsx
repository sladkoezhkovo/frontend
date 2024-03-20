import { useNavigate } from 'react-router-dom'
import { useSelectedTableStore } from '@/zustand/store'
import { Button } from '@mui/material'

export const AdminHeader = () => {
    const table = useSelectedTableStore((state) => state.table)

    const navigate = useNavigate()

    return (
        <Button
            variant={'contained'}
            onClick={() => {
                const link = `/admin/${table}`
                console.log('link:', link)
                navigate(link)
            }}
        >
            Админка
        </Button>
    )
}
