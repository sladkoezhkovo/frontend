import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { Loading } from '@/components/Loading.tsx'
import { RoleService } from '@/service/roles.ts'

const RolePage = () => {
    const { id } = useParams()

    const { data, isLoading } = useQuery({
        queryFn: () => RoleService.getRole(Number(id)),
        queryKey: ['roles', id],
        retry: false,
    })
    if (isLoading) {
        return <Loading />
    }


    return (
        <>
            {/* <Card>
                <Flex>
                    <Container border="thin">
                        <Breadcrumb spacing={2}>
                            <BreadcrumbItem>
                                <Link to={'/admin/roles'}>Роли</Link>
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
        </> */}
    )
}

export default RolePage
