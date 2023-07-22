import { useEffect } from "react";
import {Outlet} from "react-router-dom";
import {useDispatch,useSelector} from "react-redux";
import {Grid,GridItem,Menu,MenuButton,MenuItem,MenuList,Box,useMediaQuery} from "@chakra-ui/react";


import { setUser } from "../../slices/authSlice";
import useRequest from "../../hooks/useRequest";

import Nav from "./nav/Nav";
import Footer from "./footer";

import CartOrders from "./cart";
import { SponsoredContent } from "../../components/sponsor";

import { data } from "../../components/sponsor/data";
import colors from "../../themes/colors";



const UserPageLayout = () =>{

    const [isSmall,isMedium,isStillMedium,isLarge] = useMediaQuery(['(max-width: 768px)','(min-width: 768px)','(max-width: 1000px)','(min-width: 1000px)'])
    const [isLoading,response,error,request] = useRequest()
    const dispatch = useDispatch();
    return(
        <>
        <Nav/>
        {isSmall && <Box display={"flex"} flexDirection={"column"} justifyContent={"space-between"} height={"100vh"}>
                <Box padding={"10px"}>
                    <Outlet/>
                </Box>
                <Box>
                    <Footer/>
                </Box>
            </Box>}

        {isMedium && isStillMedium &&
            <Grid templateColumns="repeat(9,1fr)" height={"100vh"}>
                <GridItem colSpan={6}>
                               
                    <Box>
                        <Outlet/>
                    </Box>
                               
                </GridItem>
                <GridItem colSpan={3}>
                    <SponsoredContent data={data}/>
                </GridItem>
                <GridItem colSpan={9}>
                    <Footer/>
                </GridItem>
            </Grid>}
            
        {isLarge &&
            <Grid templateColumns="repeat(9,1fr)" height={"100vh"}>

                <GridItem colSpan={2}>
                    <SponsoredContent data={data}/>
                </GridItem>


                <GridItem colSpan={5}>
                    
                    <Box height={"100%"}>
                        <Outlet/>
                    </Box>
                    
                </GridItem>

                <GridItem colSpan={2} height={"100%"}>
                    <Box position={"sticky"} top={"0px"} padding={"10px"} boxShadow={"lg"} margin={"10px"} border={`solid 1px ${colors.sudoGray[100]}`}>
                        <CartOrders/>
                    </Box>
                </GridItem>

                <GridItem colSpan={9}>
                    <Footer/>
                </GridItem>
            </Grid>}  
            
        
        </>
    )
}
export default UserPageLayout;