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
      details:[]
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
    moment.locale();
    var x = moment(date).format('DD/MM/YYYY');
    console.log(x,center,slot)
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
  render() {
    const {selectedOption,selected,selectedDay,details} = this.state
    const thArray = ["ID", "EMAIL" , ""]
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card style={{padding:"5px"}}
                ctTableFullWidth
                ctTableResponsive
                content={
                  <div>
                    <button onClick={this.handleShow} style={{float:"right",marginRight:"2px",marginTop:"1px"}}><i  style={{padding:"2px",fontSize:"20px",color:"red"}} className="pe-7s-filter"></i></button>
                    <Table>
                    <TableBody>
                        {
                            suppliers.length <= 0
                                ? "No Suppliers Found"
                            :
                            suppliers.map((supp,i) => {
                                const {SID,name,email,contact} = supp;
                              
                                const isSelected = this.isSelected(SID);
                                return (
                                    
                                    <TableRow className="row" key={SID}
                                        hover
                                        onClick={event => this.handleClick(SID)}
                                        role="checkbox"
                                        aria-checked={isSelected}
                                        tabIndex={-1}
                                        selected={isSelected}
                                    >
                                    <TableCell className="supplier" padding="checkbox">
                                        <Checkbox color="primary" checked={isSelected} />
                                    </TableCell>
                                    <TableCell className="supplier">{SID}</TableCell>
                                    <TableCell className="supplier">{name}</TableCell>
                                    <TableCell className="supplier">{email}</TableCell>
                                    <TableCell className="supplier">{contact}</TableCell>
                                    
                                    
                                    </TableRow>
                                );
                            })
                        }
                        </TableBody>
                        </Table> 
                  </div>
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
