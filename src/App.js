import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Signin from './components/Auth/Signin';
import indexRoutes from "routes/index.jsx";


export default class App extends Component {
  render() {
        return (
            <BrowserRouter>
        
            <div>
            
            <Switch>
                    {    
                        localStorage.getItem('token') ? (
                           
                        indexRoutes.map((prop, key) => {
                        return <Route to={prop.path} component={prop.component} key={key} />})
                        ):
                        (
                            <Route key={"login"} to="/" component={Signin}/>
                            
                        )
                    }   
                   
            </Switch>  
            
            </div>
            </BrowserRouter>
        )
    }
}
