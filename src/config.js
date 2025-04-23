import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: "https://personalsite-7yf035rs.b4a.run/",
    withCredentials: true, // Important for sessions
})

// https://personalsite-7yf035rs.b4a.run/ 
// http://localhost:3005



// export const axiosInstance = axios.create({
//     baseURL: process.env.NODE_ENV === "production"
//       ? "https://personalsite-7yf035rs.b4a.run/"
//       : "http://localhost:3005",
//   });
