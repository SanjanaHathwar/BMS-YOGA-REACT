import React, { Component } from "react";
import { Grid, Row, Col, Alert } from "react-bootstrap";
import Axios from "axios";
import Loader from 'react-loader-spinner'

class Notifications extends Component {
  constructor(props){
    super(props);
    this.state={
      feedback :[],
      isLoading:false
    }
  
}
  componentDidMount(){
    this.setLoader()
    setTimeout(this.getAll, 2000);
  }
  setLoader =() => {
    this.setState({isLoading:true})
  }
 
    
  
  getAll = () =>{
    this.setState({isLoading:false})
    var email= localStorage.getItem('email')
    Axios.get('https://bms-icl-yoga.herokuapp.com/feedback/email/'+email)
    .then(res=>{
    
      this.setState({feedback:res.data.feedback})
    })
  }

  render() {
    const {feedback , isLoading} =this.state
   
    return (
      <div className="content">
        <Grid fluid>
          <div className="card">
            <div className="header">
              <h4 className="title">All Feedbacks</h4>
             
            </div>
            <div className="content">
            {
              isLoading ? (<div><center><Loader type="Oval" color=" #58cfb2" height={50} width={50} /></center></div>)
              : (<div>
              <br/><br/>
              <Row>
                {
                feedback.length ? (
                    feedback.map((not,i)=> {
                    const {_id,feedbackMsg,feedback_time} =not
                    return(
                      <Col md={6} key={_id}>
                        <Alert style={{backgroundColor:" #58cfb2 "}} className="alert-with-icon" >
                          
                          <span >
                        
                           <b style={{fontFamily:"Arial" ,fontSize:"15px"}}>Message: {feedbackMsg}</b><br/><br/>
                           <span style={{align:"left",fontFamily:"Arial"}} >{feedback_time}</span><br/>
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
              </div>)}
            </div>
          </div>
        </Grid> 
      </div>
    );
  }
}

export default Notifications;
