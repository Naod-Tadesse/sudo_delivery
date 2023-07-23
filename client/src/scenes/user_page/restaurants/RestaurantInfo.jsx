import {useEffect} from "react";

import {useParams} from "react-router-dom";
import {Box,Image,Divider,Text,SimpleGrid,HStack} from "@chakra-ui/react";
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
    const restaurantState = location.state
    const {page,pageSize} = useSelector((state)=>state.search)

    
    const [isLoading,response,error,request] = useRequest()


    useEffect(()=>{
        if(Boolean(restaurantState)){

            request(`users/restaurants/getArestaurantMenus?pageNumber=${page}&pageSize=${pageSize}`,"GET",{restaurantId:params.restaurantId})
        }
    },[])
    useEffect(()=>{
        dispatch(setPage({
            pageNumber:1
        }))
    },[])
    
    return(
        <Box marginTop={"30px"}>
            {!Boolean(restaurantState) &&
                <Box bg={"sudoRed.200"} textAlign={"center"} fontSize={50} color={"sudoRed.900"}>
                    <Text>ERROR!</Text>
                     <Text>this restaurant doesnt exist, please navigate correctly!</Text>
                </Box>

            }
            {isLoading && "Loading"}
            {response && 
                <>
                <Box padding={"10px"}>
                    <Text textAlign={"center"}  marginBottom={"10px"} fontSize={"lg"}>{restaurantState.restaurantData.name}</Text>
                    <Box>
                        <Box width={"100%"} margin={"auto"} height={"350px"}>
                            <Image src={ restaurantState.restaurantData.profilePicture ? `${MainURL}/api/restaurantProfileImages/${restaurantState.restaurantData.profilePicture}`:`/restaurantDefault.jpg`} height={"100%"} fit={"cover"} width={"100%"} />
                        </Box>
                        <SimpleGrid spacing={2} minChildWidth={"200px"} marginTop={"30px"}>
                            <HStack>
                                <Icons icon={"map marker"} size={"1em"}/>
                                <Text>{restaurantState.restaurantData.address}</Text>
                            </HStack>
                            <HStack>
                                <Icons icon={"phone"}/>
                                <Text>+251--{restaurantState.restaurantData.phoneNumber}</Text>
                            </HStack>
                            <HStack>
                                <Icons icon={"mail"}/>
                                <Text>{restaurantState.restaurantData.email}</Text>
                            </HStack>
                        </SimpleGrid>
                        <Divider/>
                            <HStack spacing={5}>
                                <Icons icon={"tag"} height={"100px"}/>
                                <Text display={"flex"} alignItems={"start"}>{restaurantState.restaurantData.description}</Text>
                            </HStack>
                        
                    </Box>
                </Box>

                <Text fontSize={"25px"} fontWeight={"bold"} marginBottom={"10px"}>menu</Text>
                <Box>
                    <SimpleGrid spacing={10} minChildWidth={200}>
                        {response.foods.map((item,idx) =>
                            <Food key={item._id} id={item._id} foodData={{...item,restaurant:restaurantState.restaurantData}}/>
                        )}
                    </SimpleGrid>
                    <ButtonPagination numberOfPages={response && response.numOfPages} />
                </Box>
                </>
                
            }
            {error && <Box> Error</Box>}
        </Box>
    )
}

export default RestaurantInfo;