import React from 'react';
import { Drawer,Button, Divider, Alert } from 'rsuite';
import {useProfile} from '../../context/profile.context';
import { database } from '../../misc/firebase';
import EditableInput from '../EditableInput';
import AvatarUploadBtn from './AvatarUploadBtn';
import ProviderBlock from './ProviderBlock';


const Dashboard = ({onSignOut}) => {
const {profile}=useProfile()


// on save function for edit and save the nick name to fiebase database
const onSave= async (newData)=>{



// save the nick name to fiebase database
 const userNicknameRef=  database.ref(`/profiles/${profile.uid}`).child('name')
  
 try {
    await userNicknameRef.set(newData);
    Alert.success("Nick Name  has been Updated",4000)
  } catch (err) {
   Alert.error(err.message,4000);
    
  }

 console.log(newData);
}

  return (
    <>
     <Drawer.Header>
       <Drawer.Title>
        Title
       </Drawer.Title>
     </Drawer.Header>

    <Drawer.Body>
      <h3> Hey ,{profile.name}</h3>


      <ProviderBlock/>
      <Divider/>

      <EditableInput
      name="nickname"
        initialValue={profile.name}
        onSave={onSave}
      label={<h6 className="mb-2"> NickName</h6>}

      />
      
      <AvatarUploadBtn/>

    </Drawer.Body>

{/* sign out part */}
    <Drawer.Footer>
      <Button block color="red" onClick={onSignOut} >
        Sign Out
      </Button>
      Footer
    </Drawer.Footer>



    </>
  )
}

export default Dashboard
