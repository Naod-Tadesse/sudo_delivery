import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Grid, GridItem, Box, useMediaQuery } from "@chakra-ui/react";

import { socket } from "../../socket";
import Orders from "./orders";
import Nav from "./nav/Nav";
import { data } from "../../components/sponsor/data";
import { SponsoredContent } from "../../components/sponsor";

import Footer from "./footer";

const RestaurantLayout = () => {

    const [isSmall,isMedium,isStillMedium,isLarge] = useMediaQuery(['(max-width: 768px)','(min-width: 768px)','(max-width: 1000px)','(min-width: 1000px)'])

  useEffect(()=>{
    socket.connect()
  },[])

  return (
    <>
    <Nav/>
    {isSmall && <Box height={"90vh"} display={"flex"} justifyContent={"space-between"} flexDirection={"column"} bgImage={"./front.jpg"} bgAttachment={"fixed"} bgRepeat={"repeat-y"}>
        <Box padding={"10px"}>
            <Outlet/>
        </Box>
            <Box height={"10%"}>
                <Footer/>
            </Box>
        </Box>}

    {isMedium && isStillMedium &&
        <Grid templateColumns="repeat(9,1fr)" bgImage={"/front.jpg"} bgAttachment={"fixed"} bgRepeat={"repeat-y"}>
            <GridItem colSpan={6}>
                          
                <Box p={"10px"} height={"100%"}>
                    <Outlet/>
                </Box>
                          
            </GridItem>
            <GridItem colSpan={3} height={"100%"}>
                <SponsoredContent data={data}/>
            </GridItem>
            <GridItem colSpan={9}>
                    <Footer/>
                </GridItem>
        </Grid>}
        
    {isLarge &&
        <Grid templateColumns="repeat(9,1fr)" bgImage={"/front.jpg"} bgAttachment={"fixed"} bgRepeat={"repeat-y"}>
            <GridItem colSpan={2} p={"10px"} height={"100%"}>
                <Box position={"sticky"} top={"10px"}>
                    <Orders/>
                </Box>
            </GridItem>
            <GridItem colSpan={5} height={"90%"}>
                
                <Box p={"10px"}>
                    <Outlet/>
                </Box>
                
            </GridItem>
            <GridItem colSpan={2}>
                <Box height={"90%"}>
                    <SponsoredContent data={data}/>
                </Box>
            </GridItem>
            <GridItem colSpan={9} height={"100%"}>
                <Footer/>
            </GridItem>
        </Grid>} 
        
    </>
  );
};
export default RestaurantLayout;
