import { myAxios } from "@/instances/myAxios";
import { Registration } from "@/types/Registration"
import axios from "axios"
import type { AxiosResponse } from "axios"

const addRegistration = async <T>(registration: Registration): Promise<AxiosResponse<T>> => {
    console.log(registration)
    const form = new FormData();
    form.append('firstname', registration.firstname);
    form.append('lastname', registration.lastname);
    //form.append('birth', new Date(registration.dateOfBirth).toISOString());
    form.append('email', registration.email);
    form.append('gender', registration.gender);
    form.append('sexuality', registration.sexuality);
    if (registration.pictures && Array.isArray(registration.pictures)) {
        registration.pictures.forEach((pic) => {
            form.append('pictures[]', pic);  // Append each picture as a Blob
        });
    }

    return myAxios.post<T>(`/registration`, form, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
}

export { addRegistration }