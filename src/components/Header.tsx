import {Link, useNavigate} from "react-router-dom";
import {Button, Flex, Image} from "@chakra-ui/react";
import {useUserStore} from "../zustand/store.ts";
import {useMutation} from "react-query";
import {logout} from "../service/auth.ts";
import Logo from "../assets/sladkoezhkovo.svg"
const Header = () => {

    const email = useUserStore(state => state.email)
    const logoutState = useUserStore(state => state.logout)

    const navigate = useNavigate()

    const {mutate} = useMutation({
        mutationFn: logout,
        onSuccess: () => {
            logoutState()
            navigate("/")
        }
    })

    return (
        <header className=" flex justify-center py-6 mb-24 border-b-2 w-full shadow-xl">
            <div className="flex justify-between w-10/12 items-center">
                <Link to="/">
                    <Image src={Logo} alt="sladkoezhkovo."/>
                </Link>
                <Link to="/dashboard">
                    <Button>Админка</Button>
                </Link>

                {email ? (
                    <Flex alignItems={"center"}>
                        <h2>{email}</h2>
                        <Button className="ml-4" onClick={() => mutate()}>Выход</Button>
                    </Flex>
                ) : (
                    <Link to="/sign-in">
                        <Button>
                            Авторизоваться
                        </Button>
                    </Link>
                )}
            </div>
        </header>
    );
};

export default Header;