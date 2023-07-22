import {useReducer} from "react";
import client from "../axiosSetup";

const initialState = {
    loading:false,
    response:null,
    error:null
}

const LOADING = "LOADING"
const RESPONSE = "RESPONSE"
const ERROR = "ERROR"

const reducer = (state,action)=>{
    switch(action.type){
        case LOADING:
            return {
                loading:true,
                response: null,
                error:null
            }
        case RESPONSE:
            return {
                loading:false,
                response:action.payload.response,
                error:null
            }
        case ERROR:
            return {
                loading:false,
                response:null,
                error:action.payload.error
            }
        default:
            return state
    }
}

const useRequest = () =>{

    const [state,dispatch] = useReducer(reducer,initialState)

    const action = (url,method,data)=>{
        if(method === "POST"){
            return new Promise((resolve,reject) => {
                dispatch({type:LOADING})
                client.post(url,data)
                .then(res=>{
                    dispatch({text:RESPONSE,
                        payload:{
                            response:res.data
                        }})
                    resolve(res)
                })
                .catch(error => {
                    dispatch({type:ERROR,
                        payload:{
                            error:error
                        }})
                    reject(error)
                })
            })
            }
        if(method === "PUT"){
            return new Promise((resolve, reject) => {
                dispatch({type:LOADING})
                client.put(url,data)
                .then(res=>{ 
                    dispatch({type:RESPONSE,
                        payload:{
                            response:res.data
                        }});
                    resolve(res)
                })
                .catch(error =>{
                    dispatch({type:ERROR,
                        payload:{
                            error:error
                        }
                    })
                    reject(error.message)
                })
            })
            
        }
        if(method === "GET"){
            return new Promise((resolve, reject) => {
                dispatch({type:LOADING})
                client.get(url,{
                    params:data
                })
                .then(res=>{
                    dispatch({type:RESPONSE,
                        payload:{
                            response:res.data
                        }})
                    resolve(res)
                })
                .catch(error=>{
                    dispatch({type:ERROR,
                        payload:{
                            error:error
                        }})
                    reject(error)
                })
            })
        }
        if(method === "PATCH"){
            return new Promise((resolve, reject) => {
                dispatch({type:LOADING})
                client.patch(url,data)
                .then(res=>{
                    dispatch({type:RESPONSE,
                        payload:{
                            response:res.data
                        }})
                    resolve(res)
                })
                .catch(error=>{
                    dispatch({type:ERROR,
                        payload:{
                            error:error
                        }})
                    reject(error)
                })
            })
        }
        if(method === "DELETE"){
            return new Promise((resolve, reject) => {
                dispatch({type:LOADING})
                client.delete(url,{
                    params:data
                })
                .then(res=>{
                    dispatch({type:RESPONSE,
                        payload:{
                            response:res.data
                        }})
                    resolve(res)
                })
                .catch(error=>{
                    dispatch({type:ERROR,
                        payload:{
                            error:error
                        }})
                    reject(error)
                })
            })
        }else{
            dispatch({type:LOADING})
        }}
        return [state.loading,state.response,state.error,action]
    }
   
export default useRequest;