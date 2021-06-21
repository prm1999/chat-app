import React from 'react'
import { Route,Redirect } from 'react-router';



const PublicRoute = ({children,...routeProps}) => {
  const profile=false;
//  Redirect the page to the home page after sign in



  if(profile){
    return <Redirect to="/"/>
  }

  return (
    <Route {...routeProps}>
      {children}
      PrivateRoute
    </Route>
  )
}

export default PublicRoute
