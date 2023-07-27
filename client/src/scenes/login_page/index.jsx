import {useState,useEffect} from "react";
import axios from "axios";
import {useSelector,useDispatch} from "react-redux"
import {useNavigate} from "react-router-dom";

import {Box,FormControl,FormLabel,Button,Select,Text} from "@chakra-ui/react";

import useShowToast from "../../hooks/useShowToast";

import AuthForm from "./AuthForm";
import {setLogin} from "../../slices/authSlice";

import { MainURL } from "../../other";

import {motion} from "framer-motion"

import { Side } from "./Side";


const Login = ()=>{
    const [pageType,setPageType] = useState("register")
    const [userType,setUserType] = useState("user")
    const isUser = userType === "user"
    const token = useSelector((state)=>state.auth.token)
    const [showToast] = useShowToast()
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const MotionText = motion(Text)


    const login = (formData)=>{
        const urlType = userType === "user" ? "users" : "restaurants"
        axios.post(`${MainURL}/api/auth/${urlType}/login`,formData)
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
            showToast("Failed","Failed to login","error")
        })
    };

    const register = (formData)=>{
        const urlType = userType === "user" ? "users" : "restaurants"
        axios.post(`${MainURL}/api/${urlType}/register`,formData)
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
        })
    };
    const handleSelect = (e)=>{
        setUserType(e.target.value)
    }

    return(
        <Box display={"flex"} width={"100%"} height={"100vh"} justifyContent={"space-between"} alignContent={"center"} backgroundImage={"./front.jpg"} backgroundPosition={"bottom left"}> 

            <Box width={"60%"} display={"flex"} justifyContent={"center"} flexDirection={"column"} marginLeft={"100px"} color={"sudoRed.900"}>
                <Side/>
            </Box>


            <Box width={"450px"} boxShadow={"lg"} margin={"20px"} padding={"30px"} paddingTop={"10px"} height={"630px"} marginRight={"100px"} bg={"cotton"} borderRadius={"3px"}> 

                <Text textAlign={"center"} fontSize={"20px"} fontWeight={"bold"} color={"sudoRed.900"}>{`${pageType} ${userType}`}</Text>

                <FormControl marginBottom={"10px"} width={"200px"}>
                    <FormLabel margin={0} color={"gray.600"} fontSize={"md"} fontWeight={"light"}>User type</FormLabel>
                    <Select name="type" value={userType} onChange={handleSelect} size={"md"} borderRadius={3}>
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