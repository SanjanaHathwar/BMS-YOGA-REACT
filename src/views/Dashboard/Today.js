import React, { Component } from "react";
import Axios from 'axios'

export class Today extends Component {
  state={
    book:[]
  }
  componentDidMount(){
    Axios.get('https://bms-icl-yoga.herokuapp.com/package')
    .then(res=>{
      this.setState({book:res.data.COMPLETE_DETAILS})
    })
  }
  render() {
   
    const {book} = this.state
    var tasks = book.length ? (
      book.map(feed =>{
        const{id,email,date,slot,center} = feed
        return(
          <tr key={id}>
          
            
          <td>{}</td>
          
        </tr>
        )
      })
    ):(<tr>No Bookings Yet</tr>)
    
    return (
    <tbody>{tasks}</tbody>
    )
  }
}

export default Today;
