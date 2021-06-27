import React, { useCallback, useState } from 'react'
import { InputGroup ,Input, Icon, Alert} from 'rsuite'
import firebase from 'firebase/app'
import { useParams } from 'react-router'
import {useProfile} from '../../../context/profile.context'
import { database } from '../../../misc/firebase'



function assembleMessage(profile,chatId){
  return {
    roomId:chatId,
    author:{

      name:profile.name,
      uid:profile.uid,
      createdAt:profile.createdAt,
      ...(profile.avatar ?{ avatar:profile.avatar}:{})
    },
    createdAt :firebase.database.ServerValue.TIMESTAMP,
  }
}




const Bottom = () => {
const [input,setInput]=useState(''); // input 

const [isLoading,setIsLoading]=useState(false)



const {chatId}=useParams(); // chat Id
const {profile}=useProfile(); // profile import

const onInputChange=useCallback((value)=>{
  setInput(value);
},[])



const  onSendClick= async()=>{

  if(input.trim()===" "){
    return ;
  }
  const msgData=assembleMessage(profile,chatId);
  msgData.text=input;

  const updates={};
  const messageId=database.ref(`messages`).push().key; // creating new key for message

  updates[`/messages/${messageId}`]=msgData; // upadtes the message in databaxse
  updates[`/rooms/${chatId}/lastMessage`]={
    ...msgData,
    msgId:messageId,
  }; // update datbase to at real time at the room uid
  
setIsLoading(true);

try { 
  await database.ref().update(updates);
  setInput('');
  setIsLoading(false);

} catch (err) {
  setIsLoading(false);

  Alert.error(err.message)
  
}

}
//  on key down event
const onKeyDown=(ev)=>{
  if(ev.keyCode === 13){
    ev.preventDefault();

    onSendClick();
  }
}



  return (
    <div>

      <InputGroup>
         <Input placeholder=" write a new message here..."
         value={ input}
         onChange={onInputChange}
         onKeyDown={onKeyDown}
         />
      
          <InputGroup.Button 
          color="blue"
           appearance="primary"
            onClick={onSendClick}
            disabled={isLoading}
           
            
            >
          <Icon icon="send"/>
          </InputGroup.Button>
      </InputGroup>
      


    </div>
  )
}

export default Bottom
