import axiosInstance  from "../utils/axiosInstance";
import endpoints from "./endpoints";

export const register = async (payload) => {
    try {
        const res = await axiosInstance.post(endpoints.auth.register, payload)
        return res
    } catch (error) {
        console.log(error.response.data.message)
        return (error.response)
    }
}

export const login = async () => {
    // try {
    //     const res = await axios.post(endpoints.auth.login,{})
    //     return res
    // } catch (error) {
    //     error.response
    // }
}