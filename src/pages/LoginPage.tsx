import {useState} from "react";
import {signIn} from "../service/auth.ts";
import {useMutation} from "react-query";
import {useLocation, useNavigate} from "react-router-dom";
import {useUserStore} from "../zustand/store.ts";
import {Button, Flex, FormControl, FormLabel, Input, useToast, VStack} from "@chakra-ui/react";

function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const toast = useToast()
    const navigate = useNavigate()
    const {state} = useLocation()

    const isAuth = !!useUserStore(state => state.email)

    if (isAuth) {
        return (
            <div className="flex justify-center">
                <h2>Вы уже авторизованы</h2>
            </div>
        )
    }

    const update = useUserStore(state => state.update)

    const {mutate} = useMutation({
            mutationFn: () => signIn(email, password),
            onSuccess: () => {
                update(email)
                navigate(state ? state.from : "/")
            },
            onError: () => {
                toast({
                    title: "Неверный email или пароль",
                    status: "error",
                    isClosable: true,
                    position: "bottom-left"
                })
            }
        })

    const handleButton = async () => {
        if (isError) {
            toast({
                title: "Введите корректные данные",
                status: "error",
                isClosable: true,
                position: "bottom-left",
            })
            return
        }
        mutate()
    }

    const validateEmail = (email: string) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const isError = validateEmail(email) == null || password.length < 8


    return (
        <>
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4 items-center justify-center">
                <VStack className="py-6 px-12 rounded shadow-xl">
                    <FormControl isInvalid={isError} isRequired>
                        <FormLabel>Email</FormLabel>
                        <Input
                            w="96"
                            required
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            isInvalid={validateEmail(email) == null}
                            errorBorderColor='crimson'
                        />
                        <FormLabel>Пароль</FormLabel>
                        <Input
                            required
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            isInvalid={password.length < 8}
                            errorBorderColor='crimson'
                        />
                        <Flex mt={13} w="inherit" justifyItems="end">
                            <Button type="submit" onClick={handleButton}>
                                Авторизоваться
                            </Button>
                        </Flex>
                    </FormControl>
                </VStack>
            </div>
        </>
    )


}

export {LoginPage}
