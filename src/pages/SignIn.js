import React from 'react'
import { Container, Row ,Panel,Col,Icon,Button,Grid, Alert} from 'rsuite'
import firebase from 'firebase/app';

import { auth, database } from '../misc/firebase';





const SignIn = () => {

const signInWithProvider= async provider=>{

try {
  const {additionalUserInfo,user}= await  auth.signInWithPopup(provider);
  
  if(additionalUserInfo.isNewUser){
   await database.ref(`/profiles/${user.uid}`).set({
      name:user.displayName,
      createdAt:firebase.database.ServerValue.TIMESTAMP
    })

  }
  Alert.success('SignIn',4000)
  
} catch (err) {
  Alert.info(err.message,4000)

  
}


 
};



  const onFacebookSignIn=()=>{

    signInWithProvider( new firebase.auth.FacebookAuthProvider())
  };


  const onGoogleSignIn=()=>{
    signInWithProvider(new firebase.auth.GoogleAuthProvider())
  };



  return (
    <Container>
      <Grid className="mt-page">
      <Row>
        <Col xs={24} md={12} mdOffset={6}>
          <Panel>
            <div className="text-center ">
              <h2 className="text-green">
                Welcome To Chat APP
              </h2>
              <p>Progressive web PlateForm</p>


            </div>
            <div className="mt-3">
            <Button block color="blue" onClick={onFacebookSignIn}>
            <Icon icon="facebook"/> Continue with facebook
            </Button>

            <Button block color="green" onClick={onGoogleSignIn}>
            <Icon icon="google"/> Continue with google
            </Button>
            </div>
          </Panel>
        </Col>
      </Row>
      </Grid>
      SignIn
    </Container>
  )
}

export default SignIn
