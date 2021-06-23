import React from 'react';
import { Drawer,Button } from 'rsuite';
import {useProfile} from '../../context/profile.context';


const Dashboard = ({onSignOut}) => {
const {profile}=useProfile()



  return (
    <>
     <Drawer.Header>
       <Drawer.Title>
        Title
       </Drawer.Title>
     </Drawer.Header>

    <Drawer.Body>
      Body
      <h3> Hey ,{profile.name}</h3>
      
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
