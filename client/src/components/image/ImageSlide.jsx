import { useState } from "react";
import {Image, Box, HStack, Flex, IconButton,Icon} from "@chakra-ui/react";
import {ChevronLeftIcon,ChevronRightIcon} from "@chakra-ui/icons"
import {motion} from "framer-motion";
import { MainURL } from "../../other";

const ImageSlide = ({images}) =>{
    const [page,setPage] = useState(0)
    const prev = ()=>{
        if(page === 0) {
            setPage(images.length-1)
        }else{
            setPage(page-1)
        }
    }
    const next = ()=>{
        if(page === images.length -1){
            setPage(0)
        }else{
            setPage(page +1)
        }
    }
    const handleWheel = (e)=>{
        if(e.nativeEvent.deltaY < 0){
            next()
        }else{
            prev()
        }
    }

    const MotionBox = motion(Box)
    const MotionImage = motion(Image)

    return(
        <>
        <Box width={"100%"} onWheel={handleWheel} marginBottom={"1em"}>
            <Flex justifyContent={"center"} alignItems={"center"} marginTop={"10px"} marginBottom={"10px"} height={{base:"150px",md:"250px",lg:"300px"}}  overflow={"hidden"}>
                <Box onClick={prev}><IconButton variant={"link"} boxSize={7}><ChevronLeftIcon  boxSize={6}/></IconButton></Box>
                <Box width={"600px"} overflow={"hidden"} bg={"gray.200"}>
                    <MotionImage 
                    initial={{opacity:0.9,scale:1.1}} 
                    animate={{opacity:1,scale:1}}
                    transition={{type:"tween"}}
                    width={"100%"}
                    src={`${MainURL}/api/foodImage/${images[page%images.length]}`} 
                    />
                </Box> 
                <Box onClick={next}><IconButton variant={"link"}><ChevronRightIcon  boxSize={6}/></IconButton></Box>
            </Flex>
            <HStack justifyContent={"center"}>
                {images.map((item,idx)=>
                    <MotionBox 
                        initial={{opacity:0.2,scaleX:1}}
                        animate={{opacity:idx === page % images.length ? 0.7 : 0.7,scaleX:idx === page % images.length ? 2.5 : 1}}
                        transition={{type:"tween",duration:.4}}
                        padding={"3px"}
                        bg={"gray"} 
                        borderRadius={"1px"} 
                        key={idx} id={idx}>
                    </MotionBox>)}
            </HStack>
        </Box>
        </>
    )
}

export default ImageSlide;