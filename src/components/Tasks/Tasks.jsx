import React, { Component } from "react";
import Axios from 'axios'

export class Tasks extends Component {
  state={
    feedback:[],
    loading: true
  }
  componentDidMount(){
    Axios.get('https://bms-icl-yoga.herokuapp.com/feedback/all')
    .then(res=>{
      this.setState({feedback:res.data.user.slice(0,6)})
    })
  }
  render() {
   
    const {feedback} = this.state
    var tasks = feedback.length ? (
      feedback.map(feed =>{
        const{feedback} =feed
        return(
          <tr key={feedback._id}>
          
            
          <td>{feedback.feedbackMsg}</td>
          
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
