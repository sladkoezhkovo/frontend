import { RoleService } from '@/service/roles.ts'
import { useTableStateStore } from '@/zustand/store.ts'
import { useMutation, useQuery } from 'react-query'
import { Loading } from '@/components/Loading.tsx'
import {
    DataTable,
    DataTableColumnDefinition,
} from '@/components/DataTable.tsx'
import { useTableState } from '@/hooks/useTableState.ts'
import { toast } from 'react-toastify'
import { RoleEntry } from '@/types/entity.ts'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material'
import { useState } from 'react'

const columns: DataTableColumnDefinition[] = [
    {
        field: 'id',
        title: 'ID',
        width: 100,
    },
    {
        field: 'name',
        title: 'Название роли',
        width: 700,
    },
]

const RolesPage = () => {
    const { page, limit } = useTableState()
    const [open, setOpen] = useState(false)
    const [roleToDelete, setRoleToDelete] = useState<RoleEntry | null>(null)

    const { data, isLoading, refetch } = useQuery({
        queryFn: () => RoleService.getRoles(limit, (page - 1) * limit),
        queryKey: ['roles', { limit, page }],
    })

    const { mutate: remove } = useMutation({
        mutationFn: (id: number) => RoleService.deleteRole(id),
        onSuccess: () => {
            toast.success(`Роль ${roleToDelete?.name} удалена`, {
                position: 'bottom-left',
                autoClose: 1000,
            })

            refetch()
        },
        onError: (err) => {
            toast.error(`Не удалось удалить роль ${roleToDelete?.name}`, {
                position: 'bottom-left',
                autoClose: 1000,
            })
        },
    })

    if (isLoading) {
        return <Loading />
    }

    const handleClose = () => {
        setOpen(false)
    }
    const handleDelete = (entry: RoleEntry) => {
        setRoleToDelete(entry)
        setOpen(true)
    }

    const confirmDelete = () => {
        remove(roleToDelete!.id)
        setRoleToDelete(null)
        setOpen(false)
    }

    const onPageChange = () => {
        refetch()
    }
    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Подтверждение удаления
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Вы действительно хотите удалить роль (
                        {roleToDelete?.name}#{roleToDelete?.id})
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={confirmDelete}>Да, удалить</Button>
                    <Button onClick={handleClose} autoFocus>
                        Отмена
                    </Button>
                </DialogActions>
            </Dialog>
            <DataTable
                columns={columns}
                rows={data!.entries}
                count={data!.count}
                onPageChange={onPageChange}
                onDelete={handleDelete}
            />
        </>
    )
}

export default RolesPage
