import React, { Component } from 'react';
//import Nav2 from './Nav2';
import {
    BrowserRouter as Router,
    Link,
    Redirect,
    Route,
    Switch,
  } from 'react-router-dom';
import UserProfile from './UserProfile';
  
class Profile extends Component{
    state = {name:'', review:"", 
        token:this.props.location.state.token,
        msg:'',
        reviewArray:[],
        search:'',hash:'',load:false,profileLoad:false,
        nameList:false,
        redirect:false
    }

    componentWillMount(){
        fetch('api/auth',{
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({token:this.state.token})
        })
        .then(Response=>Response.json())
        .then(data=>this.setState({
            name:data,
            
        }))
        

    }
    componentWillUpdate(){
        fetch('/api/reviewGet')
        .then(response=>response.json())
        .then(data=>this.setState({
            reviewArray:data,
            profileLoad:true
        }))
        //this.state.reviewArray.reverse();
    }
    handleChange=({target})=>{
        this.setState({
            [target.name]:target.value
        })
    }

    handleSubmit=()=>{
        this.setState({
            load:true
        })
        this.hashing(this.state.review);
        fetch('api/reviewPost',{
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body:JSON.stringify({
                user_id:this.state.token,
                name:this.state.name,
                review:this.state.review,
                hashtag:this.state.hash     
            })
        }
           
        )
        .then(response => response.json())
        .then(data=>this.setState({
            review:'',msg:data,
            load:false
        }))
        //this.loading()
    }
    
