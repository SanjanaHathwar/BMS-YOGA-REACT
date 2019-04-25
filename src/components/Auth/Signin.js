import React, { Component } from 'react'
import background from '../../assets/img/background.jpg'
import { Row, Col, Grid } from 'react-bootstrap';

import '../../assets/css/New.css'
import Card from '../Card/Card';


export default class Signin extends Component {
  render() {
    return (
       <div className="content">
        <Grid fluid>
          <Row>
            <Col md={6} >
            <div id="back">
                <img src={background} alt="Background" />
            </div>

            
            </Col>
            <Col md={4}>
            <Card
                title = "Today"
                content={
                  <div>
                    
                  </div>
                }
              />
            </Col>
            </Row>
            </Grid>
        
      </div>
    )
  }
}
