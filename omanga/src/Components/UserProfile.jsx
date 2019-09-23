import React, { Component } from 'react';
//import Nav2 from './Nav2';
import {
    //BrowserRouter as Router,
    Link,
    //Route,
    //Switch,
  } from 'react-router-dom';
  
class UserProfile extends Component{
    render(){
        return(
            <React.Fragment>
                <div>
                    <div className="container">
                        <div className="row">
                            <div className='col-sm-7 border border-primary ScrollStyle'>
                                {
                                    this.props.reviewArray.map((item)=>{
                                        if(item.name===this.props.name){
                                            return(
                                                <div className="profile-card">
                                                    <h3 className="border border-primary">
                                                    <span className="border border-primary">{item.name}</span>
                                                        
                                                    </h3>
                                                    <hr/>
                                                    <p>
                                                        {item.review}
                                                        {/* {this.hashing(item.review)} */}
                                
                                                    </p>
                                                    <p className="text-primary">{item.hashtag}</p>
                                                </div>
                                            )
                                        }
                                        

                                    }
                                    )
                                }

                            </div>

                        </div>

                    </div>
                </div>
                
            </React.Fragment>
        )
    }

}

export default UserProfile;