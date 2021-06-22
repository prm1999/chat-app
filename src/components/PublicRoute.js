import React from 'react'
import { Route,Redirect } from 'react-router';
import { Container,Loader } from 'rsuite';

import { useProfile } from '../context/profile.context';



const PublicRoute = ({children,...routeProps}) => {
  
//  Redirect the page to the home page after sign in
const {profile,isLoading}=useProfile();

  if(isLoading && !profile){
    return <Container>
      <Loader center vertical="md" content="Loading" speed="slow"/>
    </Container>
  }



//  Check if profile is present
  if(profile && !isLoading){
    return( <Redirect to="/"/>);
  }



  // if(profile){
  //   return <Redirect to="/"/>;
  // }

  return (
    <Route {...routeProps}>
      {children}
     </Route>
  )
}

export default PublicRoute
