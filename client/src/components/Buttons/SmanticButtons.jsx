import { Icons } from "../icon/Icon"
import { Button, Box } from "@chakra-ui/react"
import colors from "../../themes/colors"


export const ButtonAnimated = (
    {
        type="default",
        width="100%",
        visibleText,
        visibleIcon,
        hiddenText,
        hiddenIcon,
        iconColor,
        iconSize,
        bg=colors.sudoRed[900],
        color=colors.cotton,
        border="none",
        borderRadius="3px"
    }
    )=>{

    const style = {
        width:width,
        color,
        border,
        borderRadius,
        background:bg,
        hover:{
            background:"green",
        }
    }

    return(
        <>
            {/* {type === "default" &&
                <Button className="ui animated button " tabIndex="0" style={style} size={"sm"}>
                    <Box className="visible content" height={"100%"} alignItems={"center"}>Next</Box>
                    <Box className="hidden content">
                        {hiddenText && hiddenText}
                        {hiddenIcon && <Icons icon={hiddenIcon} color={color} size={iconSize}/>}
                    </Box>
              </Button>
            }
            {type === "vertical" &&
                <Button className="ui vertical animated button" tabIndex="0" style={style}>
                    <Box className="visible content">Sign-up for a Pro account</Box>
                    <Box className="hidden content">
                        {hiddenText && hiddenText}
                        {hiddenIcon && <Icons icon={hiddenIcon} color={color} size={iconSize}/>}
                    </Box>
                </Button>
            }
            {type === "fade" && 
                <Button className="ui animated fade button" tabIndex="0" style={style}>
                    <Box className="visible content">Sign-up for a Pro account</Box>
                    <Box className="hidden content">
                        {hiddenText && hiddenText}
                        {hiddenIcon && <Icons icon={hiddenIcon} color={color} size={iconSize}/>}
                    </Box>
                </Button>
            } */}
            <Button overflow={"hidden"} width={"200px"}>
                <Box transform={"auto"}  translateX={"-125px"} _hover={{translateX:"225px"}} display={"flex"} justifyContent={"space-between"} bg={"green"} padding={"100%"} position={"absolute"}>
                    <Box marginRight={"150px"}>hidden</Box>
                    <Box marginLeft={"150px"}>visible</Box>
                </Box>
            </Button>
      </>
    )
}