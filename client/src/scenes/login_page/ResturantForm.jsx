import React,{useState,useReducer,useEffect}from "react";

import {Button,SimpleGrid} from "@chakra-ui/react";

import useFormValidate from "../../hooks/useFormValidate";

import FormInput,{FormInputPassword} from "../../components/input_component/Input";
import { loginSchema,restaurantRegisterSchema } from "../../joiSchemas/schemas";

import { ButtonAnimated } from "../../components/Buttons/SmanticButtons";


const initialState = {
    name : "",
    address: "",
    email : "",
    password : "",
    phoneNumber : ""
};

const ResturantForm = ({pageType,register,login})=>{

    const isRegister = pageType === "register"
    const [formState,setFormState] = useState(initialState)
    const [errors,validate,clearErrors] = useFormValidate();

    const handleChange = (e)=>{
        setFormState({...formState,[e.target.name]:e.target.value})
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        if(isRegister){
           const isValid = validate(restaurantRegisterSchema,formState)
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
        <div className="CompleteForm">
            <form onSubmit={handleSubmit}>
                { isRegister &&
                    <SimpleGrid spacing={5} minChildWidth={"200px"}> 
                    <>
                        <FormInput type={"text"} name="name" label={"Name"} iconLeft={"building"} value={formState.name} handleChange={handleChange} error={errors && errors.name}/>
                        <FormInput type={"text"} name="address" label={"Address"} iconLeft={"map marker"} value={formState.address} handleChange={handleChange} error={errors && errors.address}/>
                        <FormInput type={"number"} name={"phoneNumber"} iconLeft={"phone"} label={"PhoneNumber"} value={formState.phoneNumber} handleChange={handleChange} error={errors && errors.phoneNumber}/>
                    </>
                    </SimpleGrid>
                }
                    <FormInput type={"email"} name={"email"} iconLeft={"envelope"} label={"Email"} value={formState.email} handleChange={handleChange} error={errors && errors.email}/>
                    <FormInputPassword type={"password"} name="password" label={"Password"} value={formState.password} handleChange={handleChange} error={errors && errors.password}/>
                <Button width={"100%"} type={"submit"}>{pageType}</Button>
            </form>
                
        </div>
    )
}

export default ResturantForm;