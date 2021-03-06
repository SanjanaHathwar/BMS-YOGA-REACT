import React, { Component } from 'react'
import axios from 'axios'
import {
    Grid,
    Row,
    Col,
  Table,
  Button,
  Modal
  } from "react-bootstrap";  
import Axios from 'axios';



export default class Patientdetails extends Component {
    constructor(props){
        super(props);
        this.state={
            details :[],
            show: false,
            feeds:[]
        }
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }
    //MODAL CLOSE
    handleClose() {
        this.setState({ show: false });
    }
    //MODAL SHOW
    handleShow() {
    
    this.setState({ show: true });
    }
    //SET STATE FOR FEEDBACK
    handleChange = event => {
        this.setState({[event.target.id]: event.target.value});  
    }
    //TO RENDER ALL THE INFORMATION 
    componentDidMount() {
        console.log(this.props)
        let id = this.props.match.params.patient;
        axios.get('https://bms-icl-yoga.herokuapp.com/user/id/' + id )
        .then(res => {
            this.setState({
                details: res.data.user_details
            })
           
        })
        this.setState({ id : id })
       
    }
    //SEND FEEDBACK
    feedback = (feed,email) =>{
        const x = localStorage.getItem('email')
        Axios.post('https://bms-icl-yoga.herokuapp.com/feedbackTrainer/feedbacktouser/'+x,{
            userEmail : email,
            feedbackMsgToAsp : feed

        })
        .then(res =>{
            if(res.data.message==="Feedback given to user scuuessfully "){
                this.getfeeds()
                this.handleClose()
                return(
                alert("Feedback Sent")
                ) 
            }
        })

    }
    //GET FEED BACK BY TRAINER
    componentDidUpdate(prevProps, prevState) {
        if (this.state.details > prevState.details) {
          this.getfeeds();  
        }
    }
    getfeeds =() =>{
       
        Axios.get('https://bms-icl-yoga.herokuapp.com/feedbackTrainer/trainer/email/'+this.state.details.email)
        .then(res =>{
            this.setState({feeds:res.data.feedback})
        })
    }
    render() {
        const {details ,feeds} = this.state
        return (
            <div className="content">
            {
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <div className="card" style={{padding:"10px"}}>
                                <Button style={{float:"right"}} bsStyle="danger" onClick={this.handleShow}>Send Feedback</Button>
                                <h5 className="text-danger" style={{padding:"15px",fontFamily:"Arial"}}>{details.username}</h5>
                                
                            </div>
                            <div className="card"> 
                                <h4 className="text-danger" style={{padding:"15px",fontFamily:"Arial"}}>PERSONAL INFORMATION</h4>
                                <Table>
                                <tbody style={{fontFamily:"Arial"}}>
                                            <tr style={{}}>
                                                <td  style={{border:"white",width:"300px"}} >FIRST NAME</td>
                                                <td style={{border:"white"}}>{details.f_name}</td>
                                            </tr>
                                            <tr style={{border:"none"}}>
                                                <td style={{border:"white"}} >MIDDLE NAME</td>
                                                <td style={{border:"white"}}>{details.m_name}</td>
                                            </tr>
                                            <tr style={{border:"none"}}>
                                                <td style={{border:"white"}}>LAST NAME</td>
                                                <td style={{border:"white"}}>{details.l_name} </td>
                                            </tr>
                                            <tr style={{border:"0px"}}>
                                                <td style={{border:"white"}}>EMAIL ID</td>
                                                <td style={{border:"white"}}>{details.email} </td>
                                            </tr>
                                            <tr style={{border:"0px solid #000000"}} >
                                                <td style={{border:"white"}}>CONTACT NUMBER</td>
                                                <td style={{border:"white"}}>{details.phone} </td>
                                            </tr>
                                            <tr style={{borderTop:"0px"}}>
                                                <td style={{border:"white"}}>USERNAME</td>
                                                <td style={{border:"white"}}>{details.username} </td>
                                            </tr>
                                        </tbody>
                                        </Table>
                                    <h4 className="text-danger" style={{padding:"15px",fontFamily:"Arial"}}>MEDICAL INFORMATION</h4><br/>
                                <Table>
                                    <tbody style={{fontFamily:"Arial"}}>
                                            <tr style={{}}>
                                                <td  style={{border:"white",width:"300px"}} >HEIGHT</td>
                                                <td style={{border:"white"}}>{details.height} cm</td>
                                            </tr>
                                            <tr style={{border:"none"}}>
                                                <td style={{border:"white"}} >WEIGHT</td>
                                                <td style={{border:"white"}}>{details.weight} Kg</td>
                                            </tr>
                                            <tr style={{border:"none"}}>
                                                <td style={{border:"white"}}>ANY MEDICAL CONDITIONS</td>
                                                <td style={{border:"white"}}>{details.medical_con} </td>
                                            </tr>
                                            <tr style={{border:"0px"}}>
                                                <td style={{border:"white"}}>MEDICATIONS</td>
                                                <td style={{border:"white"}}>{details.medications} </td>
                                            </tr>
                                            <tr style={{border:"0px solid #000000"}} >
                                                <td style={{border:"white"}}>WHAT ARE THE PAIN AREAS</td>
                                                <td style={{border:"white"}}>{details.pain_areas} </td>
                                            </tr>
                                            <tr style={{borderTop:"0px"}}>
                                                <td style={{border:"white"}}>EXPERIENCE DOING YOGA</td>
                                                <td style={{border:"white"}}>{details.experience} </td>
                                            </tr>
                                        </tbody>
                                </Table>
                                <div>
                                    {
                                        feeds.length ? (
                                            <div>
                                            <h4 className="text-danger" style={{padding:"15px",fontFamily:"Arial"}}>FEEDBACKS</h4><br/>
                                            <Table >
                                                <tbody style={{border:"none",fontFamily:"Arial"}}>
                                                    { feeds.map(feed =>{
                                                            const {feedbackMsgToAsp,_id} = feed
                                                            return (
                                                               
                                                                <tr style={{border:"none"}} key={_id}>
                                                                    <td>{feedbackMsgToAsp}</td>
                                                                </tr>
                                                                
                                                            )
                                                        })}
                                                </tbody>
                                            </Table>
                                            </div>
                                        ) :(<div></div>)

                                    }
                                </div>
                                <div className="clearfix" />
                                
                            </div>
                        </Col>
                    </Row>
                </Grid>
            }
                <Modal show={this.state.show} onHide={this.handleClose} animation={true} autoFocus={true}>
                <Modal.Header closeButton>
                    <Modal.Title>Send Feeedback</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                    <div className="form-group">
                        <label  className="col-form-label">From :</label>
                        <input  className="form-control" id="recipient-name" value={localStorage.getItem('email')} readOnly/>
                        </div>
                        <div className="form-group">
                        <label  className="col-form-label">To:</label>
                        <input  className="form-control" id="recipient-name" value={details.email} readOnly/>
                        </div>
                        <div className="form-group">
                        <label className="col-form-label">Feedback:</label>
                        <textarea  onChange={this.handleChange} className="form-control" id="feedback"></textarea>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="danger" onClick={this.handleClose}>
                    Cancel
                    </Button>
                    <Button bsStyle="danger" onClick={()=>this.feedback(this.state.feedback,details.email)}>
                    Post
                    </Button>
                </Modal.Footer>
                </Modal>            
            </div>
        )
    }
}
