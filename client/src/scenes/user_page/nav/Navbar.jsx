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
            <Flex as="nav" alignItems="center" p="10px 50px" boxShadow={"md"} bg={"sudoRed.900"}>
                <Heading color={"cotton"} fontSize={20}>
                  <NavLink to="/">Sudo</NavLink>
                </Heading>
              <Spacer />
        
                 <Menu>
                    <MenuList borderRadius={3} p={0}>
                        <Box p={"10px"} _hover={{bg:"sudoGray.100",cursor:"pointer"}} onClick={handleLogout}>Logout</Box>
                    </MenuList>
                    <HStack>
                      <Text color={"cotton"}>{user.username}</Text>
                      <MenuButton borderRadius={0}>
                        <Avatar name={user.username} src={`${MainURL}/api/userProfileImages/${user.profilePicture}`} size="md" bg={"cotton"} color={"sudoRed.900"}>
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