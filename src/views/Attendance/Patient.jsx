import React, { Component } from 'react'
import { Grid, Row, Col ,Table} from "react-bootstrap";
import {Modal} from 'react-bootstrap'
import Select from 'react-select'
import Button from "../../components/CustomButton/CustomButton.jsx";
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import moment from 'moment'
import Axios from 'axios';
import "@material/react-checkbox/dist/checkbox.css";
import Checkbox from 'react-simple-checkbox';



// const options = [
//   { value: 'jayanagar', label: 'Jayanagar' }
// ];

const slot = [
  { value: '1', label: 'Slot 1' },
  { value: '2', label: 'Slot 2' }
] 

export default class Patient extends Component {
 
  constructor(props){
    super(props);
    this.state={
      patient :[],
      show: false,
      selectedOption:null,
      center:[],
      selected:null,
      slot:'',
      selectedDay: undefined,
      details:[],attended:[],
      checked: false, indeterminate: false,select:[],
      alldetails:[]
    }
  
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  
  }
  //MODAL CLOSE
  handleClose() {
    this.setState({ show: false });
  }
  //MODAL OPEN
  handleShow() {
    
    this.setState({ show: true });
  }
  //SET STATE FOR CENTER
  handleChange = (value) => {
    this.setState({
      multi: value,
      single : value.value
});
    
  }
  //SET STATE FOR SLOT
  Change = (selected) => {
    this.setState({ selected });
    this.setState({slot:selected.value})
    
  }
  //GET CENTER 
  getCenter = () => {
    Axios.get('https://bms-icl-yoga.herokuapp.com/centre')
    .then(res =>{
      this.setState({center:res.data.centre})
    })
  }
  //FILTER
  post = (date,center,slot) =>{
    console.log(date,center,slot)
    this.getpatient(date,center,slot)
    var x = moment(date).format('YYYY-MM-DD');
    console.log(x)
    Axios.post('https://bms-icl-yoga.herokuapp.com/package/dateslot/',{
      date:x,
      center:center,
      slot:slot
    })
    .then(res =>{
      console.log(res)
      this.setState({details:res.data.CURRENT_DAY_BOOKINGS})
      this.handleClose()
    })
  }
  

//GET ALL PRESENT PATIENT DETAILS 
  getpatient = (date,center,slot) => {
    var x = moment(date).format('YYYY-MM-DD');
    Axios.post('https://bms-icl-yoga.herokuapp.com/package/present',
    {
      date:x,
      center:center,
      slot:slot
    })
    .then(res=>{
      this.setState({alldetails:res.data.CURRENT_DAY_BOOKINGS})
    })
  }
   
  
  //SET STATE FOR DATE
  handleDayChange =(selectedDay) =>{
  
    this.setState({
      selectedDay
     
    });
  }
  //OPEN MODAL ON COMPONENT MOUNT
  componentDidMount() {
    this.handleShow()
    this.getCenter()
  }
//MARK ATTENDANCE
handleClick = (id,email,slot,center,date) =>{

  console.log(id,email,slot,center,date)
  
  const { select } = this.state;
  const selectedIndex = select.indexOf(id);
  let newSelected = [];

  if (selectedIndex === -1) {
    newSelected = newSelected.concat(select, id);
  } else if (selectedIndex === 0) {
    newSelected = newSelected.concat(select.slice(1));
  } else if (selectedIndex === select.length - 1) {
    newSelected = newSelected.concat(select.slice(0, -1));
  } else if (selectedIndex > 0) {
    newSelected = newSelected.concat(
      select.slice(0, selectedIndex),
      select.slice(selectedIndex + 1),
    );
  }

  this.setState({ select: newSelected });
  console.log('https://bms-icl-yoga.herokuapp.com/package/markattendance/id/'+id)
  Axios.put('https://bms-icl-yoga.herokuapp.com/package/markattendance/id/'+id ,{
    status:true

  })
  .then(res =>{
    console.log(res)
    const del = this.state.details.filter(dels => {
      return dels.id !== id
    })
    this.setState({details:del})
    this.getpatient(date,center,slot)
  })
  
}


isSelected = id => this.state.select.indexOf(id) !== -1;

 
 
  render() {
    const {selected,selectedDay,details,alldetails,center} = this.state
    let all=[]
    let ald=[]
    let a3=[]
    all=details
    ald=alldetails
    a3=all.concat(ald)
    const thArray = ["ID", "EMAIL" ,"SLOT NUMBER"]
    var x 
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <div className="card" style={{padding:"5px"}}>
              <button onClick={this.handleShow} style={{float:"right",marginRight:"2px",marginTop:"1px"}}><i  style={{padding:"2px",fontSize:"20px",color:"red"}} className="pe-7s-filter"></i></button>
              <Table striped hover>
                    <thead className="text-warninf">
                      <tr >
                        {thArray.map((prop, key) => {
                          return <th className="text-info" style={{fontFamily:"Arial",fontSize:"15px"}}  key={key}>{prop}</th>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {
                         a3.map((ssup,i) => {
                           const {id,email,slot,center,date,status} = ssup
                            moment.locale()
                            x = moment(date).format('YYYY-MM-DD')
                            const isSelected = this.isSelected(email);
                        return ( 
                          <tr                            
                            role="checkbox"
                            aria-checked={isSelected}
                            tabIndex={-1}
                            
                            style={{fontFamily:"Arial"}} key={email}>
                            <td>{i+1}</td>
                            <td>{email}</td>
                            <td>{slot}</td>
                            <td>{status ? (<div></div>):( <Checkbox onChange={event => this.handleClick(id,email,slot,center,x)} size="2" style={{padding:"15px"}} />)}</td>
                           
                          </tr>
                        );
                      })} 
                    </tbody>
                  </Table>   
                 
                
              </div>
            </Col>
          </Row>
        </Grid>
        <Modal style={{padding:"20px"}} show={this.state.show} onHide={this.handleClose} animation={true} autoFocus={true}>
          <Modal.Header closeButton>
            <Modal.Title>Filter</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <form>
              <div className="form-group">
                  <label className="col-form-label">Date:</label>
                  <DayPickerInput
                    className="form-control"
                    style={{fontSize:"14px",border:"1px"}}
                    value={selectedDay}
                    onDayChange={this.handleDayChange}
                    dayPickerProps={{
                      selectedDays : selectedDay, 
                     
                    }}
                  />
                 
                </div>
                <div className="form-group">
                  <label className="col-form-label">Slot:</label>
                  <Select
                   
                    value={selected}
                    onChange={this.Change}
                    options={slot}
                />
                </div>
                <div className="form-group">
                  <label className="col-form-label">Center:</label>
                  <Select
                    onChange={this.handleChange}
                    options={center.map(ssup => ({
                      value: ssup.CENTRE_DETAILS.place,
                      label: ssup.CENTRE_DETAILS.place
                    }))} 
                    value={this.state.multi}
                  />
                </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="info" onClick={this.handleClose}>
              Cancel
            </Button>

            <Button bsStyle="info" onClick={ () => this.post(selectedDay,this.state.single,this.state.slot)} >
              Get List
            </Button >
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}
