import Navbar from "./Navbar";
import NavMenu from "./NavMenu";
import {Box} from "@chakra-ui/react";

const Nav = () =>{
    return(
        <div style={{position:"sticky"}}>
            <Box width={"100%"} bg={"white"} margin={0}>
                <Navbar/>
                <NavMenu/>
            </Box> 
        </div>
    )
}

export default Nav;