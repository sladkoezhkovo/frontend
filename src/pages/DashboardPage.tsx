import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import { UsersTable } from '../components/tables/UsersTable.tsx'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Table } from '../components/Table.tsx'
import { RolesTable } from '../components/tables/RolesTable.tsx'
import { getUsers } from '../service/users.ts'
import { getRoles } from '../service/roles.ts'

const DashboardPage = () => {
    const [tabIndex, setTabIndex] = useState(0)

    const location = useLocation()

    useEffect(() => {
        if (location.hash) {
            const n = Number(location.hash.replace('#', ''))
            setTabIndex(n)
        }
    }, [])

    const changeTabIndex = (index: number) => {
        location.hash = `#${index}`
        setTabIndex(index)
    }

    return (
        <>
            <Box>
                <Tabs onChange={changeTabIndex} index={tabIndex}>
                    <TabList>
                        <Tab>Пользователи</Tab>
                        <Tab>Роли</Tab>
                        <Tab>Города</Tab>
                        <Tab>Районы</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Table
                                name={'users'}
                                contentFn={(limit, page, setCount) => (
                                    <UsersTable
                                        setCount={setCount}
                                        queryFn={() =>
                                            getUsers(limit, (page - 1) * limit)
                                        }
                                    />
                                )}
                            />
                        </TabPanel>
                        <TabPanel>
                            <Table
                                name={'roles'}
                                contentFn={(limit, page, setCount) => (
                                    <RolesTable
                                        setCount={setCount}
                                        queryFn={() =>
                                            getRoles(limit, (page - 1) * limit)
                                        }
                                    />
                                )}
                            />
                        </TabPanel>
                        <TabPanel>Города</TabPanel>
                        <TabPanel>Районы</TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </>
    )
}

export { DashboardPage }
