import React, { Component } from 'react';
import Nav from './Nav';
class Signup extends Component {
    state = {
        firstname:'Alaudin',
        lastname:'Yahya',
        email:'A@gamil',
        password:'1234',
        res:[]
    }
    // componentWillMount(){
    //     fetch('/api/signup')
    //     .then(response=>response.json())
    //     .then(response=>console.log(response))
    // }
    handleChange=({ target })=> {
        this.setState({
          [target.name]: target.value
        });
        //console.log(this.state.search)
    }
    handlesubmit=()=>{
        // var data={
        //     firstname:this.state.firstname,
        //     lastname:this.state.lastname,
        //     email:this.state.email,
        //     password:this.state.password
        // }
        fetch("/api/signup", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            // body:  JSON.stringify(data)
            body:JSON.stringify({
                firstname:this.state.firstname,
                lastname:this.state.lastname,
                email:this.state.email,
                password:this.state.password
            })
            }
            
            )
            .then(response => response.json())
            .then(data => this.setState({ res: data }));
            // .then(
            //     (response)=>{
            //         console.log(response.json())
            //         //console.log(response.data)
            //     },
                 
            // )
            
            // .then(
            //     data=>this.setState({
            //         res:data
            //     })
            // );
    }
    render() { 
        return (
            <div>
                <Nav/>
                    <div className='container'>
                            <form >
                                <br/>
                                <h3>Signup For free..!!</h3>

                                <div className="form-group">
                                    <br/><br/>
                                    <input type="text" className="form-control" id="fname" placeholder="First Name" name="firstname" value={this.state.firstname} onChange={this.handleChange}/>
                                </div>
                                <div className="form-group">
                                    
                                    <input type="text" className="form-control" id="lname" placeholder="Last Name" name="lastname" value={this.state.lastname} onChange={this.handleChange}/>
                                </div>
                                <div className="form-group">
                                    <input type="email" className="form-control" id="email" placeholder="Enter email" name="email" value={this.state.email} onChange={this.handleChange}/>
                                </div>
                                <div className="form-group">
                                    <p style={{color:'red'}}>
                                        {this.state.res}
                                    </p>
                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-control" id="pwd" placeholder="Enter password"  name="password" value={this.state.password} onChange={this.handleChange}/>
                                </div>
                                
                            </form>
                            <button className='btn btn-info' onClick={this.handlesubmit}>Create Account</button>
                            {console.log(this.state.res)}
                            </div>
                </div>
          );
    }
}
 
export default Signup;