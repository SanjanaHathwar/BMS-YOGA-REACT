import React, { Component } from "react";
import { Grid, Row, Col, Alert } from "react-bootstrap";
import Axios from "axios";

class Notifications extends Component {
  constructor(props){
    super(props);
    this.state={
      feedback :[],
      
    }
  
}
  componentDidMount(){
    this.getAll()
  }
 
    
  
  getAll = () =>{
    Axios.get('https://bms-icl-yoga.herokuapp.com/feedback/all')
    .then(res=>{
      this.setState({feedback:res.data.user})
    })
  }

  render() {
    const {feedback} =this.state
   
    return (
      <div className="content">
        <Grid fluid>
          <div className="card">
            <div className="header">
              <h4 className="title">All Feedbacks</h4>
             
            </div>
            <div className="content">
              <br/><br/>
              <Row>
                {
                feedback.length ? (
                    feedback.map((not,i)=> {
                    const {feedback} =not
                    return(
                      <Col md={6} key={feedback._id}>
                        <Alert style={{backgroundColor:" #58cfb2 "}} className="alert-with-icon" >
                          
                          <span >
                        
                           <b style={{fontFamily:"Arial" ,fontSize:"15px"}}>From : {feedback.email}</b><br/><br/>
                           <span style={{align:"left",fontFamily:"Arial"}} >{feedback.feedbackMsg}</span><br/>
                          </span>
                          
                        </Alert>
                      </Col>
                    )
                  })
                  )
                  :
                  (
                   
                    <div >
                    {/* <Spinner animation="grow" /> */}
                    </div> )
  
                }
              </Row>
              <br />
              <br />
              
            </div>
          </div>
        </Grid> 
      </div>
    );
  }
}

export default Notifications;
