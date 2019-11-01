import React, { Component } from "react";
import Axios from 'axios'
// import moment from "moment";


export class Today extends Component {
  state={
    book:[]
  }
  componentDidMount(){
    Axios.get('https://bms-icl-yoga.herokuapp.com/package/today')
    .then(res=>{
      this.setState({book:res.data.ALL_BOOKING_DETAILS_OF_USER})
    })
  }
  render() {
   var count2 = 0
   var count1 = 0
    const {book} = this.state
    var tasks = book.length ? (
      book.map(feed =>{
        const{slot,_id} = feed
          if(slot === 1){
            count1 =count1+1
           
          }
          else if(slot === 2){
            count2 =count2+1
            console.log(count2)
          }

        
        return(

          <tr key={_id}></tr>
        )
      })
    ):(<tr><td></td></tr>)
    
    return (
    <tbody>{tasks}<tr>
      {
        count1 >0 ? (<td style={{fontFamily:"Arial",fontSize:"15px"}}>SLOT 1 <br/>Center : jayanagar <br/> No of registrations : {count1}</td>  )
          :
          (<td>No registrations for SLOT 1</td>)
      }
      </tr><tr>
      {
        count2 >0 ? (<td style={{fontFamily:"Arial",fontSize:"15px"}}>SLOT 2 <br/>Center : jayanagar <br/> No of registrations : {count2}</td>  )
          :
          (<td>No registrations for SLOT 2</td>)
      }
      </tr>
    </tbody>
    )
  }
}

export default Today;
