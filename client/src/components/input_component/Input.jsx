import {useState} from "react"

import {FormControl,FormHelperText,Input,InputGroup,InputLeftElement,InputRightElement,FormLabel,Button,Text,Textarea,HStack,Flex} from "@chakra-ui/react";
import {ViewIcon,ViewOffIcon,SearchIcon,UnlockIcon} from "@chakra-ui/icons"
import {motion} from "framer-motion"
import { Icons } from "../icon/Icon";
import colors from "../../themes/colors";

import useToggleState from "../../hooks/useToggleState";

const FormInput = ({name,type,value,handleChange,error,iconLeft,iconRight,label,disabled=false})=>{
    const change = (e)=>{
        handleChange(e)
    }
    return(
        <FormControl marginTop={"0px"} minHeight={"70px"} padding={"0px"}>
            <FormLabel margin={0} color={"gray.600"} fontSize={"sm"} fontWeight={"light"}>{label && label}</FormLabel>
            <InputGroup>
                {iconLeft && <InputLeftElement height={"100%"}><Icons icon = {iconLeft}/></InputLeftElement>  }
                {iconRight && <InputLeftElement height={"100%"}><Icons icon = {iconRight}/></InputLeftElement>  }
                
                
                <Input
                    _focus={{borderWidth:"3px"}}
                    name={name} 
                    type={type} 
                    variant={"filled"}
                    placeholder={name}
                    value={value} 
                    bg={"cotton"}
                    onChange={change}
                    fontSize={"sm"}
                    size={"sm"}
                    disabled={disabled}
                    borderRadius={3}
                    borderWidth={error ? "2px" : "1px"}
                    borderColor={error ? "sudoRed.300" : "gray.500" }/>
            </InputGroup>
            <Text fontSize={"sm"} color={"sudoRed.900"}>{error && error}</Text>
        </FormControl>
    );
};

export const FormInputPassword = ({name,value,handleChange,error,label})=>{
    const [showPassword,toggleShowPassword] = useToggleState(false)
    const change = (e)=>{
        handleChange(e)
    }
    return(
        <FormControl marginTop={"0px"} minHeight={"70px"}>
            <FormLabel margin={0} color={"gray.600"} fontSize={"sm"} fontWeight={"light"}>{label && label}</FormLabel>
            <InputGroup display={"flex"} justifyContent={"center"} >
                <InputLeftElement height={"100%"}><Icons icon={"lock"} /></InputLeftElement>
                
                <Input
                    _focus={{borderWidth:"3px"}}
                    name={name} 
                    type={showPassword ? "text" : "password"} 
                    variant={"filled"}
                    bg={"cotton"}
                    placeholder={name}
                    value={value} 
                    onChange={change}
                    fontSize={"sm"}
                    size={"sm"}
                    borderRadius={3}
                    borderWidth={error ? "2px" : "1px"}
                    borderColor={error ? "sudoRed.300" : "gray.500"}
                    />

                <div onClick={toggleShowPassword}>
                    <InputRightElement  height={"100%"} >{showPassword ? <Icons icon={"eye slash"} color={colors.sudoGray[200]} /> : <Icons icon={"eye"} color={colors.sudoGray[400]}/> }</InputRightElement>
                </div>

            </InputGroup>
            <Text fontSize={"sm"} color={"sudoRed.900"}>{error && error}</Text>
        </FormControl>
    );
}

export const FormInputSearch = ({handleSearch})=>{
    const [formState,setFormState] = useState("")
    const handleChange = (e)=>{
        setFormState(e.target.value)
    }
    const search = (e)=>{
        e.preventDefault()
        handleSearch(formState)
    }
    const MotionInputGroup = motion(InputGroup)
    return(
        <form onSubmit={search}>
            <FormControl p={0}>
                <MotionInputGroup borderRadius={3} >
                    <Input type={"text"} value={formState} placeholder="search..." onChange={handleChange}  
                            variant={"filled"} bg={"cotton"} _hover={{boxShadow:"lg"}} _focus={{border:"none",boxShadow:"lg", width:"100%",bg:"cotton"}}/>
                    <InputLeftElement ><Button variant={"link"} type={"submit"}><SearchIcon/></Button></InputLeftElement>
                </MotionInputGroup>
            </FormControl>
        </form>
    )
}


export const FormTextarea = ({label,value,handleChange,name,error})=>{
    const change = (e)=>{
        handleChange(e)
    }
    return(
        <FormControl marginTop={"0px"} marginBottom={"10px"} padding={"0px"}>
            <FormLabel margin={0} color={"gray.600"} fontSize={"sm"} fontWeight={"light"}>{label && label}</FormLabel>
            <Textarea name={name} value={value} placeholder={error ? error : "description..."} onChange={change} borderRadius={3}></Textarea>
        </FormControl>
    )
}

export default FormInput;

