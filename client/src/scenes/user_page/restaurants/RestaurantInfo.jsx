import {useEffect} from "react";

import {useParams} from "react-router-dom";
import {Box,Image,Flex,Heading,Divider,Text,Grid,GridItem,Button,VStack,SimpleGrid,HStack} from "@chakra-ui/react";
import {setPage} from "../../../slices/searchSlice";
import {useSelector,useDispatch} from "react-redux";
import {useLocation} from "react-router-dom";
import { Icons } from "../../../components/icon/Icon";
import { ButtonPagination } from "../../../components/Buttons/Button";

import useRequest from "../../../hooks/useRequest";
import { MainURL } from "../../../other";
import Food from "../../../components/cards/Food";

const RestaurantInfo = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const location = useLocation()
    const restaurantData = location.state.restaurantData
    const {page,pageSize} = useSelector((state)=>state.search)

    
    const [isLoading,response,error,request] = useRequest()

    useEffect(()=>{
        request(`users/restaurants/getArestaurantMenus?pageNumber=${page}&pageSize=${pageSize}`,"GET",{restaurantId:restaurantData.restaurantId})
        .then(res=>console.log(res))
        .catch(error=>console.log(error.response))
    },[])
    useEffect(()=>{
        dispatch(setPage({
            pageNumber:1
        }))
    },[])
    
    return(
        <Box marginTop={"30px"}>
            {isLoading && "Loading"}
            {response && 
                <>
                <Box padding={"10px"}>
                    <Text textAlign={"center"}  marginBottom={"10px"} fontSize={"lg"}>{restaurantData.name}</Text>
                    <Box>
                        <Box width={"100%"} margin={"auto"} height={"350px"}>
                            <Image src={ restaurantData.profilePicture ? `${MainURL}/api/restaurantProfileImages/${restaurantData.profilePicture}`:`/restaurantDefault.jpg`} height={"100%"} fit={"cover"} width={"100%"} />
                        </Box>
                        <SimpleGrid spacing={2} minChildWidth={"200px"} marginTop={"30px"}>
                            <HStack>
                                <Icons icon={"map marker"} size={"1em"}/>
                                <Text>{restaurantData.address}</Text>
                            </HStack>
                            <HStack>
                                <Icons icon={"phone"}/>
                                <Text>+251--{restaurantData.phoneNumber}</Text>
                            </HStack>
                            <HStack>
                                <Icons icon={"mail"}/>
                                <Text>{restaurantData.email}</Text>
                            </HStack>
                        </SimpleGrid>
                        <Divider/>
                            <HStack spacing={5}>
                                <Icons icon={"tag"} height={"100px"}/>
                                <Text display={"flex"} alignItems={"start"}>{restaurantData.description}</Text>
                            </HStack>
                        
                    </Box>
                </Box>

                <Text fontSize={"25px"} fontWeight={"bold"} marginBottom={"10px"}>menu</Text>
                {console.log("adawdawdadada",response)}
                <Box>
                    <SimpleGrid spacing={10} minChildWidth={200}>
                        {response.foods.map((item,idx) =>
                            <Food key={item._id} id={item._id} foodData={{...item,restaurant:restaurantData}}/>
                        )}
                    </SimpleGrid>
                    <ButtonPagination numberOfPages={response && response.numOfPages} />
                </Box>
                </>
                
            }
            {error && console.log("err")}
        </Box>
    )
}

export default RestaurantInfo;