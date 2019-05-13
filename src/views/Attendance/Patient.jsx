import React, { Component } from 'react'
import { Grid, Row, Col ,Table} from "react-bootstrap";
import {Modal} from 'react-bootstrap'
import Select from 'react-select'
import Button from "components/CustomButton/CustomButton.jsx";
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import moment from 'moment'
import Axios from 'axios';
import "@material/react-checkbox/dist/checkbox.css";
import Checkbox from 'react-simple-checkbox';



const options = [
  { value: 'jayanagar', label: 'Jayanagar' }
];
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
      center:'',
      selected:null,
      slot:'',
      selectedDay: undefined,
      details:[],attended:[],
      checked: false, indeterminate: false,select:[],
      all:[]
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
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    this.setState({center:selectedOption.value})
    
  }
  //SET STATE FOR SLOT
  Change = (selected) => {
    this.setState({ selected });
    this.setState({slot:selected.value})
    
  }
  //FILTER
  post = (date,center,slot) =>{
    console.log(date)
    
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
      this.check(date,center,slot)
      this.handleClose()
    })
  }
  //CHECK IF THEY HAVE ATTENDED
  check =(date,center,slot) =>{
   
    
    var y = moment(date).format('DD-MM-YYYY');
    console.log(y)
    Axios.post('https://bms-icl-yoga.herokuapp.com/counter/attendants',{
      date:y,
      center:center,
      slot:slot
    })
    .then(res =>{
      
      console.log("check",res)
      this.setState({all:res.data.CURRENT_DAY_BOOKINGS})
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
    
  }
//MARK ATTENDANCE
handleClick = (id,email,slot,center,date) =>{
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
  Axios.post('https://bms-icl-yoga.herokuapp.com/counter/attendancecount/email/'+email ,{
    date:date,
    slot:slot,
    center:center

  })
  .then(res =>{
    console.log(res)
    const del = this.state.details.filter(dels => {
      return dels.id != id
    })
    this.setState({details:del})
  })
}


isSelected = id => this.state.select.indexOf(id) !== -1;

 
 
  render() {
    const {selectedOption,selected,selectedDay,details,select,all} = this.state
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
                         details.map((ssup,i) => {
                           const {id,email,slot,center,date} = ssup
                            moment.locale()
                            x = moment(date).format('DD/MM/YYYY')
                            const isSelected = this.isSelected(email);
                          if(all.includes({email:email,slot:slot,center:center,date:date})){console.log("yes")}
                   
                        return ( 

                          <tr 
                            
                            role="checkbox"
                            aria-checked={isSelected}
                            tabIndex={-1}
                            
                            style={{fontFamily:"Arial"}} key={email}>
                            <td>{i+1}</td>
                            <td>{email}</td>
                            <td>{slot}</td>
                            <Checkbox onChange={event => this.handleClick(id,email,slot,center,x)} size="2" style={{padding:"15px"}} />
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
                  <label className="col-form-label">Center:</label>
                  <Select
                    value={selectedOption}
                    onChange={this.handleChange}
                    options={options}
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
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="info" onClick={this.handleClose}>
              Cancel
            </Button>

            <Button bsStyle="info" onClick={ () => this.post(selectedDay,this.state.center,this.state.slot)} >
              Get List
            </Button >
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}
