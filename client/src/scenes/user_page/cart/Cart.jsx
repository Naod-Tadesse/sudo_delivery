import {useDispatch,useSelector} from "react-redux";
import {AnimatePresence} from "framer-motion"
import useRquest from "../../../hooks/useRequest"

import {Button,Text,Divider,Grid,GridItem,Spacer,Flex,Box,SimpleGrid} from "@chakra-ui/react";

import CartItem from "./CartItem";
import { clearCart } from "../../../slices/cartSlice";

import colors from "../../../themes/colors";
import { Icons } from "../../../components/icon/Icon";
import useShowToast from "../../../hooks/useShowToast";

const Cart = () =>{
    const {items,totalPrice} = useSelector((state)=>state.cart);
    const {user} = useSelector((state)=>state.auth)
    const [isLoading,response,error,request] = useRquest()
    const [showToast] = useShowToast()
    const dispatch = useDispatch();

    const handleOrder = ()=>{
        const data = {food:items.map(item=>{
            return {foodId:item.id,quantity:item.amount}
        })
        ,userId:user._id}
        console.log(data)
        request("users/order","POST",data)
        .then(res=>{
            showToast("success","order successful","success")
        })
        .catch(err=>{
            console.log(err.response)
            showToast("failed","order failed","error")
        })

    }
    return(
        <Box padding={"10px"}>
            <Box minHeight={400} overflow={"auto"}>
                {items.length < 1 ?
                <Flex justifyContent={"center"} alignItems={"center"} height={400}>
                    <Text fontSize={30} color={"gray.300"}>looks like cart is empty</Text>
                </Flex> :
                <>
                <AnimatePresence>
                    {items.map(item => 
                        <CartItem key={item.id} id={item.id} item={item} />
                    )}
                </AnimatePresence></>}
            </Box>
            

                <Divider/>
                <SimpleGrid spacing={5} minChildWidth={"150px"} width={"90%"} margin={"auto"}>
                    <Text color={"sudoGreen.900"} fontSize={"1.2em"}>TotalPrice: {totalPrice}birr</Text>
                    
                        <Button onClick={handleOrder} bg={"sudoRed.900"} borderRadius={3} _hover={{bg:"sudoRed.400"}} color={"cotton"} 
                                isDisabled={items.length == 0 ? true : false}>order</Button>
                                
                        <Button onClick={()=>dispatch(clearCart())} bg={"sudoRed.900"} borderRadius={3} _hover={{bg:"sudoRed.400"}}><Icons icon={"erase"} color={colors.cotton}/></Button>
                    
                </SimpleGrid>
             
        </Box>
    )
}
export default Cart;