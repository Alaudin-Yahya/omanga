import React, { Component } from 'react';
import Nav from './Nav';
//import Nav2 from './Nav2';
//import Profile from './profile'
import {
    //BrowserRouter as Router,
    //Link,
    //Route,
    //Switch,
    Redirect
  } from 'react-router-dom';
  
class Login extends Component {
    state = {
        email:'',password:'',res:'',auth:false,token:'',load:false
      }
    handleChange=({target})=>{
        this.setState({
            [target.name]:target.value
        })
    }
    handleSubmit=()=>{
        this.setState({load:true})
        fetch('api/login',{
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body:JSON.stringify({
                email:this.state.email,
                password:this.state.password     
            })
        }
           
        )
        .then(response => response.json())
        .then(data => {
            if(!data){
                this.setState({ res: "Incorrect Email or password",load:false})
            }
            else{
                this.setState({token:data,auth:true, load:false})
            }
        });
    }
    render() { 
        return (
            <React.Fragment>
            <Nav/>
            <div className='container'>
                <div className="">
                    <form className='form-center col-sm-6'>
                    <br/>
                        <h3 className='text-center'> Login Your Account</h3>

                        <div class="form-group">
                            <br/><br/>
                            <input type="email" class="form-control" id="email" placeholder="Enter email" name="email" value={this.state.email} onChange={this.handleChange}/>
                        </div>
                        <div class="form-group">
                            <input type="password" class="form-control" id="pwd" placeholder="Enter password" name="password" value={this.state.password} onChange={this.handleChange}/>
                        </div>
                        <div class="form-group">
                            <p>{this.state.res}</p>

                        </div>
                            
                    </form>
                    <button className='btn btn-danger btn-login' onClick={this.handleSubmit}>Submit</button>
                    <br/><br/>
                    {
                        this.state.load?
                        <div class="">
                            <div class="loader" id="loader-1" style={{left:"2%"}}></div>
                        </div>
                        :<div></div>
                    }
                    
                </div>
            </div>
            {/* <Nav2/> */}
            { this.state.auth && 
                // <Route exact path="/login" component={Profile} />
                // 
                <Redirect to={{
                    pathname: '/profile',
                    state: { token: this.state.token }
                    }}
                />
                
            }
            
         </React.Fragment>
          );
    }
}
 
export default Login;