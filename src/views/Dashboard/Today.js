import React, { Component } from "react";
import Axios from 'axios'
import moment from "moment";
import { SSL_OP_NO_TLSv1_1 } from "constants";

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
   var count2 = 0
   var count1 = 0
    const {book} = this.state
    var tasks = book.length ? (
      book.map(feed =>{
        const{id,email,date,slot,center} = feed
        const x= moment(date).format("DD/MM/YYYY")
        const y=moment().format('DD/MM/YYYY')
        if(x===y){
          if(slot === '1'){
            count1 =count1+1
           
          }
          else {
            count2 =count2+1
            console.log(count2)
          }
        }
        
        return(

            <div>  
            </div>
        )
      })
    ):(<tr><td>No Bookings Yet</td></tr>)
    
    return (
    <tbody>{tasks}
      <tr><td style={{fontFamily:"Arial",fontSize:"18px"}}>SLOT 1 <br/>Center : jayanagar <br/> No of registrations : {count1}</td>  </tr><tr>
      <td  style={{fontFamily:"Arial",fontSize:"18px"}}>SLOT  2<br/>Center : jayanagar <br/> No of registrations : {count2}</td></tr>
    

    </tbody>
    )
  }
}

export default Today;
