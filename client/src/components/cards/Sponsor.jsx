import { useState,useEffect } from "react";
import {Card,CardBody,CardHeader,CardFooter,Divider,HStack,Button,Text,Box,Flex,Heading,Image,Spacer,useMediaQuery} from "@chakra-ui/react";
import colors from "../../themes/colors";
import {motion} from "framer-motion"


const Sponsor = ({data})=>{   

    const images = data.images
    const [index,setIndex] = useState(0)
    const MotionImage = motion(Image)

    useEffect(()=>{

        setTimeout(()=>{
            setIndex(index+1)
        },5000)
    },[index])
    
    return(
        <Box margin={"10px"}>
            <Card bg={"cotton"} size="lg" minWidth={"200px"} borderRadius={"none"} boxShadow={"md"} border={`solid 1px ${colors.sudoGray[100]}`} overflow={"hidden"}>
                <Box height={"400px"}>
                    <MotionImage initial={{x:10,opacity:0}} animate={{x:0,opacity:1}} transition={{type:"tween"}} 
                        src={`/sponsored/${images[index % images.length]}`} width={"100%"} height={"100%"} fit={"cover"} overflow={"hidden"}/>
                </Box>
                <CardFooter>
                    <Box width={"100%"}>
                        <Text textAlign={"center"}>{data.name}</Text>
                    </Box>
                </CardFooter>
            </Card>
        </Box>
    )

}

export default Sponsor;