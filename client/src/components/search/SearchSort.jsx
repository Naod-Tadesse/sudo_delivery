import { SearchForm } from "../Search";
import { setSearch,setSort } from "../../slices/searchSlice";
import {Box,Button} from "@chakra-ui/react"
import {useDispatch,useSelector} from "react-redux"
import colors from "../../themes/colors";

const SearchSort = ()=>{
    const dispatch = useDispatch();
    const {page,pageSize,search,sort} = useSelector((state)=>state.search)

    const handleSearch = (word)=>{
        dispatch(setSearch({
            phrase:word
        }))
        console.log("searching for "+ word)
    }
    const handleSort = (sort)=>{
        dispatch(setSort({
            sort
        }))
    }

    return(
    <>
        <SearchForm handleSearch={handleSearch}/>
        <Box paddingBottom={2}>
            <Button 
                bg={"none"} borderBottom={sort === "a-z" ? `solid ${colors.sudoRed[900]} 3px` : "none"} paddingBottom={sort === "a-z" ? "1px" : "4px"}
                borderRadius={"none"} size={"sm"} fontWeight={"light"} onClick={()=>handleSort("a-z")}>A-Z</Button>
            <Button 
                bg={"none"} borderBottom={sort === "z-a" ? `solid ${colors.sudoRed[900]} 3px` : "none"} paddingBottom={sort === "z-a" ? "1px" : "4px"}
                borderRadius={"none"} size={"sm"} fontWeight={"light"} onClick={()=>handleSort("z-a")}>Z-A</Button>
            <Button 
                bg={"none"} borderBottom={sort === "cheapest" ? `solid ${colors.sudoRed[900]} 3px` : "none"} paddingBottom={sort === "cheapest" ? "1px" : "4px"}
                borderRadius={"none"} size={"sm"} fontWeight={"light"} onClick={()=>handleSort("cheapest")}>Cheapest</Button>
        </Box>
    </>
    )
}

export default SearchSort