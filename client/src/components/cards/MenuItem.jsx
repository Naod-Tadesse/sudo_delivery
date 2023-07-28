import { HStack, Box, Card,CardHeader,CardBody, Flex, Heading, Image, useMediaQuery, Text } from "@chakra-ui/react";
import DeleteModal from "../modals/DeleteModal";
import AddFood from "../../scenes/resturant_page/menu/AddFoodForm";
import colors from "../../themes/colors";

import { Icons } from "../icon/Icon";
import { MainURL } from "../../other";

const MenuItem = ({ _id, name, image, ingredients, price, description}) => {
  const [isSmall] = useMediaQuery('(max-width: 500px)')
  return (
    <Card  bg="white" size="sm" maxWidth={isSmall ? "100%" :"250px"} minWidth={"200px"} borderRadius={"none"} boxShadow={"md"} 
          borderStyle={"solid"} borderWidth={"1px"} borderColor={"gray.100"} >

      <CardHeader>

        <Flex gap={5} justifyContent="center">
          <Heading as="h3" size="sm">
            {name}
          </Heading>
        </Flex>

      </CardHeader>

      <Box height={"150px"} display={"flex"} alignItems={"center"} bg={"gray.100"} overflow={"hidden"}>
          <Image src={image[0]} width={"100%"} height={"100%"} fit={"cover"}/>
      </Box>

      <CardBody color="gray.400" fontSize="13px">
        
          <HStack spacing={0}>
              <Icons icon={"dollar"} color={colors.sudoGreen[600]}/>
              <Text color={"sudoGreen.600"}>{price} Birr</Text>
          </HStack>

          <Box minH={"70px"}>
              <Text>{description.length > 100 ? description.slice(0,100) + "..." : description}</Text> 
          </Box>

          <HStack>
              <AddFood editing={true} foodName={name} foodIngredients={ingredients} foodPrice={price} foodImages={image} foodId={_id} 
                      foodDescription={description} width={"70px"} />
              <DeleteModal id={_id} type={"food"} size={"sm"}/>
          </HStack>
      </CardBody>
    </Card>
  );
};

export default MenuItem;