    hashing=(str)=>{
        //var str = "#Hello World! , how is every thing going , #chillings";
        var a=[];
        var b=[];
        for (var i = 0 ; i<str.length; i++){
            if (str[i]==='#'){
                for (var j=i; j<str.length; j++){
                    
                    if(str[j]===' '){break;}
                     else {a[j]=str[j];}
                   
                }
            }
            // else {
            //     b[i]=str[i]
            // }
        }
        for (var i=0; i<str.length; i++){
            if (str[i]==='#'){
                for(j=i; j<str.length; j++){
                    if(str[j]!==''){
                        i++;
                    }
                    else {break;}
                }
            }
            else {b[i]=str[i]}
        }
        //var result = a.join("");
        //console.log(b.join(""));
        // return(
        //     <div>
        //         <h4>{result}</h4>
        //     </div>
        // )
        //return result;
        this.state.review=b.join("");
        this.state.hash=a.join("");
    }
    listOn=()=>{
        this.setState({
            nameList:true
        })
    }
    listOff=()=>{
        this.setState({
            nameList:false
        })
    }
    setRedeirect=()=>{
        this.setState({
            redirect:true
        })
        //this.props.router.push('/'+this.state.name)
    }
    removeRedirect=()=>{
        this.setState({
            redirect:false
        })
    }
    navcontents=()=>{
        return(
            <div>
                <nav className='nav-style'>
                    <h1 className='link-style' onClick={this.removeRedirect}><Link to='/profile' className='link-style'>Omanga</Link></h1>
                    <nav className='search-box'>
                    <div class="" autocomplete="off"> 
                        <input type="text" className="form-control" id="search" placeholder="Search using #tags!!" name="search" value={ this.state.search } 
                        onChange={ this.handleChange } />
                    </div>
                    
                    </nav>
                    <div onMouseOver={this.listOn} >
                        <h3 onClick={this.setRedeirect}>
                            {this.state.name}
                            
                        </h3>
                        {this.state.nameList?
                        <ul className='list' onMouseLeave={this.listOff} >
                            <li class="font-weight-bold"><Link to='/' className=''>Logout</Link></li>
                            <li><a href="#">Settings</a></li>
                            
                            
                        </ul>
                        :<div></div>
                        }
                    
                        
                        
                    
                    </div>
                    
                </nav>
                {/* <nav className='search-box'>
                    <div class="form-group" autocomplete="off"> 
                        <input type="text" className="form-control" id="search" placeholder="Search using #tags!!" name="search" value={ this.state.search } 
                        onChange={ this.handleChange } />
                    </div>
                    
                </nav>
                
                <h3 className="user-name">
                    {this.state.name}
                </h3> */}
                
                 
                
                
            </div>

        )
    }
    hashToSearch=(hash)=>e=>{
        this.setState({
            search: hash
        })
    }
    render(){
        if (this.state.redirect){
                //<Route exact path="/pro" component={UserProfile} />
                return(
                    <React.Fragment>
                        {this.navcontents()}
                        {/* <Router>
                        <Route exact path={'/'+this.state.name.replace(' ','-')} exact component={() => <UserProfile reviewArray={this.state.reviewArray} name={this.state.name}/>} />
                        <Redirect from='/profile' to={'/'+this.state.name.replace(' ','-')} />
                        </Router> */}
                        <div>
                        <div className="container">
                            <div className="row">
                                <div className='col-sm-7 border border-primary ScrollStyle'>
                                    {   
                                        this.state.reviewArray.map((item)=>{
                                            if(item.name===this.state.name && item.user_id===this.state.token){
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
                                <div className='col-sm-5'>
                                    <h3>
                                        Post a Review..!!
                                    </h3>
                                    <div class="form-group">
                                        {/* <label for="comment">Comment:</label> */}
                                        <textarea class="form-control" rows="12" id="comment" name="review" value={this.state.review} onChange={this.handleChange}></textarea>
                                    </div>
                                    {/* <p >
                                        {this.state.msg}
                                    </p> */}
                                    <button className='btn-lg btn-success' onClick={this.handleSubmit}>POST</button><br/><br/>
                                    {/* <div class="spinner-border text-primary" role="status">
                                        <span class="sr-only">Loading...</span>
                                    </div> */}
                                    { this.state.load?
                                        <div id='load'>
                                            
                                            
                                            <div class="col-md-3 bg">
                                            
                                                <div class="loader" id="loader-1"></div>
                                            </div>
                                            <h4 > Posting...</h4>
                                        </div>
                                        :<p>{this.state.msg}</p>
                                    }
                                </div>
                        


                            </div>

                        </div>
                    </div>
                    </React.Fragment>
                )
        }
        
        else if (this.state.search!==''){
            var searchItem=this.state.search;
            return(
                <React.Fragment>
                {this.navcontents()}    
                <div>
                    <div className="container">
                        <div className="row">
                            <div className='col-sm-7 border border-primary ScrollStyle'>
                                {
                                    this.state.reviewArray.map((item)=>{
                                        if(item.hashtag.toUpperCase().includes (searchItem.toUpperCase())){
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
                                        else{
                                            return <div></div>
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
        else
        return(
            <React.Fragment>
                {/* <Nav2/> */}
                {this.navcontents()}
                
                <div className='container'>
                    
                    <div className="row">
                        <div className='col-sm-7 border border-primary ScrollStyle'>
                            {this.state.profileLoad?
                        
                    
                                this.state.reviewArray.map((item) =>
                                    <div className="profile-card">
                                        <h3 className="border border-primary">
                                        <span className="border border-primary">{item.name}</span>
                                            
                                        </h3>
                                        <hr/>
                                        <p>
                                            {item.review}
                                            {/* {this.hashing(item.review)} */}
                    
                                        </p>
                                        <p className="text-primary" onClick={this.hashToSearch(item.hashtag)}>{item.hashtag}</p>
                                    </div>
                                    
                                    )
                                :
                                <div>
                                    <div className="profile-card">
                                            <h3 className="border border-primary">
                                            <span className="border border-primary">Loading Reviews..</span>
                                            <div class="col-md-3 bg">
                                                <div class="loader" id="loader-1"></div>
                                            </div>
                                            </h3>
                                            <hr/>
                                            
                                    </div>
                                    
                                    <div className="profile-card">
                                            <h3 className="border border-primary">
                                            <span className="border border-primary"></span>
                                                
                                            </h3>
                                            <hr/>
                                            
                                    </div>
                                    <div className="profile-card">
                                            <h3 className="border border-primary">
                                            <span className="border border-primary"></span>
                                                
                                            </h3>
                                            <hr/>
                                            
                                    </div>
                                    <div className="profile-card">
                                            <h3 className="border border-primary">
                                            <span className="border border-primary"></span>
                                                
                                            </h3>
                                            <hr/>
                                            
                                    </div>
                                    <div className="profile-card">
                                            <h3 className="border border-primary">
                                            <span className="border border-primary"></span>
                                                
                                            </h3>
                                            <hr/>
                                            
                                    </div>
                                </div>
                            }
                            
                            
                            
                        </div>
                        
                        
                        <div className='col-sm-5'>
                            <h3>
                                Post a Review..!!
                            </h3>
                            <div class="form-group">
                                {/* <label for="comment">Comment:</label> */}
                                <textarea class="form-control" rows="12" id="comment" name="review" value={this.state.review} onChange={this.handleChange}></textarea>
                            </div>
                            {/* <p >
                                {this.state.msg}
                            </p> */}
                            <button className='btn-lg btn-success' onClick={this.handleSubmit}>POST</button><br/><br/>
                            {/* <div class="spinner-border text-primary" role="status">
                                <span class="sr-only">Loading...</span>
                            </div> */}
                            { this.state.load?
                                <div id='load'>
                                    
                                    
                                    <div class="col-md-3 bg">
                                    
                                        <div class="loader" id="loader-1"></div>
                                    </div>
                                    <h4 > Posting...</h4>
                                </div>
                                :<p>{this.state.msg}</p>
                            }
                        </div>
                        
                    </div>
                    
                </div>
            </React.Fragment>
        )
    }
}

export default Profile;