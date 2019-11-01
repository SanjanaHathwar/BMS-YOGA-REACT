import React, { Component } from "react";
import { Grid} from "react-bootstrap";
import Axios from "axios";
import Loader from 'react-loader-spinner'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator'

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
 
    
//GET ALL FEEDBACKS
  getAll = () =>{
    this.setState({isLoading:false})
    var email= localStorage.getItem('email')
    Axios.get('https://bms-icl-yoga.herokuapp.com/feedback/trainer/email/'+email)
    .then(res=>{
    
      this.setState({feedback:res.data.feedback})
    })
  }

  linkFormater = (cell,row,rowIndex,formatExtraData) => {
    return(
      <div style={{fontFamily:"Arial"}}><b>From:</b> {row.email}<br/>
      <b>Challenges faced:</b> {row.feedbackMsg1}<br/>
      <b>Which type of Asanas, you feel relaxed in your pain?:</b> {row.feedbackMsg2}<br/>
      <b>Which type of Asanas are hurting in your pain areas?:</b> {row.feedbackMsg3}<br/>
      <b>What are the physical changes observed by the students?:</b> {row.feedbackMsg4}<br/>
      <b>What are the mental changes observed?:</b> {row.feedbackMsg5}
      </div>
    )

  }  
  render() {
    const { isLoading} =this.state
    const columns = [{
      dataField:'message',
      text:'',
      formatter: this.linkFormater
    }]
    const options = {
      sizePerPage: 4,
      hideSizePerPage:true,
      hidePageListOnlyOnePage:true
    }

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
              : 
              (
                <div><br/>
                <BootstrapTable
                  pagination={paginationFactory(options)}
                  keyField="_id"
                  data={ this.state.feedback }
                  columns= { columns }
                />
              </div>
              ) 
            }
              {/*<div>
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
      </div>
    );
  }
}

export default Notifications;
