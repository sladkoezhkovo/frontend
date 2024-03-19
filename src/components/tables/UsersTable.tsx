import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { useQuery } from 'react-query'
import { getUsers } from '../../service/users.ts'
import { Loading } from '../Loading.tsx'
import { Link } from '../../components/Link.tsx'

const KEY = 'users'

interface props {
    setCount: (count: number) => void
    queryFn: () => any
}

const UsersTable = ({ setCount, queryFn }: props) => {
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
                <Th>Email</Th>
                <Th>Роль</Th>
            </Thead>
            <Tbody>
                {data.entries &&
                    data.entries.map((user) => (
                        <Tr key={user.id}>
                            <Td w={'16px'} isNumeric>
                                <Link to={`/admin/users/${user.id}`}>
                                    {user.id}
                                </Link>
                            </Td>
                            <Td>
                                <Link to={`/admin/users/${user.id}`}>
                                    {user.email}
                                </Link>
                            </Td>
                            <Td>{user.role}</Td>
                        </Tr>
                    ))}
            </Tbody>
        </Table>
    )
}

export { UsersTable }
