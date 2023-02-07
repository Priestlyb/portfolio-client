import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: "https://portfolio-api.adaptable.app/"
})