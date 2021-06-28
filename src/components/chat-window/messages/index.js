import React, { useState ,useEffect} from 'react'
import { useParams } from 'react-router'
import { database } from '../../../misc/firebase';
import { transformToArrayWithId } from '../../../misc/helpers';
import MessageItem from './MessageItem';

const Messages = () => {

  const {chatId} =useParams()
  const [messages,setMessage]=useState(null);

  const isChatEmpty=messages && messages.length===0;
  const canShowMessages=messages &&  messages.length>0;



  useEffect(() => {
    const messageRef=database.ref('/messages')
    messageRef.orderByChild('roomId').equalTo(chatId).on('value',(snap)=>{

      const data=transformToArrayWithId(snap.val())
      setMessage(data)
    })
   
   
    return () => {
      messageRef.off('value');
    }
  }, [chatId])




  return (
    <ul className="msg-list custom-scroll">
      {isChatEmpty && <li> No Message Yet</li>}
      {canShowMessages && 
      messages.map(msg=><MessageItem key={msg.id} message={msg}/>)}
    </ul>
  )
}

export default Messages
