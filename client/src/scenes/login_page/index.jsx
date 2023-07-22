import {useState,useEffect} from "react";
import axios from "axios";
import {useSelector,useDispatch} from "react-redux"
import {useNavigate} from "react-router-dom";

import {Box,FormControl,FormLabel,Button,Select,Text} from "@chakra-ui/react";

import useShowToast from "../../hooks/useShowToast";

import UserForm from "./UserForm";
import ResturantForm from "./ResturantForm";
import AuthForm from "./AuthForm";
import {setLogin} from "../../slices/authSlice";

import { MainURL } from "../../other";


const Login = ()=>{
    const [pageType,setPageType] = useState("register")
    const [userType,setUserType] = useState("user")
    const isUser = userType === "user"
    const token = useSelector((state)=>state.auth.token)
    const [showToast] = useShowToast()
    const dispatch = useDispatch()
    const navigate = useNavigate();


    const login = (formData)=>{
        const urlType = userType === "user" ? "users" : "restaurants"
        axios.post(`http://${MainURL}:4000/api/auth/${urlType}/login`,formData)
        .then(res=>{

            dispatch(setLogin({
                user :isUser ? res.data:null,
                restaurant:isUser ? null: res.data,
                token : res.headers[`x-auth-token`] 
            }));

            showToast("Success","Successfully logged in","success")
            isUser ? navigate('/') : navigate(`/restaurant/bob`)
        })
        .catch(err=>{
            console.log(err)
            showToast("Failed","Failed to login","error")
        })
    };

    const register = (formData)=>{
        const urlType = userType === "user" ? "users" : "restaurants"
        axios.post(`http://${MainURL}:4000/api/${urlType}/register`,formData)
        .then(res=>{
            dispatch(setLogin({
                user :isUser ? res.data:null,
                restaurant:isUser ? null: res.data,
                token:res.headers[`x-auth-token`]
            }));
            showToast("Success","Successfuly registered","success")
            isUser ? navigate('/') : navigate(`/restaurant/${res.data.name}`)
        })
        .catch(err=>{
            showToast("Failed","Failed to register","error")
            console.log(err)
        })
    };
    const handleSelect = (e)=>{
        setUserType(e.target.value)
    }

    return(
        <Box display={"flex"} width={"100%"} height={"100vh"} justifyContent={"center"} alignContent={"center"}>
            <Box width={"800px"} boxShadow={"lg"} margin={"20px"} bg={"white"} padding={"20px"} maxHeight={"800px"}> 

            <Text textAlign={"center"} fontSize={"25px"} fontWeight={"bold"} marginBottom={"10px"}>{`${pageType} ${userType}`}</Text>

                <FormControl marginBottom={"30px"} width={"200px"}>
                    <FormLabel margin={0} color={"gray.600"} fontSize={"sm"} fontWeight={"light"}>User type</FormLabel>
                    <Select name="type" value={userType} onChange={handleSelect} size={"sm"} borderRadius={3}>
                        <option value={"user"}>user</option>
                        <option value={"Restaurant"}>restaurant</option>
                    </Select>
                </FormControl>

                <AuthForm pageType={pageType} register={register} login={login} userType={userType}/>
                    <Button 
                    variant={"link"}
                    onClick={()=>setPageType(pageType === "register" ? "login" : "register")}>
                        {pageType === "register" ? " Already have an account ?     Login" :
                        "Don't have an account ?   Register"}
                    </Button>
            </Box>
        </Box>
      
    )
}

export default Login;