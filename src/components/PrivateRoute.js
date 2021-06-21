import React from 'react'
import { Route,Redirect } from 'react-router';

const PrivateRoute = ({children,...routeProps}) => {



  const profile=false;
//  Check if profile is present
  if(!profile){
    return <Redirect to="/signin/"/>
  }



  return (
    <Route {...routeProps}>
      {children}
      PrivateRoute
    </Route>
  )
}

export default PrivateRoute
