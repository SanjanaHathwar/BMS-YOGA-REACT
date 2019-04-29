import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";

import Axios from "axios";
import { Card } from "components/Card/Card.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import { Tasks } from "components/Tasks/Tasks.jsx";
import Link from "react-router-dom/Link";
import Today from "./Today";
class Dashboard extends Component {
  state={
    patient:'',
    feedback:'',
    notification:'',

  }
  componentDidMount() {
    Axios.get('https://bms-icl-yoga.herokuapp.com/user')
    .then(res=>{
      this.setState({patient:res.data.count})
    })
    Axios.get('https://bms-icl-yoga.herokuapp.com/notification/get')
    .then(res=>{
      this.setState({notification:res.data})
    })
    Axios.get('https://bms-icl-yoga.herokuapp.com/feedback/all')
    .then(res=>{
      this.setState({feedback:res.data.count})
    })
  }
  
  createLegend(json) {
    var legend = [];
    for (var i = 0; i < json["names"].length; i++) {
      var type = "fa fa-circle text-" + json["types"][i];
      legend.push(<i className={type} key={i} />);
      legend.push(" ");
      legend.push(json["names"][i]);
    }
    return legend;
  }
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-users text-warning" />}
                statsText="PATIENT"
                statsValue={this.state.patient}
               
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                
                bigIcon={<i className="pe-7s-bell text-success" />}
                statsText="NOTIFICATION"
                statsValue=""
              
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="fa pe-7s-like text-danger" />}
                statsText="FEEDBACK"
                statsValue={this.state.feedback}
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                style={{backgroundColor:"#212121"}}
                bigIcon={<i className="fa fa-twitter text-info" />}
                statsText="HEALTH TIP"
                statsValue=""
               
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Card
                title = "Today"
                content={
                  <div>
                  <table className="table">
                    <Today/>
                    </table>
                  </div>
                }
              />
                 
                
              
            </Col>

            <Col md={6}>
            <Link to="/feedback">
              <Card 
                title="Feedback"
                stats="click to view more"
                statsIcon=" pe-7s-angle-down"
                content={
                  <div className="table-full-width">
                    <table className="table">
                     <Tasks/>
                    </table>
                  </div>
                }
              /></Link>
            </Col>
          </Row>
        
          
        </Grid>
      </div>
    );
  }
}

export default Dashboard;
