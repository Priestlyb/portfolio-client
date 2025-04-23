import axios from "axios"

let baseURL;

switch (window.location.hostname) {
  case "localhost":
  case "127.0.0.1":
    baseURL = "http://localhost:3005";
    break;

  default:
    baseURL = "https://personalsite-7yf035rs.b4a.run/";
    break;
}

export const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});


// https://personalsite-7yf035rs.b4a.run/ 
// http://localhost:3005



// export const axiosInstance = axios.create({
//     baseURL: process.env.NODE_ENV === "production"
//       ? "https://personalsite-7yf035rs.b4a.run/"
//       : "http://localhost:3005",
//   });
