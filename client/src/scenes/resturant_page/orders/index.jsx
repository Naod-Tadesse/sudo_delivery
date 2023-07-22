 import { useEffect } from "react";
 import {Box} from "@chakra-ui/react"
 import useRequest from "../../../hooks/useRequest";
 import Order from "./Order";

 const Orders=()=>{
    const [isLoading,response,error,request] = useRequest();
    const data = [{name:"Burger 1",amount:3,date:'4/5/2023',phoneNumber:"0985674532"},{name:"cheese burger",amount:1,date:'4/5/2023',phoneNumber:"0985674532"},{name:"the new backonings",amount:2,date:'4/5/2023',phoneNumber:"0985674532"}]

    useEffect(()=>{
        request("restaurants/orders","GET")
        .catch(err=>console.log(err))
     },[])
    return(
        <Box overflow={"auto"}>
            {response && response.map((order,idx)=><Order key={idx} data={order}/>)}
        </Box>
    )
  }

  export default Orders;