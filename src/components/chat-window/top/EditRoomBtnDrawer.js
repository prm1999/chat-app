import React,{memo} from 'react';
import { useParams } from 'react-router';
import { Alert, Button, Drawer } from 'rsuite';
import { useCurrentRoom } from '../../../context/current-room.context';
import { useMediaQuery, useModalState } from '../../../misc/custom-hooks';
import { database } from '../../../misc/firebase';
import EditableInput from '../../EditableInput';

const EditRoomBtnDrawer = () => {
  const { isOpen, open, close } = useModalState();
  const name=useCurrentRoom(v=>v.name);
  const description=useCurrentRoom(v=>v.description);
  const {chatId}=useParams();
  const isMobile=useMediaQuery('(max-width:992px)')


  const updateDate=(key,value)=>{
    database
    .ref(`rooms/${chatId}`)
    .child(key)
    .set(value)
    .then(()=>{
      Alert.success("sucessfuly upadted",4000)
    }).catch(err=>{
      Alert.error(err.message,4000)
    })

  }


  const onNameSave=(newName)=>{
    updateDate('name',newName)

  }
  const onDescriptionSave=(newDescription)=>{
    updateDate('description',newDescription)

  }


  return (
    <div>
      <Button className="br-circle" size="sm" color="red" onClick={open}>
        A
      </Button>

      <Drawer  full={isMobile} show={isOpen} onHide={close} placement="right">
          <Drawer.Header>
            <Drawer.Title>Edit Room</Drawer.Title>
          </Drawer.Header>

          <Drawer.Body>
            <EditableInput
            initialValue={name}
            onSave={onNameSave}
            label={<h6 className="mb-2">Name</h6>}
            emptyMsg="Name Cannot be empty"
            wrapperClassName="mt-3"
            
            />

            <EditableInput
            componentClass="textarea"
            rows={5}
            initialValue={description}
            onSave={onDescriptionSave}
            emptyMsg="Description can not be empty"
        
            wrapperClassName="mt-3"
            
            />
          </Drawer.Body>

          <Drawer.Footer>
            <Button block onClick={close}>
              close
            </Button>
          </Drawer.Footer>
      </Drawer>
    </div>
  );
};

export default memo(EditRoomBtnDrawer);
