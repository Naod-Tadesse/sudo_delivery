import {Modal,ModalBody,ModalHeader,ModalContent,ModalCloseButton,ModalOverlay,useDisclosure,Button} from "@chakra-ui/react";
import {motion} from "framer-motion";
import FormInput from "../input_component/Input";

const OrderModal = ({id}) =>{
    const {isOpen,onClose,onOpen} = useDisclosure();
    const MotionModalBody = motion(ModalBody)
    return(
        <>
        <Button onClick={onOpen} size={"sm"} variant={"ghost"}>Order</Button>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay>
                <MotionModalBody initial={{opacity:.5,y:-200}} animate={{opacity:1,y:0}} transition={{delay:.1,type:"tween"}}>
                    <ModalContent>
                        <FormInput name="phoneNumber" placeholder="phoneNumber"/>
                    </ModalContent>
                </MotionModalBody>
            </ModalOverlay>
        </Modal>
        </>
    )
}

export default OrderModal