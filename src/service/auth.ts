import api from "../api/api.ts";
import {Response, SignInResponse} from "../types/dto.ts";
import {RequestError, TimeoutError} from "../errors/forbidden.ts";
import {AxiosError} from "axios";

export async function signIn(email: string, password: string) {
    const res = await api.post<Response<SignInResponse>>("/sign-in", {
        email, password
    }, {
        withCredentials: true
    })
    if (res.status != 200) {
        throw new Error("Cannot login")
    }

    localStorage.setItem("access_token", res.data.data.accessToken)
}

export async function logout() {
    await api.post("/logout");
    localStorage.removeItem("access_token");
}


export async function checkAuth(roleId:  number) {
    const r = await api.post(`/auth?role_id=${roleId}`)
    if (r instanceof AxiosError) {
        if (r.response != null) {
            const status = r.response.status;
            if (status != 200) {
                if (r.response.data.message === "no Authorization header") {
                    throw new Error("Не авторизован")
                }
                throw new Error(r.response?.data.message)
            }
        } else {
            throw new Error("Превышено время ожидания")
        }

    }

    return true;
}
