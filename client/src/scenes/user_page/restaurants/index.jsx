import {Box,HStack,Text,Button} from "@chakra-ui/react";
import {useEffect} from "react";
import {useSelector,useDispatch} from "react-redux";
import useRequest from "../../../hooks/useRequest";

import RestaurantList from "./RestaurantList";
import { SearchForm } from "../../../components/Search";
import {setSearch, setSort,setPage,nextPage,prevPage} from "../../../slices/searchSlice";

import { ButtonPagination } from "../../../components/Buttons/Button";
import SearchSort from "../../../components/search/SearchSort";

const Restaurants= () => {
    const [isLoading,response,error,request] = useRequest()
    const dispatch = useDispatch();
    const {sort,search,page,pageSize} = useSelector((state)=>state.search)

    useEffect(()=>{
        dispatch(setPage({
            pageNumber:1
        }))
        dispatch(setSearch({
            phrase:"" 
        }))
    },[])
    useEffect(()=>{
            
        request(`users/restaurants/getAllRestaurants?pageNumber=${page}&pageSize=${pageSize}&sort=${sort}&search=${search}`,"GET")


    },[page,search,sort])

    return(
        <> 
        <Box overflow={"auto"} height={"100%"} marginTop={"10px"}>
            <SearchSort/>
            <Box>
                <RestaurantList isLoading={isLoading} response={response && response} error={error && error}/>
                <ButtonPagination numberOfPages={response && response.numOfPages} /> 
            </Box>
        </Box>
        </>
    )
}

export default Restaurants;