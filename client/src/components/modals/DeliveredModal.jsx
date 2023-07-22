import {Modal,ModalBody,ModalHeader,ModalContent,ModalCloseButton,ModalOverlay,Button,useDisclosure,HStack} from "@chakra-ui/react";
import useRequest from "../../hooks/useRequest";
import useShowToast from "../../hooks/useShowToast";
import { setLogout } from "../../slices/authSlice";
import {useDispatch} from "react-redux";
import { Icons } from "../icon/Icon";
import {useNavigate} from "react-router-dom";
import colors from "../../themes/colors";
import { increaseItemAmount,decreaseItemAmount,removeFromCart } from "../../slices/cartSlice";



const DeleteModal = ({id,disabled=true})=>{
    const { isOpen, onClose, onOpen } = useDisclosure();
    const [isLoading,response,error,request]=useRequest()
    const [showToast] = useShowToast()
    const dispatch = useDispatch()

    const handleRemove = (id) =>{
        dispatch(removeFromCart({
            id:id
        }))
    }
    const handleDelivered = ()=>{
        request("restaurants/orders/delivered","POST",{foodId:id})
        .then(res=>{
            showToast("success","confirmed","success")
            handleRemove(id)
            onClose()
        })
        .catch(err=>{
            showToast("failed","oops something went wrong","error")
        })

    }

    return(
        <>
        <Button onClick={onOpen} bg={"sudoRed.900" } color={"cotton"} _hover={{bg:"sudoRed.400",color:"cotton"}} size={"md"} borderRadius={3}>delivered?</Button>
        
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay>
                <ModalBody>
                    <ModalContent p={10}>
                        <ModalCloseButton/>
                        has the order been fulfilled correctly?
                        <HStack>
                            <Button onClick={handleDelivered}>yes</Button>
                            <Button onClick={onClose}>no</Button>
                        </HStack>
                    </ModalContent>
                </ModalBody>
            </ModalOverlay>
        </Modal>
        </>
    )
}

export default DeleteModal