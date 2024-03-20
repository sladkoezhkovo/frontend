import { useQuery } from 'react-query'
import { getUsers } from '@/service/users.ts'
import { Loading } from '@/components/Loading.tsx'
import {
    DataTable,
    DataTableColumnDefinition,
} from '@/components/DataTable.tsx'
import { useTableStateStore } from '@/zustand/store.ts'

const columns: DataTableColumnDefinition[] = [
    {
        field: 'id',
        title: 'ID',
        width: 100,
    },
    {
        field: 'email',
        title: 'Email',
        width: 600,
    },
    {
        field: 'role',
        title: 'Роль',
        width: 200,
    },
]

const UsersPage = () => {
    const limit = useTableStateStore((state) => state.limit)
    const page = useTableStateStore((state) => state.page)

    const { data, isLoading, refetch } = useQuery({
        queryFn: () => getUsers(limit, (page - 1) * limit),
        queryKey: ['users', { limit, page }],
    })

    if (isLoading) {
        return <Loading />
    }

    const onPageChange = () => {
        refetch()
    }
    return (
        <DataTable
            columns={columns}
            rows={data!.entries}
            count={data!.count}
            onPageChange={onPageChange}
        />
    )
}

export default UsersPage
