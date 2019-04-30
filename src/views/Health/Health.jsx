import React, { Component } from "react";
import { Grid, Row, Col, Alert } from "react-bootstrap";
import {Modal} from 'react-bootstrap'
import Button from "components/CustomButton/CustomButton.jsx";
import Axios from "axios";
import Select from 'react-select'


const options = [
  { value: 'Health', label: 'Health' },
  { value: 'Life style', label: 'Life style' },
  { value: 'Food & Drink', label: 'Food & Drink' },
  { value: 'Healthy Diet', label: 'Healthy Diet' }
];
class Health extends Component {
  constructor(props){
    super(props);
    this.state={
      tips :[],
      show: false,
      selectedOption:null,
      healthTip:'',
      type:''
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
  
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    this.setState({type:selectedOption.value})
    
  }

  handleChangeText = (event) =>{
    this.setState({[event.target.id] : event.target.value})
  }


  getAll = () =>{
    Axios.get('https://bms-icl-yoga.herokuapp.com/tip')
    .then(res=>{
      this.setState({tips:res.data.tip})
    })
  }
//POST HEALTH TIP TO ALL
  postTip = (tip,type) => {
    console.log(type,tip)
    Axios.post('https://bms-icl-yoga.herokuapp.com/tip',{
      "type" : type,
      "health_tip"  : tip
    })
    .then(res=>{
      console.log(res)
      if(res.statusText === "Created"){
          alert("Health Tip sent successfully");
          this.handleClose()
          this.getAll()
      }
    })
  }
  render() {
    const {tips,selectedOption,type,healthTip} =this.state
   
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
                  tips.length ? (
                  tips.map((not)=> {
                    const {type,_id,health_tip} =not
                    return(
                      <Col md={6} key={_id}>
                        <Alert style={{backgroundColor:"#ee5782"}} className="alert-with-icon" >
                          <span data-notify="icon" className="pe-7s-gym" style={{fontSize:"20px"}} />
                          <span >
                        
                           <b style={{fontFamily:"Arial" ,fontSize:"15px",fontStyle:"normal"}}> {type}</b><br/>
                           <span style={{fontFamily:"Arial",fontSize:"15px"}} >{health_tip}</span><br/>
                          </span>
                          {console.log(this.state.healthTip)}
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
        <Modal show={this.state.show} onHide={this.handleClose} animation={true} autoFocus={true}>
          <Modal.Header closeButton>
            <Modal.Title>Health Tip</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <form>
                <div className="form-group">
                  <label className="col-form-label">Type:</label>
                  <Select
                    value={selectedOption}
                    onChange={this.handleChange}
                    options={options}
                  />
                </div>
                <div className="form-group">
                  <label className="col-form-label">Tip for the day:</label>
                  <textarea  name="healthTip" onChange={this.handleChangeText} className="form-control" id="healthTip"></textarea>
                </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="danger" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button bsStyle="danger" onClick={()=>this.postTip(healthTip,type)}>
              Send
            </Button>
          </Modal.Footer>
        </Modal>




      </div>
    );
  }
}

export default Health;
