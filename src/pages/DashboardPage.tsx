import {Box, Tab, TabList, TabPanel, TabPanels, Tabs} from "@chakra-ui/react";

const DashboardPage = () => {
    return (
        <>
            <Box>
               <Tabs>
                   <TabList>
                       <Tab>Города</Tab>
                       <Tab>Районы</Tab>
                   </TabList>
                   <TabPanels>
                        <TabPanel>
                            Города
                        </TabPanel>
                       <TabPanel>
                           Районы
                       </TabPanel>
                   </TabPanels>
               </Tabs>
            </Box>
        </>
    );
}

export {DashboardPage};