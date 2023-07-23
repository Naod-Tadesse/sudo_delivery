 import { useEffect } from "react";
 import {Box,Spinner,Text} from "@chakra-ui/react"
 import useRequest from "../../../hooks/useRequest";
 import Order from "./Order";
 import "./order.css"

 const Orders=()=>{
    const [isLoading,response,error,request] = useRequest();

    useEffect(()=>{
        request("restaurants/orders","GET")
     },[])
    return(
        <Box position={"sticky"} top={"10px"} height={"80vh"}>
            <Box p={"5px"} textAlign={"center"}>
                <Text fontSize={18}>Orders</Text>
            </Box>
            <Box overflow={"scroll"} height={"100%"}  className="orders" >

                {isLoading && <Spinner size={"xl"} alignSelf={"center"}/> }
                {response && response.map((order,idx)=><Order key={idx} data={order}/>)}
                {error && 
                    <Box>
                        <Text>Opps! something went wrong</Text>
                    </Box>
                }
            </Box>
        </Box>
    )
  }

  export default Orders;