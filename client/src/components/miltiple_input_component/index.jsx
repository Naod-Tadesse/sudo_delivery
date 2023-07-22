import { useState, useRef } from "react";
import {Text,FormControl,Flex,Input,Button} from "@chakra-ui/react"



const FormInputMultiple = ({value,add,name,remove,error}) =>{
    const [state,setState]=useState("")
    const inputRef = useRef()
    const handleChange = (e)=>{
        setState(e.target.value)
    }
    const handleAdd = (e)=>{
        if(state === ""){
            return null
        }else{
            if(!value.some(i => i === state)){
                add(state.toLocaleLowerCase())
                setState("")
            }else{
                setState("")
            }
        }

        inputRef.current.focus()
    }
    return(
        <>
        <Flex minH={"40px"} flexWrap={"wrap"} paddingTop={"10px"} paddingBottom={"10px"}>
           {value.map((item,idx)=><Text  key={idx} id={idx} marginLeft={"10px"} onClick={()=>remove(item)}>{item}</Text>)}
        </Flex>
        <FormControl marginBottom={"50px"}>
            <Flex>
                <Input name={name} type={"text"} value={state} onChange={handleChange} marginRight={"0px"} borderRightRadius={0} placeholder={name} ref={inputRef} size={"sm"}/>
                <Button marginInlineStart={"0px"} marginStart={"0px"} marginInline={"0px"} borderLeftRadius={0} borderRightRadius={3} width={"300px"} onClick={handleAdd} size={"sm"}>add</Button>
            </Flex>
            <Text>{error && error}</Text>
        </FormControl>
        </>
    )
}

export default FormInputMultiple;