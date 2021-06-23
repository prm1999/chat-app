import React, { useCallback, useState } from 'react'
import { InputGroup,Icon,Input, Alert } from 'rsuite';

const EditableInput = ({
  
  initialValue,
  onSave,
  label=null,
  placeholder="write your value",
emptyMsg="Input is empty",

...inputProps}) => {

const [input,setInput]=useState(initialValue);
const [isEditable,setIsEditable]=useState(false);

// event handler
const onInputChange=useCallback((value)=>{
  setInput(value);
},[])


// on Edit  Nick Name Click handler

const onEditClick=useCallback(()=>{
  setIsEditable(p=>!p);
  setInput(initialValue)

},[initialValue]);

// on Save  Nick Name Click handler

 const onSaveClick=async()=>{
   const trimmed= input.trim();
   if(trimmed===" "){
     Alert.info(emptyMsg,4000) // Alert message for if is blank
   }

   if(trimmed !== initialValue){
    await onSave(trimmed)
   }


   setIsEditable(false);
 }





  return (
    <div>
       {label}
      <InputGroup>
     
      <Input 
       {...inputProps}
      
      disabled={!isEditable}
      placeholder={placeholder}
      value={input} 
      onChange={onInputChange}
      />


      <InputGroup.Button  onClick={onEditClick}>
      <Icon  icon={isEditable ?'close':'edit2'}/>
      </InputGroup.Button>

        {isEditable &&( 
      <InputGroup.Button  onClick={onSaveClick}>
      <Icon  icon="check"/>
      </InputGroup.Button>
        )}
      


      </InputGroup>
    </div>
  )
}

export default EditableInput
