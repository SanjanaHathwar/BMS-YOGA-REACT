import React, { Component } from "react";
import { Grid, Row, Col, Alert } from "react-bootstrap";
import {Modal} from 'react-bootstrap'
import Loader from 'react-loader-spinner'
import Button from "../../components/CustomButton/CustomButton.jsx";
import Axios from "axios";

class Notifications extends Component {
  constructor(props){
    super(props);
    this.state={
      notify :[],
      show: false,
      isLoading:false
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
    this.setLoader()
    setTimeout(this.getAll, 2000);
   
  
  }
  setLoader =() => {
    this.setState({isLoading:true})
  }
  handleChange = event => {
    this.setState({[event.target.id]: event.target.value});
   
    
  } 
  getAll = () =>{
    this.setState({isLoading:false})
    Axios.get('https://bms-icl-yoga.herokuapp.com/notification/get')
    .then(res=>{
      this.setState({notify:res.data.notification.slice(0,8)})
    })
  }
//POST NOTIFICATION TO ALL
  postNotification = (not) => {
    console.log("new")
    Axios.post('https://bms-icl-yoga.herokuapp.com/notification/all',{
      "title" : "New",
      "body"  : not
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
    const {notify,isLoading} =this.state
   
    return (
      <div className="content">
        <Grid fluid>
          <div className="card">
            <div className="header">
            <Button style={{float:"right"}} bsStyle="info" onClick={this.handleShow}>Push Notification</Button>
              <h4 className="title">New Notifications</h4>
             
            </div>
            <div className="content">
            {
              isLoading ? (<div><center><Loader type="Oval" color="#3498db" height={50} width={50} /></center></div>)
              : 
              (<div>
                <br/><br/>
                <table className="table">
                  <tbody>
                  {
                    notify.length ? (
                    notify.map((not,i)=> {
                      const {nBody,_id} =not
                      return( 
                        <tr  style={{paffingLeft:"20px"}} key={_id}> 
                          <td style={{fontFamily:"Arial" ,fontSize:"15px"}}>{nBody}</td>
                        </tr>

                        // SHOWING THE NOTIFICATIONS USING CARD
                        // <Col md={6} key={_id}>
                        //   <Alert style={{backgroundColor:" #3498db "}} className="alert-with-icon" >
                        //     <span data-notify="icon" className="pe-7s-bell" style={{fontSize:"20px"}} />
                        //     <span >
                          
                        //     <b style={{fontFamily:"Arial" ,fontSize:"15px"}}> {nBody}</b><br/><br/>
                        //     <span style={{float:"right",fontFamily:"Arial"}} >{timestamp}</span><span style={{float:"right"}}className="pe-7s-clock"></span><br/>
                        //     </span>
                            
                        //   </Alert>
                        // </Col>
                      )
                    })
                    )
                    :
                    (
                    
                      <div >

                      </div> )
    
                  }
                  </tbody>
                </table>
              <br />
              <br />
              </div> ) }
              
            </div>
          </div>
        </Grid>
        <Modal show={this.state.show} onHide={this.handleClose} animation={true} autoFocus={true} >
          <Modal.Header closeButton>
            <Modal.Title>Push Notification</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <form>
                <div className="form-group">
                  <label className="col-form-label">Recipient:</label>
                  <input type="text" className="form-control" id="recipient-name" value="All" disabled/>
                </div>
                <div className="form-group">
                  <label className="col-form-label">Message:</label>
                  <textarea  onChange={this.handleChange} className="form-control" id="notification"></textarea>
                </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="info" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button bsStyle="info" onClick={()=>this.postNotification(this.state.notification)}>
              Post
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Notifications;
