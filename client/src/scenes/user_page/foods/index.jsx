import {Box,HStack,Text,Button,Select,Spacer} from "@chakra-ui/react";
import {useEffect} from "react";
import {useSelector,useDispatch} from "react-redux";

import FoodsList from "./FoodsList";
import { SearchForm } from "../../../components/Search";
import {setSearch, setSort, prevPage, nextPage, setPage, clearSearch} from "../../../slices/searchSlice";
import { ButtonPagination } from "../../../components/Buttons/Button";
import useRequest from "../../../hooks/useRequest";
import SearchSort from "../../../components/search/SearchSort";

import colors from "../../../themes/colors";
import "./food.css"

const Foods = () => {
    const {page,pageSize,search,sort} = useSelector((state)=>state.search)
    const [isLoading,response,error,request] = useRequest()
    const dispatch = useDispatch();


    useEffect(()=>{
        dispatch(setPage({
            pageNumber:1
        }))
        dispatch(clearSearch())
    },[])
    useEffect(()=>{
            
        request(`user/foods/getFoods?pageNumber=${page}&pageSize=${pageSize}&sort=${sort}&search=${search}`,"GET")
        .catch(error=>console.log(error.response)) 

    },[page,search,sort])

    return(
        <>
        <Box overflow={"auto"} height={"100%"} marginTop={"10px"} className={"custom"}>
            <SearchSort/>

            <Box display={"flex"} flexDirection={"column"} justifyContent={"space-between"}>
                <FoodsList response={response && response} isLoading={isLoading && isLoading} error={error && error}/>
                <ButtonPagination numberOfPages={response && response.numOfPages}/> 
            </Box>
        </Box>
       </>
    )
}

export default Foods;