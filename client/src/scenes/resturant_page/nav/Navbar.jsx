import {Flex,Heading,Box,Spacer,Text,Avatar,Menu,MenuButton,MenuItem,MenuList,Button,HStack,AvatarBadge} from "@chakra-ui/react";
import {SettingsIcon} from "@chakra-ui/icons"
import {motion} from "framer-motion"
import {NavLink} from "react-router-dom";
import {useDispatch,useSelector} from "react-redux"
import { setLogout } from "../../../slices/authSlice";

import { MainURL } from "../../../other";

const Navbar = ()=>{

    const {restaurant} = useSelector((state)=>state.auth)
    const dispatch = useDispatch();

    return(
        <Flex as="nav" alignItems="center" p="10px 50px" boxShadow={"lg"} bg={"sudoRed.900"}>
            
                <Heading color={"cotton"} fontSize={20}>
                  <NavLink to="/">Sudo</NavLink>
                </Heading>
              <Spacer />
        
                 <Menu>
                    <MenuList borderRadius={3} p={0}>
                      <Box p={"10px"} _hover={{bg:"sudoGray.100",cursor:"pointer"}} onClick={()=>dispatch(setLogout())}>Logout</Box>
                    </MenuList>
                    <HStack>
                      <Text color={"cotton"}>{restaurant.name}</Text>
                      <MenuButton>
                          <Avatar name={restaurant.name} src={`${MainURL}/api/restaurantProfileImages/${restaurant.profilePicture}`} size={"md"} bg={"cotton"} color={"sudoRed.900"}>
                              <AvatarBadge width={"1em"} height={"1em"} bg={"sudoGreen.500"} borderColor={"sudoRed.900"}>

                          </AvatarBadge>
                        </Avatar>
                      </MenuButton>
                    </HStack>
                  </Menu>
      </Flex>
    )
}
export default Navbar;