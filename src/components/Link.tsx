import { Link as RouterLink } from 'react-router-dom'
import { Link as MuiLink } from '@mui/material'
import { ReactNode } from 'react'

interface Props {
    children: ReactNode
    to: string
}

export const Link = ({ children, ...props }: Props) => {
    return (
        <RouterLink {...props}>
            <MuiLink>{children}</MuiLink>
        </RouterLink>
    )
}
