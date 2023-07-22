import React,{useState,useReducer,useEffect}from "react";

import {Button,Box,SimpleGrid} from "@chakra-ui/react";

import useFormValidate from "../../hooks/useFormValidate";

import { userRegisterSchema, loginSchema } from "../../joiSchemas/schemas";
import FormInput, { FormInputPassword } from "../../components/input_component/Input";


const initialState = {
    firstName : "",
    lastName: "",
    username:"",
    email : "",
    password : "",
    phoneNumber: ""
};

const UserForm = ({pageType,register,login})=>{

    const isRegister = pageType === "register"
    const [formState,setFormState] = useState(initialState)
    const [errors,validate,clearErrors] = useFormValidate();

    const handleChange = (e)=>{
        setFormState({...formState,[e.target.name]:e.target.value})
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(isRegister){
            const isValid = validate(userRegisterSchema,formState)
            if(isValid){
                register(formState)
            }
        }else{
            const isValid = validate(loginSchema,{email:formState.email,password:formState.password})
            if(isValid){
                login({email:formState.email,password:formState.password})
            }
        }
        setFormState(initialState)
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
                    <SimpleGrid spacing={5} minChildWidth={"200px"}>
                        <FormInput type={"text"} name="firstName" label={"First name"} iconLeft={"user"} value={formState.firstName} handleChange={handleChange} error={errors && errors.firstName}/>
                        <FormInput type={"text"} name="lastName"  label={"Last name"} iconLeft={"user outline"} value={formState.lastName} handleChange={handleChange} error={errors && errors.lastName}/>
                        <FormInput type={"text"} name="username" label={"username"} iconLeft={"at"} value={formState.username} handleChange={handleChange} error={errors && errors.username}/>
                    </SimpleGrid>
                    <FormInput type={"number"} name="phoneNumber" label={"phoneNumber"} iconLeft={"phone"} value={formState.phoneNumber} handleChange={handleChange} error={errors && errors.phoneNumber}/>
                    </>}
                    
                    <>
                    
                    <FormInput type={"email"} name="email" label={"Email"} iconLeft={"envelope"} value={formState.email} handleChange={handleChange} error={errors && errors.email}/>
                    <FormInputPassword name="password" label={"Password"} value={formState.password} handleChange={handleChange} error={errors && errors.password} icon={true}/>
                    </>
                

                <Button type="submit" width="100%">{pageType}</Button>

            </form>

        </Box>
    )
}

export default UserForm;