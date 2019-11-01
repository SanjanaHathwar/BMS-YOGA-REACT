import React, { Component } from "react";
import { Grid} from "react-bootstrap";
import Button from "../../components/CustomButton/CustomButton.jsx";
import Axios from "axios";
import Select from 'react-select'
import Loader from 'react-loader-spinner'


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
      type:'',
      isLoading:false
    }
  
    // this.handleShow = this.handleShow.bind(this);
    // this.handleClose = this.handleClose.bind(this);
  
  }
//MODAL CLOSE
  handleClose() {
    this.setState({ show: false });
  }
//MODAL OPEN
  // handleShow(not) {
    
  //   this.setState({ show: true });
  // }

//CALLING GET ALL FUNCTION ON COMPONENT MOUNT
  // componentDidMount(){
    
  //   setTimeout(this.getAll, 2000);
  // }
//DISPLAY LOADER
  setLoader =() => {
    this.setState({isLoading:true})
  }
//SET STATE FOR THE SELECT BOX
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    this.setState({type:selectedOption.value})
    
  }
//SET STATE FOR THE INPUT
  handleChangeText = (event) =>{
    this.setState({[event.target.id] : event.target.value})
  }

//GET ALL HEALTH TIP
  // getAll = () =>{
  //   this.setState({isLoading:false})
  //   Axios.get('https://bms-icl-yoga.herokuapp.com/tip/all')
  //   .then(res=>{
  //     this.setState({tips:res.data.tip})
  //   })
  // }
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
//CLEAR
 handleClear =() => {
   document.getElementById('healthTip').value=""
  //  this.refs.type.value=' '
 }
  render() {
    const {selectedOption,type,healthTip,isLoading} =this.state
   
    return (
      <div className="content">
        <Grid fluid>
          <div className="card">
            <div className="header">
            {/* <Button style={{float:"right"}} bsStyle="danger" onClick={this.handleShow}>Send Health Tip</Button> */}
              <h4 className="title">Health Tips</h4>
              
            </div>
            <div style={{padding:"20px"}} className="content">
              <form>
                <div className="form-group">
                  <label className="col-form-label">Type:</label>
                  <Select
                    refs="type"
                    value={selectedOption}
                    onChange={this.handleChange}
                    options={options}
                  />
                </div>
                <div className="form-group">
                  <label className="col-form-label">Tip for the day:</label>
                  <textarea  name="healthTip" onChange={this.handleChangeText} className="form-control" id="healthTip" refs="tip"></textarea>
                </div>
                <Button bsStyle="danger"  onClick={()=>this.postTip(healthTip,type)}>
                  Send
                </Button>
                <Button bsStyle="danger"  style={{marginLeft:"20px"}} onClick={this.handleClear}>
                  Cancel
                </Button>
                
              </form>
              {
                isLoading ? (<div><center><Loader type="Oval" color="#ee5782" height={50} width={50} /></center></div>)
                :(<div></div>)
              }
              {/* {
                isLoading ? (<div><center><Loader type="Oval" color="#ee5782" height={50} width={50} /></center></div>)
                : (<div>
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
                      {/* <Spinner animation="grow" /> 
                      </div> )  
                  }
                </Row>
                <br />
                <br />
                </div>)} */}
            </div>
          </div>
        </Grid>
        {/* <Modal show={this.state.show} onHide={this.handleClose} animation={true} autoFocus={true}>
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
        </Modal> */}

      </div>
    );
  }
}

export default Health;
