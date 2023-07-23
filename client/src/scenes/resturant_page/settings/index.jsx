import { useState} from "react";
import FormInput, { FormInputPassword,FormTextarea } from "../../../components/input_component/Input";
import { ButtonDefault } from "../../../components/Buttons/Button";
import { Text, Button, Box, SimpleGrid, FormControl, FormLabel, Input, Image} from "@chakra-ui/react";
import useRequest from "../../../hooks/useRequest";
import DeleteModal from "../../../components/modals/DeleteModal";
import { useSelector, useDispatch } from "react-redux";
import { setRestaurant } from "../../../slices/authSlice";
import useShowToast from "../../../hooks/useShowToast";
import useFormValidate from "../../../hooks/useFormValidate";
import { restaurantSettings, restaurantSettingsWithoutPassword } from "../../../joiSchemas/schemas";
import colors from "../../../themes/colors";
import { Icons } from "../../../components/icon/Icon";

import { ImageInput } from "../../../components/input_component/ImageInput";


const RestaurantSettings = () => {
  const [isLoading, response, error, request] = useRequest();
  const [showToast] = useShowToast()
  const [errors,validate,clearErrors] = useFormValidate()
  const restaurant = useSelector((state) => state.auth.restaurant);
  const dispatch = useDispatch();
  const initialState = {
    name: restaurant.name,
    address: restaurant.address,
    email: restaurant.email,
    phoneNumber: restaurant.phoneNumber,
    description:restaurant.description,
    password:"",
    profilePicture: []
  };

  const [formState,setFormState]=useState(initialState)
  const [preview,setPreview] = useState("")
  const [edited,setEdited] = useState(false)

  const handleChange = (e) => {
    setFormState({...formState,[e.target.name]:e.target.value})
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const formStateWothoutPassword = {
      name: formState.name,
      address: formState.address,
      email: formState.email,
      phoneNumber: formState.phoneNumber,
      description:formState.description
    }
    const formStateWithPassword = {
      name: formState.name,
      address: formState.address,
      email: formState.email,
      phoneNumber: formState.phoneNumber,
      password: formState.password,
      description: formState.description
    }

    const isValid = validate(formState.password === "" ?  restaurantSettingsWithoutPassword : restaurantSettings,formState.password === "" ? formStateWothoutPassword:formState)

    const formData = new FormData
    formData.append("restaurantId",restaurant._id)
    formData.append("email",restaurant.email)
    if(formState.password === ""){
      formData.append("changes",JSON.stringify(edited ? formStateWothoutPassword : {...formStateWothoutPassword,profilePicture:restaurant.profilePicture}))
    }else{
      formData.append("changes",JSON.stringify(edited ? formStateWithPassword : {...formStateWithPassword,profilePicture:restaurant.profilePicture}))
    }
    {edited && 
    formData.append("profilePicture",formState.profilePicture)}
    


    request("restaurant/profile/editProfile","PUT",formData)
      .then((res) => {
        dispatch(setRestaurant({restaurant: res.data,}));
        showToast("update","succsessfully updated","success")
      })
     
  };


  const selectFiles = (e) =>{
    
    const prev = []
    
    setFormState({...formState,profilePicture:e.target.files[0]})
    const selected = Array.from(e.target.files)
    const selectedImgs = selected.map(item=>URL.createObjectURL(item))
    for(let item of selectedImgs){
      prev.push(item)
    }
    setPreview(prev)
    setEdited(true)
  }

  const removeImage = ()=>{
    setFormState({...formState,profilePicture:[]})
    setPreview([])
}

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <Text>Edit Restaurant Information</Text>
      <SimpleGrid spacing={5} minChildWidth={200}>
          <FormInput type="text" label="Restaurant Name" name="name" value={formState.name} handleChange={handleChange}/>
          <FormInput type="text" label="Address" name="address" value={formState.address} handleChange={handleChange}/>
      </SimpleGrid>
      <Text>Edit Email and password</Text>
      <SimpleGrid spacing={5} minChildWidth={200}>
          <FormInput type="email" label="Email" name="email" value={formState.email} handleChange={handleChange}/>
          <FormInput type="number" label="PhoneNumber" name="phoneNumber" value={formState.phoneNumber} handleChange={handleChange}/>
          <FormInputPassword label={"Password"}  handleChange={handleChange}/>
      </SimpleGrid>

      <ImageInput removeImage={removeImage} selectFiles={selectFiles} preview={preview}/>

      <FormTextarea label={"RestaurantDescription"} name={"description"} value={formState.description} handleChange={handleChange} error={errors && errors.description}/>

      <Button type={"submit"} width="30%" isDisabled={isLoading} color={"cotton"} bg={"sudoRed.900"} borderRadius={3} _hover={{bg:"sudoRed.500"}}>
          <Icons icon={"save"} color={colors.cotton}/>
      </Button>

      
      <Box bg={"sudoRed.200"} marginTop={"20px"} padding={10} borderRadius={3}>
        <Box color={"sudoRed.900"} marginBottom={"20px"}>
            <Text  fontSize={"30px"}>Warning!</Text>
            <Text>this action is irriversible</Text>
        </Box>
        <DeleteModal id={restaurant._id} type={"restaurant"} size={"md"}/>
      </Box>   
      
    </form>
  );
};

export default RestaurantSettings;
