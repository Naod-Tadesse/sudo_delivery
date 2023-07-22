import { io } from "socket.io-client";
import { MainURL } from "./other";



const url = `http://${MainURL}:4000`


export const socket = io(url,{
    // withCredentials:true,
    // extraHeaders:{
    //     "my-custom-header":"abc"
    // },
    autoConnect:false
})



