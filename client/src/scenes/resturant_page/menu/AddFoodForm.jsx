import {useState} from "react";
import { foodSchema } from "../../../joiSchemas/schemas";
import {useSelector} from "react-redux";
import { Button, Box, Text, Modal,Select,Flex,ModalBody,ModalHeader,ModalContent,ModalCloseButton,ModalOverlay,useDisclosure,Image,Input,FormLabel,FormControl} from "@chakra-ui/react";

import FormInput,{FormTextarea} from "../../../components/input_component/Input";
import FormInputMultiple from "../../../components/miltiple_input_component";
import {ButtonDefault,ButtonInverted} from "../../../components/Buttons/Button";

import useRequest from "../../../hooks/useRequest";
import useShowToast from "../../../hooks/useShowToast";
import useFormValidate from "../../../hooks/useFormValidate";

import { MainURL } from "../../../other";
import { Icons } from "../../../components/icon/Icon";
import colors from "../../../themes/colors";
import {useNavigate} from "react-router-dom";

const initialState = {
  name:"",
  price:'',
  description:"",
  images:[],
  ingredients:[]
}

const AddFood = ({editing,foodName,foodPrice,foodIngredients,foodImages,foodId,foodDescription,width="100%"}) => {
  const restaurant = useSelector((state)=>state.auth.restaurant)
  const [showToast] = useShowToast();
  const navigate = useNavigate()
  const [isLoading,response,error,request] = useRequest()
  const [formState,setFormState] = useState(editing ? {name:foodName,images:foodImages,ingredients:foodIngredients,price:foodPrice,description:foodDescription}:initialState)

  const [errors,validate,clearErrors] = useFormValidate()
  const [images,setImages] = useState(editing ? foodImages : [])
  const [preview,setPreview] = useState(editing ? foodImages:[])
  const [previewLength,setPreviewLength] = useState(images.length)
  const { isOpen, onClose, onOpen } = useDisclosure();

  const handleChange = (e)=>{
    setFormState({...formState,[e.target.name]:e.target.value})
  }

  const addIngredient = (item) =>{
    setFormState({...formState,ingredients:[...formState.ingredients,item]})
  }
  const removeIngredient = (item)=>{
    const newIngredients = []
    formState.ingredients.map(i => {
      i !== item  ? newIngredients.push(i) : null
    })
    setFormState({...formState,ingredients:newIngredients})
  
  }
  const close = () =>{
    reset()
    onClose()


  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate(foodSchema,formState)

    if(isValid){
      const formData = new FormData();
      formData.append("restaurant",restaurant._id)
      formData.append("name",formState.name)
      formData.append("price",formState.price)
      formData.append("description",formState.description)
      formState.images.map(image=>{
        formData.append("images",image)
      })
      formState.ingredients.map(item=>{
        formData.append("ingredients[]",item)
      })

    //Food Editing

      if(!editing){
      request("restaurants/foods/storeFood","POST",formData)
      .then(res=>{
        showToast("success","Succsessfuly created menu item","success")
        close()
      })
      .catch(error=>{
        console.log(error.response)
        showToast("Failed","Failed to create menu item","error")
      })
    }else{
      const data = {
        name: formState.name,
        ingredients: formState.ingredients,
        price: formState.price,
        description: formState.description,
        images : formState.images.slice(0,previewLength)

      }
      const formData = new FormData();
      formData.append("restaurantId",restaurant._id)
      formData.append("foodId",foodId)
      formData.append("changes",JSON.stringify(data))

      formState.images.slice(previewLength).map(image=>{
        formData.append("images",image)
      })

      request("restaurants/foods/editFood","PUT",formData)
      .then(res=>{
        showToast("success","Food edidted successfuly","success")
        close()
      })
      .catch(error=>{
        showToast("Failed","failed to edit food","failure")
      })
    } }
  }
  const selectFiles = (e) =>{
    const prev = [...preview]
    const imgs = [...formState.images]
    for( let item of Array.from(e.target.files)){
      imgs.push(item)
    }
    setFormState({...formState,images:imgs})
    const selected = Array.from(e.target.files)

    // create a blob of the images
    
    const selectedImgs = selected.map(item=>URL.createObjectURL(item))

    for(let item of selectedImgs){
      prev.push(item)
    }
    setPreview(prev)
  }

  const removeImage = (idx)=>{
    const newImgs = []
    const newPrev = []
    formState.images.map(i=>{
      i !== formState.images[idx] ? newImgs.push(i):null
    })
    setFormState({...formState,images:newImgs})
    preview.map(i=>{
      i !== preview[idx] ? newPrev.push(i):null
    })
    setPreview(newPrev)
  }
  const reset = () =>{
    setFormState(editing ? {name:foodName,images:foodImages,ingredients:foodIngredients,price:foodPrice,description:foodDescription} : initialState)
    setPreview(editing ? foodImages:[])
    clearErrors()
    setPreviewLength(images.length)
  }


  return (
    <>
    <Button onClick={onOpen} size={"sm"} width={width} color={"cotton"} bg={"sudoRed.900"} borderRadius={3} _hover={{bg:"sudoRed.400"}} >
        {editing? <Icons icon={"pencil"} color={colors.cotton}/> : "Add Food"}
    </Button>
    <Modal isOpen={isOpen} onClose={close} isCentered={"true"} size={"2xl"}>
        <ModalOverlay>
          <ModalBody>
            <ModalContent  p='30px' borderRadius={3} bg={"cotton"} width={700}>
          <ModalCloseButton />
          <ModalHeader textAlign='center' fontSize='25px' ><strong>{!editing ? "Add Food" : "Edit Food"}</strong></ModalHeader>
                <form className="form" encType="multipart/form-data">
                  <Box>
                    <Box>
                      <FormInput type={"text"} name={"name"} value={formState.name} handleChange={handleChange} label={"Food Name"} error={errors && errors.name}/>

                      <FormTextarea label={"foodDescription"} name={"description"} value={formState.description} handleChange={handleChange} error={errors && errors.description}/>

                      <FormInput type={"number"} name={"price"} value={formState.price} handleChange={handleChange} label={"Price"} error={errors && errors.price}/>

                      {editing ? 

                      <Flex flexWrap={"wrap"} minHeight={"70px"}>

                        {/* when editing a menu the already existing images come from the backend and the new images come from the users device  */}

                      {preview.slice(0,previewLength).map((image,idx)=>
                          <Image src={`${MainURL}/api/foodImage/${image}`} alt="none here" width={"25%"} height={"70px"} key={idx} id={idx} 
                            onClick={()=>{removeImage(idx)
                            setPreviewLength( previewLength === 0 ? 0 : previewLength-1)}
                          } fit={"cover"}/>
                      )}
                      <Flex marginTop={"20px"} flexWrap={"wrap"} width={"100%"}>

                        {/* this part renders the images coming from device */}

                      {preview.slice(previewLength).map((image,idx)=>
                            <Image src={image} alt="none here" width={"25%"} height={"70px"} 
                            key={idx + previewLength} id={idx + previewLength} onClick={()=>{removeImage(idx+previewLength)}} fit={"cover"}/>
                      ) }
                      </Flex>
                      </Flex>
                      
                      : 

                      <Flex flexWrap={"wrap"}>
                      {preview && preview.map((image,idx)=>
                            <Image src={image} alt="none here" width={"25%"} height={"70px"} key={idx} onClick={()=>removeImage(idx)} fit={"cover"}/>)}
                      </Flex>}
                      
                      {/* image input */}

                      <FormControl>
                        <FormLabel htmlFor="images" bg={"sudoRed.900"} color={"cotton"} 
                          _hover={{bg:"cotton",color:"sudoRed.900",cursor:"pointer"}} width={"100%"} textAlign={"center"} padding={"5px"} borderRadius={3}>
                              Add image
                          </FormLabel>
                        <Input type="file" name="images" id="images" multiple accept="image/png , image/jpeg, image/jpg" onChange={selectFiles} style={{display:"none"}}/>
                      </FormControl>

                      <Text>{formState.images.length} images selected</Text>
                      <Text> {errors && errors.images} </Text>

                      <Select name="type" marginTop={"20px"} value={formState.type} onChange={handleChange} size={"sm"} borderRadius={3}>
                        <option value={"fasting"}>Fasting</option>
                        <option value={"nonFasting"}>Non-Fasting</option>
                      </Select>
                      
                      <FormInputMultiple name={"ingredients"} value={formState.ingredients} add={addIngredient} remove={removeIngredient} clearErrors={clearErrors} error={errors && errors.ingredients}/>

                      <Box>
                        <ButtonDefault text={"Submit"}  action={handleSubmit}/>
                        <ButtonInverted text={"Reset"} action={reset}/>
                      </Box>

                    </Box>
                  </Box>
                </form>
            </ModalContent>
          </ModalBody>
        </ModalOverlay>
      </Modal>
      </>
  );
};

export default AddFood;