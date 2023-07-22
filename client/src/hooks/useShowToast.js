import {useToast} from "@chakra-ui/react";

const useShowToast = ()=>{
    const toast = useToast()

    const showToast = (title,description,status)=>{toast({
        title:title,
        description:description,
        duration:2000,
        status:status
    })}

    return [showToast]
}

export default useShowToast
