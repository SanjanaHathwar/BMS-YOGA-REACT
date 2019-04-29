import React, { Component } from "react";
import { Grid, Row, Col, Alert } from "react-bootstrap";
import {Modal} from 'react-bootstrap'

import Button from "components/CustomButton/CustomButton.jsx";
import Axios from "axios";

class Health extends Component {
  constructor(props){
    super(props);
    this.state={
      notify :[],
      show: false
    }
  
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  
  }
  handleClose() {
    this.setState({ show: false });
  }

  handleShow(not) {
    
    this.setState({ show: true });
  }
  
  componentDidMount(){
    this.getAll()
  }
  handleChange = event => {
    this.setState({[event.target.id]: event.target.value});
   
    
  } 
  getAll = () =>{
    Axios.get('https://bms-icl-yoga.herokuapp.com/notification/get')
    .then(res=>{
      this.setState({notify:res.data.notification.slice(0,8)})
    })
  }
//POST HEALTH TIP TO ALL
  postNotification = (tip,type) => {
    console.log("new")
    Axios.post('https://bms-icl-yoga.herokuapp.com/tip',{
      "type" : type,
      "body"  : tip
    })
    .then(res=>{
      console.log(res)
      if(res.data.success === true){
          alert("Notification sent successfully");
          this.handleClose()
          this.getAll()
      }
    })
  }
  render() {
    const {notify} =this.state
   
    return (
      <div className="content">
        <Grid fluid>
          <div className="card">
            <div className="header">
            <Button style={{float:"right"}} bsStyle="danger" onClick={this.handleShow}>Send Health Tip</Button>
              <h4 className="title">Health Tips</h4>
             
            </div>
            <div className="content">
              <br/><br/>
              <Row>
                {
                  notify.length ? (
                  notify.map((not,i)=> {
                    const {nBody,_id,timestamp} =not
                    return(
                      <Col md={6} key={_id}>
                        <Alert style={{backgroundColor:" #ee5782 "}} className="alert-with-icon" >
                          <span data-notify="icon" className="pe-7s-gym" style={{fontSize:"20px"}} />
                          <span >
                        
                           <b style={{fontFamily:"Arial" ,fontSize:"15px"}}> {nBody}</b><br/><br/>
                           <span style={{float:"right",fontFamily:"Arial"}} >{timestamp}</span><span style={{float:"right"}}className="pe-7s-clock"></span><br/>
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
        <Modal show={this.state.show} onHide={this.handleClose} animation={true} autoFocus={true} centered={true}>
          <Modal.Header closeButton>
            <Modal.Title>Health Tip</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <form>
                <div className="form-group">
                  <label for="recipient-name" className="col-form-label">Recipient:</label>
                  <input type="text" className="form-control" id="recipient-name" value="All" disabled/>
                </div>
                <div className="form-group">
                  <label for="healthTip" className="col-form-label">Tip for the day:</label>
                  <textarea  onChange={this.handleChange} className="form-control" id="healthTip"></textarea>
                </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="danger" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button bsStyle="danger" onClick={()=>this.postTip(this.state.notification)}>
              Post
            </Button>
          </Modal.Footer>
        </Modal>




      </div>
    );
  }
}

export default Health;
