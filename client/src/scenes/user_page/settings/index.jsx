import React,{useState}from "react";
import {useSelector,useDispatch} from "react-redux";

import {Button,Box,Flex,SimpleGrid,Text,FormControl,FormLabel,Input,Image} from "@chakra-ui/react";

import useFormValidate from "../../../hooks/useFormValidate";
import useRequest from "../../../hooks/useRequest";
import useShowToast from "../../../hooks/useShowToast";

import FormInput, { FormInputPassword } from "../../../components/input_component/Input";
import { setUser } from "../../../slices/authSlice";
import DeleteModal from "../../../components/modals/DeleteModal";

import { userSettingsSchema, userSettingsSchemaWithoutPassword } from "../../../joiSchemas/schemas";
import { Icons } from "../../../components/icon/Icon";
import colors from "../../../themes/colors";
import { ImageInput } from "../../../components/input_component/ImageInput";

const Settings = ()=>{
    const user = useSelector((state)=>state.auth.user);
    const [showToast] = useShowToast()
    const dispatch = useDispatch()
    const initialState = {
        firstName : user.firstName,
        lastName: user.lastName,
        username: user.username,
        email : user.email,
        phoneNumber : user.phoneNumber,
        password : "",
        profilePicture:[]
    };
    const [formState,setFormState] = useState(initialState)
    const [preview,setPreview] = useState("");
    const [editing,setEditing] = useState(false)
    const [isLoading,response,error,request] = useRequest();
    const [errors,validate,clearErrors] = useFormValidate();

    const handleChange = (e)=>{
        setFormState({...formState,[e.target.name]:e.target.value})
    };

    const selectFiles = (e) =>{
    
        const prev = []
        
        setFormState({...formState,profilePicture:e.target.files[0]})
        const selected = Array.from(e.target.files)
        const selectedImgs = selected.map(item=>URL.createObjectURL(item))
        for(let item of selectedImgs){
          prev.push(item)
        }
        setPreview(prev)
        setEditing(true)
      }
    const handleSubmit = (e)=>{
        e.preventDefault()
        clearErrors()
        const formData = new FormData


        const data = {
            firstName : formState.firstName,
            lastName: formState.lastName,
            username: formState.username,
            email : formState.email,
            phoneNumber : formState.phoneNumber,
        }
        const valid = validate(formState.password === "" ?  userSettingsSchemaWithoutPassword:userSettingsSchema,formState.password === "" ?  data : {...data,password:formState.password})
        const dataWithPassword = {
                firstName : formState.firstName,
                lastName : formState.lastName,
                username : formState.username,
                email : formState.email,
                phoneNumber : formState.phoneNumber,
                password : formState.password

        }
        const dataWithoutPassword = {
                firstName : formState.firstName,
                lastName : formState.lastName,
                username : formState.username,
                email : formState.email,
                phoneNumber : formState.phoneNumber
        }

        formData.append("userId",user._id)
        formData.append("email",user.email)
        if(formState.password === ""){
            formData.append("changes",JSON.stringify(dataWithoutPassword))
        }else{
            formData.append("changes",JSON.stringify(dataWithPassword))
        }
        // formData.append("profilePicture",formState.profilePicture)
        if(editing){
            formData.append("profilePicture",formState.profilePicture)
        }

        if(valid){

        request("user/profile/editProfile","PUT",formData)
        .then(res=>{dispatch(setUser({
            user:res.data
        }))
            showToast("Success","Saved changes successfuly","success")}
        )
        .catch(error=>{
            showToast("Failed","Failed to save changes","error")
        })
        }
        
    }
    const removeImage = ()=>{
        setFormState({...formState,profilePicture:[]})
        setPreview("deleted")
        setEditing(true)
    }

    
    return( 
            <Box marginTop={"10px"} padding={"20px"}>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <Text>Edit User Information</Text>
                    <SimpleGrid minChildWidth={200} spacing={"10px"}>
                        <FormInput type={"text"} name="firstName" value={formState.firstName} label={"First name"} handleChange={handleChange} error={errors && errors.firstName}/>
                        <FormInput type={"text"} name="lastName" value={formState.lastName} label={"Last name"} handleChange={handleChange} error={errors && errors.lastName}/>
                        <FormInput type={"text"} name="username" value={formState.username} label={"Username"} handleChange={handleChange} error={errors && errors.username}/>
                    </SimpleGrid>

                    <ImageInput selectFiles={selectFiles} removeImage={removeImage} preview={preview} type={"user"}/>

                    <Text color={"sudoGray.900"}>Edit Email & Password</Text>
                    <SimpleGrid minChildWidth={200} spacing={"10px"}>
                        <FormInput type={"email"} name="email" value={formState.email} label={"Email"} handleChange={handleChange} error={errors && errors.email}/>
                        <FormInput type={"text"} name="phoneNumber" value={formState.phoneNumber} label={"PhoneNumber"} handleChange={handleChange} error={errors && errors.phoneNumber}/>
                    </SimpleGrid>
                    <SimpleGrid>
                        <FormInputPassword type={"password"} name="password" value={formState.password} label={"Password"} handleChange={handleChange} error={errors && errors.password}/>
                    </SimpleGrid>

                    <Button type={"submit"} width="30%" isDisabled={isLoading} color={"cotton"} bg={"sudoRed.900"} borderRadius={3} _hover={{bg:"sudoRed.500"}}>
                        <Icons icon={"save"} color={colors.cotton}/>
                    </Button>
                </form>
                <Box bg={"sudoRed.200"} marginTop={"20px"} padding={10} borderRadius={3}>
                    <Box color={"sudoRed.900"} marginBottom={"20px"}>
                        <Text  fontSize={"30px"}>Warning!</Text>
                        <Text>this action is irriversible</Text>
                    </Box>

                    <DeleteModal id={user._id} type={"user"}/>
                </Box>      
            </Box>
    )
}

export default Settings;