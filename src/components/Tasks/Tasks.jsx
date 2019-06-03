import React, { Component } from "react";
import Axios from 'axios'

export class Tasks extends Component {
  state={
    feedback:[],
    loading: true
  }
  componentDidMount(){
    var email= localStorage.getItem('email')
    Axios.get('https://bms-icl-yoga.herokuapp.com/feedback/email/'+email)
    .then(res=>{
      this.setState({feedback:res.data.feedback.slice(0,5)})
    })
  }
  render() {
   
    const {feedback} = this.state
    var tasks = feedback.length ? (
      feedback.map(feed =>{
        const{feedbackMsg,_id} =feed
        return(
          <tr key={_id}>
          <td>{feedbackMsg}</td>
          
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
