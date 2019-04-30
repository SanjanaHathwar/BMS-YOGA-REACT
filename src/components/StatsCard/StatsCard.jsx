import React, { Component } from "react";
import '../../assets/css/New.css'
export class StatsCard extends Component {
  render() {
    return (
      <div className="info-box hover-expand-effect" style={{backgroundColor:this.props.color}}>
          <div className="icon">
            <i className="material-icons">{this.props.bigIcon}</i>
          </div>
          <div className="content">
            <div style={{color:"white",fontFamily:"arial",fontSize:"15px"}} className="text">{this.props.statsText}</div>
            <div style={{color:"white"}} className="number count-to">{this.props.statsValue}</div>
          </div>
        </div>
    );
  }
}

export default StatsCard;
