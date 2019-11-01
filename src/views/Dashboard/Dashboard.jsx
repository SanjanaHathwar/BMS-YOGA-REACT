import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import Axios from "axios";
import { Card } from "../../components/Card/Card.jsx";
// import { StatsCard } from "../../components/StatsCard/StatsCard.jsx";
import { Tasks } from "../../components/Tasks/Tasks.jsx";
import Link from "react-router-dom/Link";
import Today from "./Today";


class Dashboard extends Component {
  state={
    patient:'',
    feedback:'',
    notification:'',

  }
  
  componentDidMount() {
    //TO GET ALL THE COUNTS FOR STAT CARD 
    Axios.get('https://bms-icl-yoga.herokuapp.com/user')
    .then(res=>{
      this.setState({patient:res.data.count})
    })
    Axios.get('https://bms-icl-yoga.herokuapp.com/notification/get')
    .then(res=>{
      this.setState({notification:res.data.count})
    })
    var email= localStorage.getItem('email')
    Axios.get('https://bms-icl-yoga.herokuapp.com/feedback/email/'+email)
    .then(res=>{
      this.setState({feedback:res.data.count})
    })
    Axios.get('https://bms-icl-yoga.herokuapp.com/tip/all')
    .then(res=>{
      this.setState({tip:res.data.count})
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
          {/* //STAT CARDS
          <Row>
            <Col lg={3} sm={6}>
              <StatsCard color ="#5499c7 "
                bigIcon={<i className="pe-7s-users" />}
                statsText="PATIENT"
                statsValue={this.state.patient}
               
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                color=" #2471a3 "
                bigIcon={<i className="pe-7s-bell " />}
                statsText="NOTIFICATION"
                statsValue={this.state.notification}
              
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
              color="#ffb74d"
                bigIcon={<i className="pe-7s-like " />}
                statsText="FEEDBACK"
                statsValue={this.state.feedback}
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
              color="#ec7063"
                bigIcon={<i className="pe-7s-news-paper" />}
                statsText="HEALTH TIP"
                statsValue={this.state.tip}
              />
            </Col>

          </Row> */}
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
