import {useState} from 'react';

function useInputState(initVal){
    const [state, setState] = useState(initVal);
    const changeInput = (e) => {
        setState(e.target.value)
    }
    const reset = () =>{
        setState('')
    }   
    return [state,changeInput,reset]
}
export default useInputState;