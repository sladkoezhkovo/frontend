import { getRoles } from '@/service/roles.ts'
import { useTableStateStore } from '@/zustand/store.ts'
import { useQuery } from 'react-query'
import { Loading } from '@/components/Loading.tsx'
import {
    DataTable,
    DataTableColumnDefinition,
} from '@/components/DataTable.tsx'
import { CityService, getCities } from '@/service/cities.ts'

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
    const limit = useTableStateStore((state) => state.limit)
    const page = useTableStateStore((state) => state.page)

    const { data, isLoading, refetch } = useQuery({
        queryFn: () => CityService.getCities(limit, (page - 1) * limit),
        queryKey: ['cities', { limit, page }],
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

export default RolesPage
