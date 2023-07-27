import {Box,Text} from "@chakra-ui/react"
import {motion} from "framer-motion"


export const Side = ()=>{
    const MotionText = motion(Text)
    return(
        
        <Box>
            <MotionText fontSize={"60px"} initial={{x:-200, opacity:0}}  animate={{x:0, opacity:1}} transition={{type:"tween",delay:.3,duration:1}} >Pseudo</MotionText>
            <MotionText fontSize={"30px"}>Home to your favorite Restaurants...</MotionText>
        </Box>
    )
}