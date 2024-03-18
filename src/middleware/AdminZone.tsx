import {Navigate, Outlet, useLocation, useNavigate} from "react-router-dom";
import {useAuth} from "../hooks/useAuth.ts";
import {Center, Spinner, useToast} from "@chakra-ui/react";

const AdminZone = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const toast = useToast()

    const handleError = (err: Error) => {
        toast({
            title: err.message,
            status: "error",
            isClosable: true,
            position: "bottom-left",
        })
        navigate("/")
    }

    const {isError, isLoading} = useAuth(1, handleError)

    if(isLoading) {
        return (
            <Center>
                <Spinner thickness="4px" size="xl" />
            </Center>
        )
    }

    if(isError) {
        return <Navigate to='/' state={{from: location}}/>
    }

    return <Outlet/>;
}

export {AdminZone}