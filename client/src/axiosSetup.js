import axios from "axios";
import { MainURL } from "./other";

const client = axios.create({
    baseURL : `https://sudo-delivery.vercel.app/api/`,
  })
// baseURL : `http://${MainURL}:4000/api/`,
  client.interceptors.request.use(
    (config) => {
        const item = JSON.parse(localStorage.getItem('persist:root'));
        const token = item && JSON.parse(item.auth).token
        config.headers['x-auth-token']= `${token}`
        return config
      },
    (error) => {
        return Promise.reject(error)
      }
)

// client.interceptors.response.use(
//   (response)=>{
//     return response;
//   },
//   (error)=>{
//     return "error";
//   }
// )

export default client;
