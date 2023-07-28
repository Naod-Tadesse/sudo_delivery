import {Flex,Heading,Box,Spacer,Text,Avatar,AvatarBadge,HStack,Menu,MenuButton,MenuItem,MenuList,Button,IconButton} from "@chakra-ui/react";
import {SettingsIcon} from "@chakra-ui/icons"
import {Icon} from "semantic-ui-react"
import {motion} from "framer-motion"
import {NavLink} from "react-router-dom";
import {useDispatch,useSelector} from "react-redux"
import { setLogout } from "../../../slices/authSlice";
import { clearCart } from "../../../slices/cartSlice";
import { clearSearch } from "../../../slices/searchSlice";
import { MainURL } from "../../../other";


const Navbar = ()=>{

    const {user} = useSelector((state)=>state.auth)
    const dispatch = useDispatch();
    const handleLogout = ()=>{
      dispatch(clearCart())
      dispatch(clearSearch())
      dispatch(setLogout())
       
      localStorage.clear()
    }
    
    return(
            <Flex as="nav" alignItems="center" p="10px 50px" boxShadow={"md"} bg={"cotton"}>
                <Heading color={"sudoRed.900"} fontSize={20}>
                  <NavLink to="/">Sudo</NavLink>
                </Heading>
              <Spacer />
        
                 <Menu>
                    <MenuList borderRadius={3} p={0}>
                        <Box p={"10px"} _hover={{bg:"sudoGray.100",cursor:"pointer"}} onClick={handleLogout}>Logout</Box>
                    </MenuList>
                    <HStack>
                      <Text color={"sudoRed.900"}>{user.username}</Text>
                      <MenuButton borderRadius={0}>
                        <Avatar name={user.username} src={user.profilePicture[0]} size="md" bg={"sudoRed.900"} color={"cotton"}>
                            <AvatarBadge width={"1em"} height={"1em"} bg={"sudoGreen.500"} borderColor={"cotton"}>

                            </AvatarBadge>
                        </Avatar>
                      </MenuButton>
                    </HStack>
                  </Menu>
              </Flex>
    )
}
export default Navbar;
