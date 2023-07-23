import {Modal,ModalBody,ModalHeader,ModalContent,ModalCloseButton,ModalOverlay,Button,useDisclosure,HStack} from "@chakra-ui/react";
import useRequest from "../../hooks/useRequest";
import useShowToast from "../../hooks/useShowToast";
import { setLogout } from "../../slices/authSlice";
import {useDispatch} from "react-redux";
import { Icons } from "../icon/Icon";
import {useNavigate} from "react-router-dom";
import colors from "../../themes/colors";

const DeleteModal = ({id,type})=>{
    const { isOpen, onClose, onOpen } = useDisclosure();
    const [isLoading,response,error,request]=useRequest()
    const [showToast] = useShowToast()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleDelete = ()=>{

        if(type === "food"){
        request("restaurants/foods/removeFood","DELETE",{foodId:id})
        .then(res=>{
            showToast("success","item deleted successfuly","success")
            onClose()
            navigate(0)
        })
        .catch(error=>{
            showToast("Failure","failed to delete food","failed")
        })
    }

        if(type === "user"){
            request("user/profile/deleteProfile","DELETE",{userId:id})
            .then(res=>{
                showToast("succsses","user deleted successfyly","success")
                dispatch(setLogout())
            })
            .catch(error=>{
                showToast("Failure","unable to delete user","failed")
            })
        }
        if(type === "restaurant"){
            request("restaurant/profile/deleteProfile","DELETE",{restaurantId:id})
            .then(res=>{
                dispatch(setLogout())
                showToast("success","restaurant deleted successfuly","success")
            })
            .catch(error=>{
                showToast("Failure","failed to delete restaurant","failed")
            })
        }
    }
    
    return(
        <>
        {type === "food" ? <Button onClick={onOpen} bg={"sudoRed.900" } color={"cotton"} _hover={{bg:"sudoRed.400",color:"cotton"}} size={"sm"} borderRadius={3}><Icons icon={"trash"} color={colors.cotton}/></Button>
            :
            <Button onClick={onOpen} bg={"sudoRed.900" } color={"cotton"} _hover={{bg:"sudoRed.400",color:"cotton"}} size={"lg"} borderRadius={3}>Delete Profile</Button>
        
    }
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay>
                <ModalBody>
                    <ModalContent p={10}>
                        <ModalCloseButton/>
                        are you sure?
                        <HStack>
                            <Button onClick={handleDelete}>yes</Button>
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