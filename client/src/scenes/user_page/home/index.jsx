import {Box,Text,SimpleGrid} from "@chakra-ui/react";
import Restaurant from "../../../components/cards/Restaurant";
import Food from "../../../components/cards/Food";
import useRequest from "../../../hooks/useRequest";
import { useEffect } from "react";


const Home = ()=>{

    const [isLoadingFood,responseFood,errorFood,requestFood] = useRequest()
    const [isLoadingRes,responseRes,errorRes,requestRes] = useRequest()
    
    useEffect(()=>{
        requestFood(`user/foods/getFoods?pageNumber=${1}&pageSize=${5}`,"GET")

        requestRes(`users/restaurants/getAllRestaurants?pageNumber=${1}&pageSize=${5}`,"GET")

    },[])
    
    return(
        <Box overflow={"auto"} height={"95%"} className={"custom"}>

            <Box display={"flex"} width={"100%"} backgroundImage={"/food.png"} backgroundSize={"800px"} height={"250px"} color={"cotton"} justifyContent={"center"} alignItems={"center"}>
                <Text color={"cotton"} fontSize={"25px"}>home to your favorite restaurants and foods.</Text>
            </Box>
            <Box>
                <Text fontSize={"25px"} fontWeight={"bold"} marginBottom={"10px"}>Recommended</Text>
                {responseFood && 
                <SimpleGrid spacing={10} minChildWidth={"200px"}>
                    {responseFood.foods.slice(0,3).map((foodData,idx)=>
                        <Food key={foodData._id} id={foodData._id} foodData={{id:foodData._id,name:foodData.name, image:foodData.image, price:foodData.price,
                            ingredients:foodData.ingredients, restaurant:foodData.restaurant, description:foodData.description}}/>
                    )}
                    
                </SimpleGrid>
                }
            </Box>

            <Box>
                <Text fontSize={"25px"} fontWeight={"bold"} marginBottom={"10px"}>Popular</Text>
                {responseRes && 
                    <SimpleGrid spacing={10} minChildWidth={"200px"}>
                        {responseRes.restaurants.slice(0,3).map((restaurantData,idx)=>
                            <Restaurant key={idx} id={idx} 
                                restaurantData={{name:restaurantData.name,address:restaurantData.address,restaurantId:restaurantData._id,
                                email:restaurantData.email,profilePicture:restaurantData.profilePicture,phoneNumber:restaurantData.phoneNumber,description:restaurantData.description}}/>
                        )}
                        
                    </SimpleGrid>
                }
            </Box>

            <Box>
                <Text fontSize={"25px"} fontWeight={"bold"} marginBottom={"10px"}>Recent</Text>
                {responseFood && 
                <SimpleGrid spacing={10} minChildWidth={"200px"}>
                    {responseFood.foods.slice(0,3).map((foodData,idx)=>
                        <Food key={idx} id={idx} foodData={{id:foodData._id,name:foodData.name, image:foodData.image, price:foodData.price,
                            ingredients:foodData.ingredients, restaurant:foodData.restaurant, description:foodData.description}}/>
                    )}
                    
                </SimpleGrid>
                }
            </Box>

        </Box>
    )
}

export default Home;