import { io } from "socket.io-client";
import { MainURL } from "./other";



const url = `${MainURL}`


export const socket = io(url,{
    autoConnect:false
})



