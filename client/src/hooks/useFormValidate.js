import {useState} from "react";
import Joi from "joi-browser";

const useFormValidate = ()=>{
    const [errors,setErrors] = useState(null)

    const validate = (schema,formData)=>{
        
        const result =Joi.validate(formData,schema,{abortEarly:false})
        const errs = {}

        if(!result.error){
           clearErrors();
            return true
        };
        
        for(let item of result.error.details)
            errs[item.path[0]] = item.message
        setErrors(errs)
        return false
    };
    const clearErrors = ()=>{
        setErrors(null)
    };
    return [errors,validate,clearErrors]
}

export default useFormValidate;