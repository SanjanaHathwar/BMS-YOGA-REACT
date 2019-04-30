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
  import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { Card } from "components/Card/Card.jsx";


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
                            <h4 className="text-danger" style={{padding:"15px",fontFamily:"Arial"}}>PERSONAL INFORMATION</h4>
                            <form style={{padding:"15px"}}>
                                <FormInputs

                                ncols={["col-md-5", "col-md-3", "col-md-4"]}
                                proprieties={[
                                    {
                                        label: "FIRST NAME",
                                        type: "text",
                                        bsClass: "form-control",
                                        value: details.f_name,
                                    
                                    },
                                    {
                                        label: "MIDDLE NAME",
                                        value: details.m_name
                                    },
                                    {
                                        label: "LAST NAME",
                                        value: details.l_name
                                    }
                                ]}
                                />
                                <FormInputs
                                ncols={["col-md-6", "col-md-6"]}
                                proprieties={[
                                    {
                                    label: "EMAIL ID",
                                    value: details.email
                                    },
                                    {
                                    label: "Last name",
                                    type: "text",
                                    bsClass: "form-control",
                                    placeholder: "Last name",
                                    defaultValue: "Andrew"
                                    }
                                ]}
                                />
                                <FormInputs
                                ncols={["col-md-12"]}
                                proprieties={[
                                    {
                                    label: "Adress",
                                    type: "text",
                                    bsClass: "form-control",
                                    placeholder: "Home Adress",
                                    defaultValue:
                                        "Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                                    }
                                ]}
                                />
                                <FormInputs
                                ncols={["col-md-4", "col-md-4", "col-md-4"]}
                                proprieties={[
                                    {
                                    label: "City",
                                    type: "text",
                                    bsClass: "form-control",
                                    placeholder: "City",
                                    defaultValue: "Mike"
                                    },
                                    {
                                    label: "Country",
                                    type: "text",
                                    bsClass: "form-control",
                                    placeholder: "Country",
                                    defaultValue: "Andrew"
                                    },
                                    {
                                    label: "Postal Code",
                                    type: "number",
                                    bsClass: "form-control",
                                    placeholder: "ZIP Code"
                                    }
                                ]}
                                />

                                <Row>
                                <Col md={12}>
                                    <FormGroup controlId="formControlsTextarea">
                                    <ControlLabel>About Me</ControlLabel>
                                    <FormControl
                                        rows="5"
                                        componentClass="textarea"
                                        bsClass="form-control"
                                        placeholder="Here can be your description"
                                        defaultValue="Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo."
                                    />
                                    </FormGroup>
                                </Col>
                                </Row>
                            
                                <div className="clearfix" />
                            </form>  
                        </div>
                    </Col>
                </Row>
            </Grid>
                
            
        }            
        </div>
        
    )
  }
}
