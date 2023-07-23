
import {Box,Flex,Heading,Divider,Text,Button,VStack,HStack,SimpleGrid} from "@chakra-ui/react";
import {useSelector,useDispatch} from "react-redux";
import {useLocation,useParams} from "react-router-dom"

import {addToCart} from "../../../slices/cartSlice";
import ImageSlide from "../../../components/image/ImageSlide";
import { Icons } from "../../../components/icon/Icon";
import { ButtonDefault } from "../../../components/Buttons/Button";

import useShowToast from "../../../hooks/useShowToast";


const FoodInfo = () => {
    const dispatch = useDispatch();
    const params = useParams()
    const location = useLocation()
    const [showToast] = useShowToast()
    const foodState = location.state

    const addItem = (foodData) =>{
        dispatch(addToCart({
            name: foodData.name,
            id: foodData._id,
            price: foodData.price,
        })) 
        showToast("success","added to cart","success")
    }

    return(
        <Box>
            {!Boolean(foodState) && 
                <Box bg={"sudoRed.200"} fontSize={50} color={"sudoRed.900"} textAlign={"center"}>
                    <Text>ERROR!</Text>
                    <Text>This food doesnt exist please navigate correctly! idiot</Text>
                </Box>
            }


            {foodState && 
                <>
                <Box pr={"20px"} pl={"20px"}>
                    <Heading textAlign={"center"} fontSize={"1.5em"}>{foodState.foodData.name}</Heading>
                    <Flex>
                        <ImageSlide images={foodState.foodData.image} />
                    </Flex>
                    <VStack align={"left"} marginLeft={10} spacing={3} marginTop={5}> 
                        <SimpleGrid spacing={5} minChildWidth={"200px"}>
                            <HStack spacing={1} alignItems={"baseline"} marginRight={"60px"}>
                                <Icons icon={"building"} justifyContent={"flex-start"} size={"1.25em"}/>
                                <Text>{foodState.foodData.restaurant.name}</Text>
                            </HStack>

                            <HStack spacing={1} alignItems={"baseline"} >
                                <Icons icon={"map marker"} justifyContent={"flex-start"} size={"1.25em"}/>
                                <Text>{foodState.foodData.restaurant.address}</Text>
                            </HStack>

                            <HStack alignItems={"baseline"}>
                                <Icons icon={"phone"} justifyContent={"flex-start"} size={"1.25em"}/>
                                <Text>+251--{foodState.foodData.restaurant.phoneNumber}</Text>
                            </HStack>
                        </SimpleGrid>


                        <HStack spacing={2} alignItems={"baseline"}>
                            <Icons icon={"tag"} justifyContent={"flex-start"} size={"1em"}/>
                            <Text>{foodState.foodData.description}</Text>
                        </HStack>

                        <HStack alignItems={"baseline"}>
                            <Icons icon={"utensils"} justifyContent={"flex-start"} size={"1.25em"}/>
                            <Text>{foodState.foodData.ingredients.map(i=>`${i} `)}</Text>
                        </HStack>



                        <Box display={"flex"} alignItems={"baseline"}>
                            <Icons icon={"dollar sign"} justifyContent={"flex-start"} alignItems={"baseline"} size={"1.25em"}/>
                            <Text>{foodState.foodData.price}birr</Text> 
                        </Box>
                            <ButtonDefault action={()=>addItem(foodState.foodData)} text={"Add To Cart"}/>

                        

                    </VStack>
                </Box>
                </>
                
            }
            
        </Box>
    )
}

export default FoodInfo;