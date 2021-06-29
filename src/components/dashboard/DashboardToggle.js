import React,{useCallback} from 'react'
import {Alert, Button,Drawer,Icon} from 'rsuite';
import { useMediaQuery, useModalState ,} from '../../misc/custom-hooks';
import { auth, database } from '../../misc/firebase';
import Dashboard from '.';
import { isOfflineForDatabase } from '../../context/profile.context';


const DashboardToggle = () => {
const {isOpen,close,open}=useModalState();

 const isMobile= useMediaQuery('(max-width:992px)')

 // Sign out Function
 const onSignOut=useCallback(() => {


  database.ref(`/status/${auth.currentUser.uid}`).set(isOfflineForDatabase).then(() => {
    auth.signOut();
    Alert.info("Signed out",4000);
    close();
    
  }).catch(err=>{
    Alert.error(err.message,4000)
  })
   
   },
   [close],
 )

// Drawer for side bar

  return (
    <>
    <Button block  size="lg" color="blue" onClick={open}>
    <Icon icon="dashboard"/> Dashboard
    </Button>
      


      <Drawer  full={isMobile} show={isOpen} onHide={close} placement="left">
      <Dashboard onSignOut={onSignOut}/>
      </Drawer>
    </>
  )
}

export default DashboardToggle
