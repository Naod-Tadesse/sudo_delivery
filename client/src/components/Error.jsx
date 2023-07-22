import {Box,HStack,Text} from "@chakra-ui/react"

const Error = ()=>{
    return(
        <Box as="flex"  alignItems={"center"} height={"100%"}>  
            <Text textAlign={"center"} fontSize={"xl"}>404 NOT FOUND</Text>
        </Box>
    )
}

export default Error