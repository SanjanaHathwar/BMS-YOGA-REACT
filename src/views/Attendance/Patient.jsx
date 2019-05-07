import React, { Component } from 'react'
import { Grid, Row, Col, Table } from "react-bootstrap";
import Card from "components/Card/Card.jsx";
import axios from 'axios'
import {Modal} from 'react-bootstrap'
import Select from 'react-select'
import Button from "components/CustomButton/CustomButton.jsx";
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import moment from 'moment'
import Axios from 'axios';



const options = [
  { value: 'Jayanagar', label: 'Jayanagar' }
];
const slot = [
  { value: 'Slot 1', label: 'Slot 1' },
  { value: 'Slot 2', label: 'Slot 2' }
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
      details:[]
    }
  
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  
  }
  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    
    this.setState({ show: true });
  }
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    this.setState({center:selectedOption.value})
    
  }
  Change = (selected) => {
    this.setState({ selected });
    this.setState({slot:selected.value})
    
  }
  post = (date,slot,center) =>{
    console.log(date)
    moment.locale();
    var x = moment(date).format('DD/MM/YYYY');
    Axios.post('https://bms-icl-yoga.herokuapp.com/package/dateslot/',{
      date:x,
      center:center,
      slot:slot
    })
    .then(res =>{
      console.log(res)
      this.setState({details:res.data.CURRENT_DAY_BOOKINGS})
      console.log("s")
    })
  }
  handleDayChange =(selectedDay) =>{
  
    this.setState({
      selectedDay
     
    });
  }
  componentDidMount() {
    this.handleShow()
    axios.get('https://bms-icl-yoga.herokuapp.com/user')
    .then(res => { 
    
      this.setState({
      patient: res.data.user,
      })   
    })
  }
  render() {
    const {patient,selectedOption,selected,selectedDay,details} = this.state
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
                          return <th className="text-info" style={{fontFamily:"Arial",fontSize:"15px"}}  key={key}>{prop}</th>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {
                         details.map((ssup,i) => {
                           const {_id,username,f_name,l_name,email,phone} = ssup
                           
                        return (

                          <tr style={{fontFamily:"Arial"}} key={_id}>
                            <td>{i+1}</td>
                            <td>{username}</td>
                            <td>{f_name}</td>
                            <td>{l_name}</td>
                            <td>{email}</td>
                            <td>{phone}</td>
                            <td>
                              {/* <Checkbox
                                checked={this.state.checkedB}
                                onChange={this.handleChange('checkedB')}
                                value="checkedB"
                                color="primary"
                              /> */}
                            </td>
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
                      disabledDays : day => day > (new Date())
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

            <Button bsStyle="info" onClick={ () => this.post(selectedDay)} >
              Get List
            </Button >
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}
