import React, { Component } from 'react'
import '../../assets/css/New.css'
import {withRouter} from 'react-router-dom'
import Axios from 'axios';
import { Button } from 'react-bootstrap';
import Loader from 'react-loader-spinner'

class Signin extends Component {
  constructor (props) {
    super(props);
    this.state = {
      email:'',
      pass :'',
      isLoading:false,
      show:false,
      isForgot:false
    }
  }

  // LOGIN BY PASSING THE ENTERED EMAIL ID AND PASSWORD
  handleClick =(email,pass) =>{
    this.setState({isForgot:false})
    console.log(email)
    Axios.post('https://bms-icl-yoga.herokuapp.com/trainer/login',{
      "email": email,
      "password":pass
    })
    .then(res=>{
      console.log(res)
      this.setState({isLoading:true})
      
      if(res.data.message === "Auth successful"){
       
        const token = res.data.success_token
        //STORING EMAIL ID AND TOKEN IN LOCAL STORAGE
        localStorage.setItem('token',token)
        localStorage.setItem('email',email)

        setTimeout(this.Home, 5000);
      }
    })
    .catch(error =>{
      this.setState({show:true})
      console.log(error)

    })
  }
  //FUNCTION FOR FORGOT PASSWORD
  forgot = () => {
    Axios.post('https://bms-icl-yoga.herokuapp.com/trainer/forgot',{
      email: this.state.email

    })
    .then(res=> {
      alert(res.data.message)
      
    })
    .catch(error =>{
      this.setState({isForgot:true})
      console.log(error)

    })
  }

  //AFTER VALID LOGIN CREDENTIALS DIRECT TO HOME PAGE
   Home=() =>{
    
    this.props.history.push("/home"); 
    window.location.reload(); 
  }

  // SET STATE FOR EMAIL ID AND PASSWORD 
  handleChange =(event)=>{
    this.setState({[event.target.name]: event.target.value});
  }

  //RENDER 
  render() {
    const {email,pass} = this.state
    return(
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100">
            <form className="login100-form validate-form">
              <span style={{fontFamily:"Arial"}}  className="login100-form-title p-b-43">
                Trainer Login
              </span>{console.log(this.state.isLoading)}
              <br/>{this.state.isForgot ? (<div style={{color:"red",fontFamily:"Arial"}}>Please enter your email id</div>):(<div></div>)}{this.state.show ? (<div style={{color:"red",fontFamily:"Arial"}}>Invalid email id or password</div>):(<div></div>)}<br/>
              <div  className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
                <input style={{fontFamily:"Arial"}} onChange={this.handleChange} className="input100" type="text" name="email" placeholder="Email"/>
                <span className="focus-input100"></span>
                
              </div>
            
              <div className="wrap-input100 validate-input" data-validate="Password is required">
                <input style={{fontFamily:"Arial"}}  onChange={this.handleChange} className="input100" type="password" name="pass" placeholder="Password"/>
                <span className="focus-input100 "></span>

              </div><br/>
              <div className="container-login100-form-btn">
                <Button style={{color:"white",backgroundColor:"#3d61b9",width:"100%",height:"45px"}} onClick={()=>this.handleClick(email,pass)}>
                  Login
                </Button>
              </div><br/>
              <div><a><p style={{color:"blue",fontFamily:"Arial"}} onClick={this.forgot}>Forgot Password?</p></a></div>
              <div>
                {
                  this.state.isLoading ? (
                    <center>
                      <div > 
                        <Loader type="Bars" color=" #3d61b9 " height={50} width={50} />
                      
                      </div>
                    </center>
                  
                  ) 
                  : 
                  (
                    <div></div>
                  )
                }
              </div>
            </form>
            <div className="login100-more image">
            </div>
          </div>
        </div>
	    </div>
    )
  }
}
export default withRouter(Signin);