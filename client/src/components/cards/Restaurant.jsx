import {Card,CardBody,CardHeader,CardFooter,Divider,HStack,Button,Text,Box,Flex,Heading,Image,Spacer,useMediaQuery} from "@chakra-ui/react";
import { Icons } from "../icon/Icon";
import colors from "../../themes/colors";

import {Link} from "react-router-dom";
import { MainURL } from "../../other";

const Restaurant = ({id,restaurantData}) =>{
    const [isSmall] = useMediaQuery('(max-width: 500px)')

    return(
        <Card bg={"cotton"} size="sm" maxWidth={isSmall ? "100%" :"250px"} minWidth={"200px"} borderRadius={"none"} boxShadow={"md"} border={`solid 1px ${colors.sudoGray[100]}`}>
            <CardHeader>
                <Flex gap={5} justifyContent="center">
                    <Heading as="h3" size="sm">{restaurantData.name}</Heading>
                </Flex>
            </CardHeader>
            <Box height={"150px"} display={"flex"} alignItems={"center"} bg={"gray.100"} overflow={"hidden"}>
                <Image src={restaurantData.profilePicture ? restaurantData.profilePicture :`/restaurantDefault.jpg`} 
                width={"100%"} height={"100%"} fit={"cover"}/>
            </Box>
            <Spacer/>
            <CardBody color="gray.400" fontSize="13px">
                <HStack>
                    <Icons icon={"map marker"} />
                    <Text>{restaurantData.address}</Text>
                </HStack>
                <HStack marginTop={"10px"} marginBottom={"10px"}>
                    <Box height={"100%"}>
                    <Icons icon={"tag"} height={"100%"} alignItems={"flex-start"} />
                    </Box>
                    <Text> {restaurantData.description.length >= 100 ? restaurantData.description.slice(0,100)+"..." : restaurantData.description }</Text>
                </HStack>
                
                <Spacer/>
                <Text color={"sudoRed.900"} _hover={{color:"sudoRed.200"}}><Link to={`/restaurants/${id}`} state={{restaurantData}}>see more</Link></Text>   
            </CardBody>
        </Card>
        
    );
}

export default Restaurant;
