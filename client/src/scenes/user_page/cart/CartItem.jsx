import {Box,Flex,Text,HStack,VStack,IconButton,Spacer,Divider,Button} from "@chakra-ui/react";
import {AddIcon,MinusIcon,DeleteIcon} from "@chakra-ui/icons";
import {useSelector,useDispatch} from "react-redux";
import {motion} from "framer-motion"
import { Icons } from "../../../components/icon/Icon";
import { memo } from "react";
import { increaseItemAmount,decreaseItemAmount,removeFromCart } from "../../../slices/cartSlice";
import DeliveredModal from "../../../components/modals/DeliveredModal"

const CartItem = memo( ({item,id}) =>{
    const dispatch = useDispatch();
    
    const handleIncrease = ()=>{
        dispatch(increaseItemAmount({
            id: id
        }))
    }
    const handleDecrease = ()=>{
        if (item.amount <= 1){
            dispatch(removeFromCart({
                id:id
            }))
        }else{
            dispatch(decreaseItemAmount({
                id:id
            }))
        }
    };
    const handleRemove = () =>{
        dispatch(removeFromCart({
            id:id
        }))
    }

    const MotionBox = motion(Box)
     return(
        <>  
        <MotionBox initial={{y:100,opacity:0}} animate={{y:0,opacity:1}} exit={{y:-100,opacity:0}} transition={{type:"tween"}} layout >
            <Flex alignItems={"center"} paddingTop={"25px"} justifyContent={"space-between"}>
                <Text>{item.name.length > 6 ? item.name.slice(0,6):item.name}{` $${item.price}`}</Text>
                <HStack>
                    <Button bg={"none"} onClick={handleDecrease} _hover={{bg:"none",}} padding={"0"} size={"sm"}><Icons icon={"minus"}/></Button>
                    <Text width={"20px"} textAlign={"center"}>{item.amount}</Text>
                    <Button bg={"none"} onClick={handleIncrease} _hover={{bg:"none",}} padding={"0"} size={"sm"}><Icons icon={"plus"}/></Button>
                    <Button bg={"none"} onClick={handleRemove} _hover={{bg:"none",}} padding={"0"} size={"sm"}><Icons icon={"times"}/></Button>
                </HStack>
            </Flex>
            <DeliveredModal id={id}/>
            <Divider/>
        </MotionBox>
        </>
     )
},(next,prev)=>next.item === prev.item)

export default CartItem;