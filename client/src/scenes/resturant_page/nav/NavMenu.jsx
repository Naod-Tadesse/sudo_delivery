import {Flex,Box,Container,Spacer,Icon,useMediaQuery,Text,Button} from "@chakra-ui/react";
import {useSelector} from "react-redux"
import {SettingsIcon} from "@chakra-ui/icons"
import {NavLink} from "react-router-dom";
import {motion} from "framer-motion";
import colors from "../../../themes/colors";

const defaultStyle = ({isActive})=>({color: isActive ? colors.cotton : colors.sudoRed[900],background:isActive && colors.sudoRed[900],padding:"10px 5px 2px 5px"})


const NavMenu = () =>{
    const [isSmall,isMedium,isStillMedium,isLarge] = useMediaQuery(['(max-width: 768px)','(min-width: 768px)','(max-width: 1000px)','(min-width: 1000px)'])
    const {restaurant} = useSelector((state)=>state.auth)

    return( <>
            {isSmall &&
            
            <Flex borderBottomWidth={"1px"} justifyContent={"space-around"} alignItems={"baseline"}>
                <NavLink style={defaultStyle} to="restaurant">Menu</NavLink>
                <NavLink style={defaultStyle} to="orders">Orders</NavLink>
                <NavLink style={defaultStyle} to="settings"><SettingsIcon/></NavLink>
            </Flex>}

            { isMedium && isStillMedium &&
            <Flex p={0} borderBottomWidth={"1px"} justifyContent={"space-between"} alignItems={"baseline"}>
                <Box width={"50%"} display={"flex"} margin={"auto"}>
                    <Flex width={{base:"60%",sm:"40%"}} justifyContent="space-between">
                        <NavLink to={restaurant.name} style={defaultStyle}>Menu</NavLink>
                        <NavLink style={defaultStyle} to="orders">Orders</NavLink>
                        
                    </Flex>
                    <Spacer/>
                    <Flex width={{base:"40%",sm:"20%"}} justifyContent={"flex-end"}>
                        <NavLink to="settings" style={defaultStyle}><SettingsIcon/></NavLink>
                    </Flex>
                </Box>
            </Flex>
            }
            {isLarge && 
            <Flex p={0} borderBottomWidth={"1px"} justifyContent={"space-between"} alignItems={"baseline"}>
                <Box width={"50%"} display={"flex"} margin={"auto"}>
                    <Flex width={{base:"60%",sm:"40%"}} justifyContent="flex-start">
                        <NavLink to={restaurant.name} style={defaultStyle}>Menu</NavLink>
                    </Flex>
                    <Spacer/>
                    <Flex width={{base:"40%",sm:"20%"}} justifyContent={"flex-end"}>
                        <NavLink to="settings" style={defaultStyle}><SettingsIcon/></NavLink>
                    </Flex>
                    </Box>
            </Flex>
            }
        </>
    )
}

export default NavMenu;