import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: "http://localhost:3005",
    withCredentials: true,
})

// https://portfolio-api-yey0.onrender.com/
// http://localhost:3005
