import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'

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
        // return (
        //     <Card>
        //         <Flex>
        //             <Container border="thin">
        //                 <Text>Пользователь не найден</Text>
        //             </Container>
        //         </Flex>
        //     </Card>
        // )
    }

    return (
        <>
            {/* <Card>
                <Flex>
                    <Container border="thin">
                        <Breadcrumb spacing={2}>
                            <BreadcrumbItem>
                                <Link to={'/Admin#1'}>Роли</Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem>
                                <Link to={`/Admin/roles/${data.id}`}>
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
