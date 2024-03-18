import { useEffect, useState } from 'react'
import {
    Container,
    Flex,
    Select,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useToast,
    Text,
} from '@chakra-ui/react'
import { useQuery } from 'react-query'
import { getUsers } from '../../service/users.ts'
import { Loading } from '../Loading.tsx'

const UsersTable = () => {
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)

    const toast = useToast()

    const { data, isLoading } = useQuery({
        queryFn: () => getUsers(limit, (page - 1) * limit),
        queryKey: ['users', 'all'],
        onSuccess: () => {
            toast({
                title: 'Пользователи загружены',
                position: 'bottom-left',
                variant: 'success',
            })
        },
        staleTime: 20000,
    })

    if (isLoading) {
        return <Loading />
    }

    return (
        <Container>
            <Flex>
                <Flex alignItems="center">
                    <Text noOfLines={1}>Сколько записей показать: </Text>

                    <Select
                        value={limit}
                        onChange={(e) => setLimit(Number(e.target.value))}
                    >
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </Select>
                </Flex>
            </Flex>
            <TableContainer>
                <Table variant="simple">
                    <Thead>
                        <Th>ID</Th>
                        <Th>Email</Th>
                        <Th>Роль</Th>
                    </Thead>
                    <Tbody>
                        {data &&
                            data.entries.map((user) => (
                                <Tr key={user.id}>
                                    <Td w={'16px'} isNumeric>
                                        {user.id}
                                    </Td>
                                    <Td>{user.email}</Td>
                                    <Td>{user.role}</Td>
                                </Tr>
                            ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Container>
    )
}

export { UsersTable }
