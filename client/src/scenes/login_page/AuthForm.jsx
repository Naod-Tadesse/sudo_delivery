import React,{useState,useReducer,useEffect}from "react";

import {Button,Box,SimpleGrid,Text} from "@chakra-ui/react";

import useFormValidate from "../../hooks/useFormValidate";

import { userRegisterSchema, restaurantRegisterSchema, loginSchema } from "../../joiSchemas/schemas";
import FormInput, { FormInputPassword } from "../../components/input_component/Input";

import {motion,AnimatePresence} from "framer-motion";


const initialState = {
    firstName : "",
    lastName: "",
    username:"",

    restaurantName:"",
    restaurantAddress: "",

    email : "",
    password : "",
    phoneNumber: "+251-- "
};

const AuthForm = ({pageType,userType,register,login})=>{

    const isRegister = pageType === "register"
    const isUser = userType === "user"
    const [formState,setFormState] = useState(initialState)
    const [errors,validate,clearErrors] = useFormValidate();

    const MotionBox = motion(Box)

    const handleChange = (e)=>{
        setFormState({...formState,[e.target.name]:e.target.value})
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        const userRegister = {
            firstName : formState.firstName,
            lastName: formState.lastName,
            username: formState.username,
            email : formState.email,
            password : formState.password,
            phoneNumber: formState.phoneNumber
        }
        const restaurantRegister = {
            restaurantName: formState.restaurantName,
            restaurantAddress: formState.restaurantAddress,
            email : formState.email,
            password : formState.password,
            phoneNumber: formState.phoneNumber
        }
        if(isRegister){
            const isValid = validate(isUser ? userRegisterSchema : restaurantRegisterSchema ,isUser ? userRegister : restaurantRegister)
            if(isValid){
                register(isUser ? userRegister : 
                    {name:formState.restaurantName,address:formState.restaurantAddress,email:formState.email,password:formState.password,phoneNumber:formState.phoneNumber})
            }
        }else{
            const isValid = validate(loginSchema,{email:formState.email,password:formState.password})
            if(isValid){
                login({email:formState.email,password:formState.password})
            }
        }
    };

    useEffect(()=>{
        setFormState(initialState)
        clearErrors();
    },[pageType])

    return(
        <Box>
            <form onSubmit={handleSubmit}>
                {/* Register */}
                { isRegister &&
                    <>
                    {isUser ? 
                        
                            <Box>
                                <FormInput type={"text"} name="firstName" label={"First name"} disabled={!isUser}
                                    iconLeft={"user"} value={formState.firstName} handleChange={handleChange} error={errors && errors.firstName}/>

                                <FormInput type={"text"} name="lastName"  label={"Last name"} disabled={!isUser}
                                    iconLeft={"user outline"} value={formState.lastName} handleChange={handleChange} error={errors && errors.lastName}/>

                                <FormInput type={"text"} name="username" label={"username"} disabled={!isUser}
                                    iconLeft={"at"} value={formState.username} handleChange={handleChange} error={errors && errors.username}/>

                            </Box>
                        
                            :
                        
                            <Box>
                                    <FormInput type={"text"} name="restaurantName" label={"restaurantName"} disabled={isUser}
                                        iconLeft={"building"} value={formState.restaurantName} handleChange={handleChange} error={errors && errors.restaurantName}/>

                                    <FormInput type={"text"} name="restaurantAddress"  label={"restaurantAddress"} disabled={isUser}
                                        iconLeft={"map marker"} value={formState.restaurantAddress} handleChange={handleChange} error={errors && errors.restaurantAddress}/>
                                </Box>
                        
                    }
                    <FormInput type={"number"} name="phoneNumber" label={"phoneNumber"} iconLeft={"phone"} value={formState.phoneNumber} handleChange={handleChange} error={errors && errors.phoneNumber}/>
                    </>}
                    
                    <>
                    
                    <FormInput type={"email"} name="email" label={"Email"} iconLeft={"envelope"} value={formState.email} handleChange={handleChange} error={errors && errors.email}/>
                    <FormInputPassword name="password" label={"Password"} value={formState.password} handleChange={handleChange} error={errors && errors.password} icon={true}/>
                    </>
                

                <Button type="submit" width="100%" bg={"sudoRed.900"} color={"cotton"} fontSize={"lg"} _hover={{bg:"sudoRed.500"}} borderRadius={"3px"}>{pageType}</Button>

            </form>

        </Box>
    )
}

export default AuthForm;