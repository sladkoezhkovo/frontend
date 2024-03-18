import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import { UsersTable } from '../components/tables/UsersTable.tsx'

const DashboardPage = () => {
    return (
        <>
            <Box>
                <Tabs>
                    <TabList>
                        <Tab>Пользователи</Tab>
                        <Tab>Города</Tab>
                        <Tab>Районы</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <UsersTable />
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
