import React from 'react';
import { Switch,Route } from 'react-router';
import 'rsuite/dist/styles/rsuite-default.css';

import './styles/main.scss'
import SignIn from './pages/SignIn';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import PublicRoute from './components/PublicRoute';


function App() {
  return (
    <Switch >
     <PublicRoute>
       <SignIn  path="/signin"/>
     </PublicRoute>
    
    <PrivateRoute path="/">
      <Home/>
    </PrivateRoute>
    </Switch>
  );
}

export default App;
