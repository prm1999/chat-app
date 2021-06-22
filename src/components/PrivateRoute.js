import React,{useContext} from 'react'
import { Route,Redirect } from 'react-router';
import { Container,Loader } from 'rsuite';
import { useProfile } from '../context/profile.context';

const PrivateRoute = ({children,...routeProps}) => {


  // adding loading picture or status in the browser
  const {profile,isLoading}=useProfile();

  if(isLoading && !profile){
    return <Container>
      <Loader center vertical="md" content="Loading" speed="slow"/>
    </Container>
  }



//  Check if profile is present
  if(!profile && !isLoading){
    return( <Redirect to="/signin/"/>);
  }

  return (
    <Route {...routeProps}>
      {children}
    </Route>
  )
}

export default PrivateRoute
