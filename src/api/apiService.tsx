import axios from "axios"
import { BASE_URL } from "./API"

export const registerToken = async (device_token: string) => {
    try {
        const res = await axios.post(`${BASE_URL}/notifications/register-token`, {
            device_token
        })
        console.log(res.data)
    } catch (error) {
        console.log(error)
    }
}