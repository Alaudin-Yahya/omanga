import React, { Component } from 'react';
class Nav2 extends Component {
    state = {  }
    render() { 
        return (
            <nav className='search-box'>
                <div class="form-group" autocomplete="off"> 
                    <input type="text" class="form-control" id="search" placeholder="Search" name="search"/>
                </div>
                
            </nav>
          );
    }
}
 
export default Nav2;