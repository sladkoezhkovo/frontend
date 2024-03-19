import { Link as RouterLink } from 'react-router-dom'
import { Link as ChakraLink } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props {
    children: ReactNode
    to: string
}

export const Link = ({ children, ...props }: Props) => {
    return (
        <RouterLink {...props}>
            <ChakraLink>{children}</ChakraLink>
        </RouterLink>
    )
}
