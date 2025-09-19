import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: "https://portfolio-api-yey0.onrender.com/",
    withCredentials: true,
})

// https://portfolio-api-yey0.onrender.com/
// http://localhost:3005
