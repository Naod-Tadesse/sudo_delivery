import Navbar from "./Navbar";
import NavMenu from "./NavMenu";
import {Box} from "@chakra-ui/react";

const Nav = () =>{
    return(
    <Box position={"sticky"} width={"100%"} bg={"white"} margin={0}>
        <Navbar/>
        <NavMenu/>
    </Box> 
    )
}

export default Nav;