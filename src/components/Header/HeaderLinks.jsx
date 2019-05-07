import React, { Component } from "react";
import { NavItem, Nav } from "react-bootstrap";
import Axios from "axios";
import {withRouter} from 'react-router-dom'

class HeaderLinks extends Component {

  handleClick = () => {
   
    const x =localStorage.getItem('token')
  
    Axios.get('https://bms-icl-yoga.herokuapp.com/trainer/logout/'+x)
    .then(res=>{
      console.log(res)
      localStorage.removeItem('token')
      localStorage.removeItem('email')
      this.props.history.push("/"); 
      window.location.reload();
    })
  }
  render() {
    
    return (
      <div>
        
        <Nav pullRight>
          
          <NavItem onClick= {this.handleClick} eventKey={3}>
            Logout
          </NavItem>
        </Nav>
      </div>
    );
  }
}

export default withRouter(HeaderLinks);
