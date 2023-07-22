import {SimpleGrid,Spinner,Flex} from "@chakra-ui/react";

import Food from "../../../components/cards/Food";


const FoodsList = ({response,isLoading,error}) =>{
    

    return(
        <Flex flexDirection={"column"} minHeight={"100%"} marginTop={"20px"}>
            {isLoading && <Spinner alignSelf={"center"}/> }
            {response && 
            <>
                <SimpleGrid spacing={10} minChildWidth="200px">
                    {response.foods.map(foodData => 
                        <Food key={foodData._id} id={foodData._id} 
                            foodData={{id:foodData._id,name:foodData.name, image:foodData.image, price:foodData.price,
                                         ingredients:foodData.ingredients, restaurant:foodData.restaurant, description:foodData.description}}/>
                        )}
                </SimpleGrid>
            </>
            }
            {error && error.message}
            
           
        </Flex>  
    );
}

export default FoodsList;