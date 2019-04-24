import React, { Component } from 'react'
import axios from 'axios'
import {
    Grid,
    Row,
    Col,
    FormGroup,
    ControlLabel,
    FormControl
  } from "react-bootstrap";  
import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { UserCard } from "components/UserCard/UserCard.jsx";
import Button from "components/CustomButton/CustomButton.jsx";


export default class Patientdetails extends Component {
    state={
        details :[]
    }
    componentDidMount() {
        console.log(this.props)
        let id = this.props.match.params.patient;
        axios.get('https://bms-icl-yoga.herokuapp.com/user/id/' + id )
        .then(res => {
            this.setState({
                details: res.data.user_details
            })
           
        })
        this.setState({ id : id })

    }
  render() {
    const {details} = this.state
    return (
        <div className="content">
        {
            <Grid fluid>
                <Row>
                    <Col md={12}>
                        <Card
                            title={details.username}
                            className="text-warning"
                        />
                            <div className="card"> 
                                
                                <div className="text-info" style={{fontFamily:"Arial",fontSize:"20px",padding:"20px",paddingBottom:"0px"}}>PERSONAL INFORMATION</div>
                                <br/>
                                <br/>
                                <h5  style={{fontFamily:"Arial",padding:"20px",paddingTop:"0px",color:"#4d0000"}}>
                                    Name : {details.f_name+ " "+details.m_name+" "+details.l_name}<br/><br/>
                                    Height: {details.height}cm<br/>
                                    Weight: {details.weight}Kgs<br/>

                                </h5>
                            
                            
                            
                            
                            
                            
                            </div>
                                
                                   
                                    
                                
                        
                        
                        
                    </Col>
                </Row>
            </Grid>
                
            
        }            
        </div>
        
    )
  }
}
