import React, { Component } from "react";
import { NavItem, Nav } from "react-bootstrap";
import Axios from "axios";
import {withRouter} from 'react-router-dom'

class HeaderLinks extends Component {

  handleClick = () => {
   
    const x =sessionStorage.getItem('token')
  
    Axios.get('https://bms-icl-yoga.herokuapp.com/trainer/logout/'+x)
    .then(res=>{
      console.log(res)
      sessionStorage.removeItem('token')
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
