import {Outlet} from "react-router-dom";
import Header from "../components/Header.tsx";
import {Container} from "@chakra-ui/react";

function AppLayout() {
    return (
        <div className="flex flex-col items-center w-full">
            <Header/>
            <Container className="mb-24">
                <Outlet/>
            </Container>
            <footer className="flex justify-center">
                2024 &copy; rE
            </footer>
        </div>
    );
}

export default AppLayout;