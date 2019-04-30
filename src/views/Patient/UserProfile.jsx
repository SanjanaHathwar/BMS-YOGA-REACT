import React, { Component } from 'react'
import { Grid, Row, Col, Table } from "react-bootstrap";
import Card from "components/Card/Card.jsx";
import axios from 'axios'
import {Link} from 'react-router-dom'


export default class UserProfile extends Component {
 
  state = {
    patient:[]
  }
  
  componentDidMount() {
    axios.get('https://bms-icl-yoga.herokuapp.com/user')
    .then(res => { 
        this.setState({
        patient: res.data.user
        })
        
    })
  }
  render() {
    const {patient} = this.state
    const thArray = ["ID"," USERNAME","FIRST NAME","LAST NAME", "EMAIL" , "PHONE"]
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table striped hover>
                    <thead className="text-warninf">
                      <tr >
                        {thArray.map((prop, key) => {
                          return <th className="text-danger" style={{fontFamily:"Arial",fontSize:"15px"}}  key={key}>{prop}</th>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {
                         patient.map((ssup,i) => {
                           const {user_details} = ssup
                           
                        return (

                          <tr style={{fontFamily:"Arial"}} key={user_details._id}>
                            <td>{i+1}</td>
                            <td>{user_details.username}</td>
                            <td>{user_details.f_name}</td>
                            <td>{user_details.l_name}</td>
                            <td>{user_details.email}</td>
                            <td>{user_details.phone}</td>
                            
                            <td> <Link to={'/' + user_details._id}><b><i style={{paddingTop:"15px",width:"20px",outline:"12px"}} className="pe-7s-info text-primary"></i></b></Link></td> 
                          </tr>
                        );
                      })} 
                    </tbody>
                  </Table>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}
