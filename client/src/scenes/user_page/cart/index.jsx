import {Box,Tab,TabList,TabPanels,TabPanel,Tabs,useMediaQuery} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom"
import Cart from "./Cart";

const CartOrders = () =>{
    const [isLarge] = useMediaQuery('(min-width: 1000px)')
    const navigate = useNavigate()
    return(
        <Box>
            <Cart/>
        </Box>
    )
}

export default CartOrders;