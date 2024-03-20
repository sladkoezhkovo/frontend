import {
    Box,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Pagination,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material'
import { Link } from '@/components/Link.tsx'
import { useTableStateStore } from '@/zustand/store.ts'
import { useEffect } from 'react'

export interface DataTableColumnDefinition {
    title: string
    field: string
    width?: number
    link?: string
    getter?: () => unknown
}

interface props {
    columns: DataTableColumnDefinition[]
    rows: unknown[]
    count: number
    onPageChange: () => void
}

const DataTable = ({ columns, rows, count, onPageChange }: props) => {
    // const [limit, setLimit] = useState(10)
    // const [page, setPage] = useState(1)

    const { limit, page, setLimit, setPage } = useTableStateStore()

    const handleLimitChange = (v: number) => {
        const m = Math.ceil(count / v)
        if (m != v) {
            const p = Math.max(0, Math.min(page, m))
            setPage(p)
        }
        setLimit(v)
    }

    useEffect(() => {
        onPageChange()
    }, [page])

    return (
        <Container>
            <TableContainer sx={{ w: 1 }}>
                <Box
                    sx={{
                        py: 1,
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <FormControl>
                        <InputLabel id="select-limit">Лимит</InputLabel>
                        <Select
                            labelId="select-limit"
                            label="Лимит"
                            value={limit}
                            onChange={(e) =>
                                handleLimitChange(Number(e.target.value))
                            }
                            sx={{
                                minWidth: 300,
                            }}
                        >
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={25}>25</MenuItem>
                            <MenuItem value={50}>50</MenuItem>
                            <MenuItem value={100}>100</MenuItem>
                        </Select>
                    </FormControl>
                    <Pagination
                        count={Math.ceil(count / limit)}
                        page={page}
                        onChange={(_, value) => setPage(value)}
                    />
                    <Typography>Всего записей: {count}</Typography>
                </Box>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {columns.map((col) => (
                                <TableCell
                                    sx={{ minWidth: col.width }}
                                    key={col.field}
                                >
                                    {col.title}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row['id']}>
                                {columns.map((col) => (
                                    <TableCell key={col.field}>
                                        {col.link ? (
                                            <Link to={col.link}>
                                                {row[col.field]}
                                            </Link>
                                        ) : (
                                            <>{row[col.field]}</>
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )
}

export { DataTable }
