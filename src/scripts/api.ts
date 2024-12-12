import { myAxios } from "@/instances/myAxios";
import { Registration } from "@/types/Registration"
import axios from "axios"
import type { AxiosResponse } from "axios"

const addRegistration = async <T>(registration: Registration): Promise<AxiosResponse<T>> => {
    console.log(registration)
    return myAxios.post<T>(`/registration`, registration)
}

export { addRegistration }