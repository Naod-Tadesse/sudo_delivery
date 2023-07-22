import {Icon} from "semantic-ui-react"

export const Icons = (
    {
        icon,
        width=null,
        color="black",
        padding="10px",
        margin="0px",
        marginTop="0px",
        marginBottom="0px",
        marginLeft="0px",
        marginRight="0px",
        paddingTop="0px",
        paddingBottom="0px",
        paddingLeft="0px",
        paddingRight="0px",
        justifyContent="center",
        alignItems="center",
        size="1em",
        height="100%"
    })=>{
    const style = {
        width,
        color,
        marginTop,
        marginBottom,
        marginLeft,
        marginRight,
        paddingTop,
        paddingBottom,
        paddingLeft,
        paddingRight,
        fontSize:size,
        display:"flex",
        justifyContent:justifyContent,
        alignItems,
        height
    }
    return(
        <>
        <Icon className={icon} style={style}></Icon>
        </>
    )
}

