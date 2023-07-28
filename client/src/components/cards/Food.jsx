import {Card,CardBody,CardHeader,HStack,Text,Box,Flex,Heading,Image,Spacer,useMediaQuery} from "@chakra-ui/react";
import { addToCart } from "../../slices/cartSlice";
import {useDispatch} from "react-redux";
import { MainURL } from "../../other";
import useShowToast from "../../hooks/useShowToast";
import {Link} from "react-router-dom";

import { ButtonDefault } from "../Buttons/Button";
import { Icons } from "../icon/Icon";
import colors from "../../themes/colors";
import {motion} from "framer-motion";

const Food = ({id,foodData}) =>{
    const [isSmall] = useMediaQuery('(max-width: 500px)')
    const [showToast] = useShowToast()
    const MotionCard = motion(Card)
    const dispatch = useDispatch()
    const random = Math.random() + 0.5

    const addItem = (foodData) =>{
        dispatch(addToCart({
            name: foodData.name,
            id: id,
            price: foodData.price,
        })) 
        showToast("success","added to cart","success")
    }

    return(

        <MotionCard bg="white" size="sm" maxWidth={isSmall ? "100%" :"250px"} minWidth={"200px"} borderRadius={"5px"} boxShadow={"md"} 
            initial={{scale:random,opacity:0.2,y:100}} animate={{scale:1,opacity:1,y:0}} transition={{type:"tween"}}  >
            <CardHeader>
                <Flex gap={5} justifyContent={"center"}>
                    <Heading as="h3" size="sm">{foodData.name}</Heading>
                </Flex>
            </CardHeader>
            <Box height={"150px"} display={"flex"} alignItems={"center"} bg={"gray.100"} overflow={"hidden"}>
                <Image src={foodData.image[0]} width={"100%"} height={"100%"} fit={"cover"}/>
            </Box>
            <Spacer/>
            <CardBody color={"gray.400"} fontSize={"13px"}>
                <Box display={"flex"} justifyContent={"space-between"} marginBottom={"10px"}>
                    <HStack spacing={0}>
                        <Icons icon={"dollar"} color={colors.sudoGreen[600]}/>
                        <Text color={"sudoGreen.600"}>{foodData.price} Birr</Text>
                    </HStack>

                    <HStack spacing={1}>
                        <Icons icon={"building"}/>
                        <Text>{foodData.restaurant ? foodData.restaurant.name : "deleted restaurant"}</Text>
                    </HStack>
                </Box>
                 

                <HStack>
                    <Text>{foodData.description.length > 100 ? foodData.description.slice(0,100) + "..." : foodData.description}</Text> 
                </HStack>
            
                <Box display={"flex"} justifyContent={"space-between"} marginTop={"10px"}>
                    <ButtonDefault action={()=>addItem(foodData)} text={"Add to cart"}/>
                    <Text color={"sudoRed.900"} _hover={{color:"sudoRed.200"}}><Link to={`/foods/${id}`} state={{foodData}}>see more</Link></Text>  
                </Box>
            </CardBody>
        </MotionCard>    
    );
}

export default Food;
