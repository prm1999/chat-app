import React, { useCallback,useRef, useState } from 'react'
import firebase from 'firebase/app';
import { Button,ControlLabel,FormControl,Form,FormGroup,Icon ,Modal, Schema, Alert} from 'rsuite'
import { useModalState } from '../misc/custom-hooks'
import { auth, database } from '../misc/firebase';

const {StringType}=Schema.Types;

const model=Schema.Model({
  name:StringType().isRequired('Chat Name is required'),
  description:StringType().isRequired('Description   is required')
})



const INITIAL_FORM={
  name:'',
  description:''
}


const CreateRoomBtnModal = () => {

  const {isOpen,open,close}=useModalState()

  const [formValue,setFormValue]=useState(INITIAL_FORM);
  const [isLoading,setIsLoading]=useState(false);
  const formRef=useRef();

  const onFormChange=useCallback((value)=>{
    setFormValue(value);
     // eslint-disable-next-line 

  },[])

  const onSubmit= async ()=>{
   if (!formRef.current.check()){
     return;

   }
   setIsLoading(true);
   const newRoomData={
     ...formValue,
     createdAt:firebase.database.ServerValue.TIMESTAMP,
     admins:{
       [auth.currentUser.uid]:true
     }
   }

   try {
     await database.ref('rooms').push(newRoomData);
    Alert.info(`${formValue.name} has been created`,4000)
     setIsLoading(false);
     setFormValue(INITIAL_FORM);
     close();
     


   } catch (err) {
     setIsLoading(false);
     Alert.error(err.message,4000)

     
   }

  }

  return (
    <div className="mt-2">
      <Button block color="green" onClick={open}>
        <Icon icon="creative"/> Create new chat Room
      </Button>

    <Modal show={isOpen } onHide={close}>
            <Modal.Header>
            <Modal.Title>New Chat Room</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Form fluid onChange={onFormChange} 
              formValue={formValue} 
              model={model}
              ref={formRef}
              >
              <FormGroup>
                <ControlLabel>Room Name</ControlLabel>
                <FormControl
                 name="name"
                 placeholder="Enter Chat Room  Name...."/> 
              </FormGroup>


              <FormGroup>
                <ControlLabel>Description</ControlLabel>

                <FormControl 
                 componentClass="textarea"  
                rows ={6} 
                name="description"
                 placeholder="Enter Chat Room  Description...."/> 

              </FormGroup>
              </Form>
            </Modal.Body>

          <Modal.Footer>
              <Button block  appearance="primary" onClick={onSubmit} disabled={isLoading} >
                Create A new Chat room
              </Button>
              Footer
          </Modal.Footer>



    </Modal>





    </div>
  )
}

export default CreateRoomBtnModal
