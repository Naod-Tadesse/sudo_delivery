import { useState,useEffect } from "react";

import Sponsor from "../cards/Sponsor";
import {motion} from "framer-motion"
import {Box} from "@chakra-ui/react"
export const SponsoredContent = ({data})=>{
    const [index,setIndex] = useState(0)
    const MotionBox = motion(Box)

    useEffect(()=>{

        setTimeout(()=>{
            setIndex(index+1)
        },10000)

    },[index])

    return(
        <>
        <MotionBox initial={{y:20}} animate={{y:0}} transition={{type:"tween"}} position={"sticky"} top={"0px"}>
            <Sponsor data={data[index % data.length]}/>
        </MotionBox>
        </>
    )
}

