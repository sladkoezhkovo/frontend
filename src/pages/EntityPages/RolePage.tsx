import { useParams } from 'react-router-dom'
import {
    Breadcrumb,
    BreadcrumbItem,
    Card,
    Container,
    Flex,
    Text,
} from '@chakra-ui/react'
import { Loading } from '../../components/Loading.tsx'
import { Link } from '../../components/Link.tsx'
import { useQuery } from 'react-query'
import { Table } from '../../components/Table.tsx'
import { RolesTable } from '../../components/tables/RolesTable.tsx'
import { getRole, getRoles } from '../../service/roles.ts'
import { getUsers, getUsersByRole } from '../../service/users.ts'
import { UsersTable } from '../../components/tables/UsersTable.tsx'

const RolePage = () => {
    const { id } = useParams()

    const { data, isLoading, isError } = useQuery({
        queryFn: () => getRole(Number(id)),
        queryKey: ['roles', id],
        retry: false,
    })
    if (isLoading) {
        return <Loading />
    }

    if (isError) {
        return (
            <Card>
                <Flex>
                    <Container border="thin">
                        <Text>Пользователь не найден</Text>
                    </Container>
                </Flex>
            </Card>
        )
    }

    return (
        <>
            <Card>
                <Flex>
                    <Container border="thin">
                        <Breadcrumb spacing={2}>
                            <BreadcrumbItem>
                                <Link to={'/admin#1'}>Роли</Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem>
                                <Link to={`/admin/roles/${data.id}`}>
                                    {data.name}
                                </Link>
                            </BreadcrumbItem>
                        </Breadcrumb>
                    </Container>
                </Flex>
            </Card>

            <Table
                name={''}
                contentFn={(limit, page, setCount) => (
                    <UsersTable
                        setCount={setCount}
                        queryFn={() =>
                            getUsersByRole(data.id, limit, (page - 1) * limit)
                        }
                    />
                )}
            />
        </>
    )
}

export default RolePage
