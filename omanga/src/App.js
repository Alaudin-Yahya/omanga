import React from 'react';
import './App.css';
import Nav from './Components/Nav';
import Login from './Components/Login';
import Signup from './Components/Signup';
import {
  BrowserRouter as Router,
  //Link,
  Route,
  Switch,
} from 'react-router-dom';
import Profile from './Components/profile';
import UserProfile from './Components/UserProfile';

function App() {
  return (
    <Router>
      
        
      <Switch>
        <Route  path='/' exact component = {Signup}/>
        <Route  path='/login' exact component={Login}/>
        <Route path = '/profile' exact component={Profile}/>
        {/* <Route path = '/pro' exact component={UserProfile}/> */}
      </Switch>
    </Router>

  );
}



export default App;
