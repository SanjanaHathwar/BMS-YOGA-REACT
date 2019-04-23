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
                            <Card
                            
                            content={
                                <form>
                                    <FormInputs
                                        ncols={["col-md-5", "col-md-3", "col-md-4"]}
                                        proprieties={[
                                            {
                                                label: "Company (disabled)",
                                                type: "text",
                                                bsClass: "form-control",
                                                placeholder: "Company",
                                                defaultValue: "Creative Code Inc.",
                                                disabled: true
                                            },
                                            {
                                                label: "Username",
                                                type: "text",
                                                bsClass: "form-control",
                                                placeholder: "Username",
                                                defaultValue: "michael23"
                                            },
                                            {
                                            label: "Email address",
                                            type: "email",
                                            bsClass: "form-control",
                                            placeholder: "Email"
                                            }
                                        ]}
                                    />
                                    <FormInputs
                                        ncols={["col-md-6", "col-md-6"]}
                                        proprieties={[
                                            {
                                                label: "First name",
                                                type: "text",
                                                bsClass: "form-control",
                                                placeholder: "First name",
                                                defaultValue: "Mike"
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
                                </form>
                                
                            }
                        />
 
                    </Col>
                </Row>
            </Grid>
                
            
        }            
        </div>
        
    )
  }
}
