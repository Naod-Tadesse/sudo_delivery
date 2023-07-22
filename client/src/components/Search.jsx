import {Box,HStack,Button} from "@chakra-ui/react"
import {useSelector,useDispatch} from "react-redux"

import { FormInputSearch } from "./input_component/Input"
import { setSearch,setSort } from "../slices/searchSlice"

export const SearchForm = ({handleSearch})=>{

    const {search} = useSelector((state)=>state.search);

    return(
        <Box paddingBottom={"5px"}>
            <FormInputSearch handleSearch={handleSearch}/>
        </Box>
    )
}

