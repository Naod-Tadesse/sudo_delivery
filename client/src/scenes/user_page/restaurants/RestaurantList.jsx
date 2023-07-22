import {SimpleGrid,Spinner,Flex} from "@chakra-ui/react";
import {useEffect} from "react";

import Restaurant from "../../../components/cards/Restaurant";

const RestaurantList = ({isLoading,response,error}) =>{

    return(
        <Flex flexDirection={"column"} minHeight={"100%"} marginTop={"20px"}>
            {isLoading && <Spinner size={"xl"} alignSelf={"center"}/> }
            {response && 
            <SimpleGrid spacing={10} minChildWidth={"200px"}>
                {response.restaurants.map(restaurantData => 
                    <Restaurant key={restaurantData._id} id={restaurantData._id} 
                        restaurantData={{name:restaurantData.name,address:restaurantData.address,restaurantId:restaurantData._id,
                            email:restaurantData.email,profilePicture:restaurantData.profilePicture,phoneNumber:restaurantData.phoneNumber,description:restaurantData.description}}/>
                    )}
            </SimpleGrid>}
            {error && "error.message"}
        </Flex>  
    );
}

export default RestaurantList;