import {Button,Text,ButtonGroup,Box,Flex,Icon,IconButton} from "@chakra-ui/react";
import { ChevronLeftIcon,ChevronRightIcon } from '@chakra-ui/icons';
import {setSearch, setSort,setPage,nextPage,prevPage} from "../../slices/searchSlice";
import {useDispatch,useSelector} from "react-redux";
import {motion} from "framer-motion";
import colors from "../../themes/colors";


export const ButtonPagination = ({numberOfPages}) =>{

    const dispatch = useDispatch()
    const {page} = useSelector((state)=>state.search)


    const handlePrevPage = ()=>{
        dispatch(prevPage())
    }
    const handleNextPage= ()=>{
        dispatch(nextPage())
    }
    
    return(
        <Flex paddingTop={10} paddingBottom={10} width={"100%"} justifyContent={"space-around"}>
            <IconButton variant={"link"} onClick={handlePrevPage} isDisabled={page === 1} color={"sudoRed.900"}><ChevronLeftIcon boxSize={10}/></IconButton>
            <IconButton variant={"link"} onClick={handleNextPage} isDisabled={numberOfPages <= page || numberOfPages === null} color={"sudoRed.900"}><ChevronRightIcon boxSize={10}/></IconButton>
       </Flex>
    )
}


export const ButtonDefault = ({text,action,type})=>{

    const handleClick = (e)=>{
        action(e)
    }

    return(
        <Button type={type && type} bg={"sudoRed.900"} color={"cotton"} _hover={{bg:"none",color:"sudoRed.900"}} onClick={handleClick} borderRadius={3} size={"sm"}> 
            {text}
        </Button>
    )
}

export const ButtonInverted = ({text,action})=>{
    const handleClick = ()=>{
        action()
    }
    return(
        <Button bg={"none"} color={"sudoRed.900"} _hover={{bg:"sudoRed.900",color:"cotton"}} onClick={handleClick} borderRadius={3} size={"sm"}>
            {text}
        </Button>
    )
}