import React, { Component } from 'react';
import {
    //BrowserRouter as Router,
    Link,
    //Route,
    //Switch,
  } from 'react-router-dom';
  

class Nav extends Component {
    state = {  }
    render() { 
        return (
            <nav className='nav-style'>
                <h1><Link to='/' className='link-style'>Omanga</Link></h1>
                <h3><Link to='/login' className='link-style'>login</Link> </h3>
                <h3><Link to='/' className='link-style'>Signup</Link></h3>
                {/* <h4></h4> */}
            </nav>
            
          );
    }
}
 
export default Nav;