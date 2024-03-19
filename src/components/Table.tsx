import { ReactNode, useEffect, useState } from 'react'
import {
    Container,
    Flex,
    HStack,
    Select,
    TableContainer,
    Text,
} from '@chakra-ui/react'
import Pagination from './Pagination.tsx'
import { useQueryClient } from 'react-query'

interface props {
    contentFn: (
        limit: number,
        page: number,
        setCount: (count: number) => void
    ) => ReactNode
    name: string
}

const Table = ({ contentFn, name }: props) => {
    const [count, setCount] = useState(0)
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)

    const queryClient = useQueryClient()
    const maxPage = Math.ceil(count / limit)

    useEffect(() => {
        const newPage = Math.min(maxPage, page)

        if (page == newPage) {
            queryClient.fetchQuery([name, 'all'])
            return
        }

        setPage(newPage)
    }, [limit])

    useEffect(() => {
        queryClient.fetchQuery([name, 'all'])
    }, [page])

    return (
        <Container>
            <Flex justifyContent="space-between">
                <HStack alignItems="center">
                    <Text noOfLines={1}>Сколько записей показать:</Text>
                    <Select
                        w={'3xs'}
                        value={limit}
                        onChange={(e) => setLimit(Number(e.target.value))}
                    >
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </Select>
                </HStack>
                <Text>Всего записей: {count}</Text>
            </Flex>
            <TableContainer py={8} px={8} shadow="xl" rounded="sm">
                {contentFn(limit, page, setCount)}
                <Flex justifyContent="center" py={2}>
                    <Pagination
                        page={page}
                        maxPage={maxPage}
                        setPage={setPage}
                    />
                </Flex>
            </TableContainer>
        </Container>
    )
}

export { Table }
