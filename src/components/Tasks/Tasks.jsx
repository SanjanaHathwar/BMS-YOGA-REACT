import React, { Component } from "react";
import Axios from 'axios'

export class Tasks extends Component {
  state={
    feedback:[],
    loading: true
  }
  componentDidMount(){
    var email= localStorage.getItem('email')
    Axios.get('https://bms-icl-yoga.herokuapp.com/feedback/trainer/email/'+email)
    .then(res=>{
      this.setState({feedback:res.data.feedback.slice(0,3)})
    })
  }
  render() {
   
    const {feedback} = this.state
    var tasks = feedback.length ? (
      feedback.map(feed =>{
        const{feedbackMsg1,feedbackMsg2,feedbackMsg3,feedbackMsg4,feedbackMsg5,email,_id} =feed
        return(
          <tr key={_id}>
          <td><div style={{fontFamily:"Arial"}}><b>From:</b> {email}<br/>
      <b>Challenges faced:</b> {feedbackMsg1}<br/>
      <b>Which type of Asanas, you feel relaxed in your pain?:</b> {feedbackMsg2}<br/>
      <b>Which type of Asanas are hurting in your pain areas?:</b> {feedbackMsg3}<br/>
      <b>What are the physical changes observed by the students?:</b> {feedbackMsg4}<br/>
      <b>What are the mental changes observed?:</b> {feedbackMsg5}
      </div></td>
          
        </tr>
        )
      })
       
    ):
    ( <tr>
      <td> No feedbacks yet</td>
       
      </tr>
        
     
    )
    
    return (
    <tbody>{tasks}</tbody>
    )
  }
}

export default Tasks;
