import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { useQuery } from 'react-query'
import { Loading } from '../Loading.tsx'
import { Link } from '../../components/Link.tsx'
import { getRoles } from '../../service/roles.ts'

const KEY = 'roles'

interface props {
    setCount: (count: number) => void
    queryFn: () => any
}

export const RolesTable = ({ setCount, queryFn }: props) => {
    const { data, isLoading } = useQuery({
        queryFn: queryFn,
        queryKey: [KEY, 'all'],
    })

    if (isLoading) {
        return <Loading />
    }

    setCount(data.count)

    return (
        <Table variant="simple">
            <Thead>
                <Th>ID</Th>
                <Th>Роль</Th>
            </Thead>
            <Tbody>
                {data.entries &&
                    data.entries.map((entry) => (
                        <Tr key={entry.id}>
                            <Td w={'16px'} isNumeric>
                                <Link to={`/admin/${KEY}/${entry.id}`}>
                                    {entry.id}
                                </Link>
                            </Td>
                            <Td>
                                <Link to={`/admin/${KEY}/${entry.id}`}>
                                    {entry.name}
                                </Link>
                            </Td>
                        </Tr>
                    ))}
            </Tbody>
        </Table>
    )
}
