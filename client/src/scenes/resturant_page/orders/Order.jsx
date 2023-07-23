import {Box,Text,HStack} from "@chakra-ui/react"
import { Icons } from "../../../components/icon/Icon"

const Order = ({data})=>{

    return(
        <Box bg={"sudoRed.100"} mt={5} boxShadow={"lg"} padding={"10px"}>
            <HStack justifyContent={"flex-end"} marginBottom={"15px"}><Text>{data.createdAt}</Text></HStack>
            <Box>
                <HStack mb={5} display={"flex"}>
                    <Text mr={4}>{data.food.name}</Text>
                    <Text>quantity {data.quantity}</Text>
                </HStack>
            </Box>

      
            <Text>PhoneNumber : +251--{data.restaurant.phoneNumber}</Text>

            
        </Box>
    )
}

export default Order;