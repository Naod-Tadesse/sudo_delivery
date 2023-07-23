import {Box,Text,Image,FormControl,FormLabel,Input} from "@chakra-ui/react";
import {useSelector} from "react-redux"
import { Icons } from "../icon/Icon";
import colors from "../../themes/colors";
import { MainURL } from "../../other";


export const ImageInput = ({selectFiles,removeImage,preview,type})=>{

    const {restaurant} = useSelector((state)=>state.auth)
    const {user} = useSelector((state)=>state.auth)
    return(
        <Box marginLeft={"30px"}  marginTop={"10px"}>
        <Text>profile picture</Text>
        <Box width={"250px"} height={"200px"} marginTop={"10px"} marginBottom={"10px"} display={"flex"}> 
            
            <Box width={"200px"} border={`dashed 2px ${colors.sudoGray[100]}`} padding={"3px"} borderRadius={"5px"}>
                {type === "user" ?
                    <Image src={preview[0] || preview === "deleted" ? preview[0] : `${MainURL}/api/userProfileImages/${user.profilePicture}`} 
                    alt="none here maaaaan" height={"100%"} fit={"cover"} bg={"sudoGray.100"} borderRadius={"3px"}/>
                    :
                    <Image src={preview[0] ? preview[0] : `${MainURL}/api/restaurantProfileImages/${restaurant.profilePicture}`} 
                    alt="none here maaaaan" height={"100%"} fit={"cover"} bg={"sudoGray.100"} borderRadius={"3px"}/>
            }
            </Box>
            
            <Box display={"flex"} flexDirection={"column"} justifyContent={"center"}>
                <FormControl>
                    <FormLabel display={"flex"} htmlFor="images" marginLeft={5} bg={"gray.200"} 
                        height={"40px"} width={"40px"} borderRadius={"50%"} alignItems={"center"} textAlign={"center"} _hover={{bg:"sudoGray.100",cursor:"pointer"}} >

                        <Icons icon={"pencil"} justifyContent={"center"} width={"100%"} size={"1em"}/>

                    </FormLabel>
                    <Input type="file" name="images" id="images" accept="image/png , image/jpeg, image/jpg" onChange={selectFiles} style={{display:"none"}}/>
                </FormControl>

                <Box display={"flex"} marginLeft={5} width={"40px"} height={"40px"} 
                    alignItems={"center"} borderRadius={"50%"} bg={"gray.200"} onClick={removeImage} _hover={{bg:"sudoGray.100",cursor:"pointer"}}>
                    <Icons icon={"trash"} width={"100%"} size={"1em"}/>
                </Box>
            </Box>
        </Box>
        </Box>
)

}