import {Flex,Box,Container,Spacer,Icon,useMediaQuery,Text,Button} from "@chakra-ui/react";
import {SettingsIcon} from "@chakra-ui/icons"
import {NavLink} from "react-router-dom";
import {motion} from "framer-motion";
import colors from "../../../themes/colors";

const defaultStyle = ({isActive})=>({color: isActive ? 'white' : colors.sudoRed[900],background:isActive && colors.sudoRed[900],padding:"10px 5px 2px 5px"})


const NavMenu = () =>{
    const [isSmall,isMedium,isStillMedium,isLarge] = useMediaQuery(['(max-width: 768px)','(min-width: 768px)','(max-width: 1000px)','(min-width: 1000px)'])
    return( 
        <>

            {isSmall &&
            
            <Flex borderBottomWidth={"1px"} justifyContent={"space-around"} alignItems={"baseline"}>
                <NavLink style={defaultStyle} to="/">Home</NavLink>
                <NavLink style={defaultStyle} to="restaurants">Resturants</NavLink>
                <NavLink style={defaultStyle} to="foods" >Foods</NavLink>
                <NavLink style={defaultStyle} to="cart">Cart</NavLink>
                <NavLink style={defaultStyle} to="settings"><SettingsIcon/></NavLink>
            </Flex>
            }

            {isMedium && isStillMedium && 
            
                <Flex p={0} borderBottomWidth={"1px"} justifyContent={"space-between"} alignItems={"baseline"}>
                <Box width={{base:"75%",md:"65%"}} display={"flex"} margin={"auto"}>
                    <Flex width={{base:"60%",sm:"40%"}} justifyContent="space-around">
                        <NavLink to="/" style={defaultStyle}>Home</NavLink>
                        <NavLink to="restaurants" style={defaultStyle}>Resturants</NavLink>
                        <NavLink to="foods" style={defaultStyle}>Foods</NavLink>
                    </Flex>
                    <Spacer/>
                    <Flex width={{base:"40%",sm:"20%"}} justifyContent="space-around">
                        <NavLink to="cart" style={defaultStyle}>Cart</NavLink>
                        <NavLink style={defaultStyle} to="settings"><SettingsIcon/></NavLink>
                    </Flex>
                </Box>
            </Flex>
            }

            {isLarge &&

            <Flex p={0} borderBottomWidth={"1px"} justifyContent={"space-between"} alignItems={"baseline"}>
                <Box width={{base:"75%",md:"65%"}} display={"flex"} margin={"auto"}>
                    <Flex width={{base:"60%",sm:"40%"}} justifyContent="space-around">
                        <NavLink to="/" style={defaultStyle}>Home</NavLink>
                        <NavLink to="restaurants" style={defaultStyle}>Resturants</NavLink>
                        <NavLink to="foods" style={defaultStyle}>Foods</NavLink>
                    </Flex>
                    <Spacer/>
                    <Flex width={{base:"40%",sm:"20%"}} justifyContent="space-around">
                        <NavLink to="settings" style={defaultStyle}><SettingsIcon/></NavLink>
                    </Flex>
                </Box>
            </Flex>
             }
        </>
    )
}

export default NavMenu;