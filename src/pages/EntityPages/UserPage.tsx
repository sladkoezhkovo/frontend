import { useParams } from 'react-router-dom'
import { useUser } from '../../hooks/entity/useUser.ts'
import {
    Breadcrumb,
    BreadcrumbItem,
    Card,
    Container,
    Flex,
    Text,
    useToast,
} from '@chakra-ui/react'
import { Loading } from '../../components/Loading.tsx'
import { Link } from '../../components/Link.tsx'

const UserPage = () => {
    const { id } = useParams()

    const toast = useToast()

    const onError = (err: Error) => {
        toast({
            title: err.message,
            status: 'error',
            position: 'bottom-left',
        })
    }

    const { data, isLoading, isError } = useUser(Number(id), onError)

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
        <Card>
            <Flex>
                <Container border="thin">
                    <Breadcrumb spacing={2}>
                        <BreadcrumbItem>
                            <Link to={'/admin#0'}>Пользователи</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            <Link to={`/admin/users/${data.id}`}>
                                {data.email}
                            </Link>
                        </BreadcrumbItem>
                    </Breadcrumb>
                </Container>
            </Flex>
        </Card>
    )
}

export default UserPage
