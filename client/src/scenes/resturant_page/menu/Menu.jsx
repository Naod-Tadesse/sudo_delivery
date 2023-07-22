import { useEffect } from "react";
import MenuItem from "../../../components/cards/MenuItem";
import { SimpleGrid, Spinner, Flex , Text, Box} from "@chakra-ui/react";
import useRequest from "../../../hooks/useRequest";
import {useSelector,useDispatch} from "react-redux";
import AddFood from "./AddFoodForm";
import SearchSort from "../../../components/search/SearchSort";
import { ButtonPagination } from "../../../components/Buttons/Button";
import { setPage,clearSearch } from "../../../slices/searchSlice";

//import PageBtnContainer from './PageBtnContainer'

const Foods = () => {
  const [isLoading,response,error,request] = useRequest();
  const dispatch = useDispatch()
  const {page,search,pageSize,sort} = useSelector((state)=>state.search)
  const restaurant = useSelector((state)=>state.auth.restaurant)
  const data = {restaurant:restaurant._id}

  useEffect(() => {
    request(`restaurants/foods/getFoods?pageNumber=${page}&pageSize=${5}&sort=${sort}&search=${search}`,"GET",data)
    .catch(err=>console.log(err.response))
  }, [page,search,sort]);

  useEffect(()=>{
    dispatch(setPage({
        pageNumber:1
    }))
    dispatch(clearSearch())
  },[])

  return (
    <>
    <SearchSort/>
      <Flex flexDirection={"column"}>
        {isLoading && <Spinner size={"xl"} alignSelf={"center"} />}
        <Box display={"flex"} width={"100%"} justifyContent={"flex-start"} marginBottom={"20px"}>
          <AddFood editing={false} width={"200px"}/>
        </Box>
        
        <Box overflow={"auto"} className={"custom"}>
          {response && 
          <SimpleGrid spacing={10} minChildWidth="200px" height={"100%"}>
            
            { response.foods.map((food) => (
              <MenuItem key={food._id} id={food._id} {...food} />
            ))}
          </SimpleGrid>}
          <ButtonPagination numberOfPages={response && response.numOfPages}/> 
        </Box>

        {error && <Text>{error.message}</Text>}
      </Flex>
    </>
  );
};

export default Foods;
