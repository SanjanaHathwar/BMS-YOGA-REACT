import React, { Component } from 'react'
import { Grid, Row, Col} from "react-bootstrap";
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import axios from 'axios'
import {Link} from 'react-router-dom'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator'

export default class UserProfile extends Component {
 
  state = {
    patient:[],
    
  }
  
  componentDidMount() {
    axios.get('https://bms-icl-yoga.herokuapp.com/user')
    .then(res => { 
        this.setState({
        patient: res.data.user
        })
        
    })
  }
 linkFormater = (cell,row,rowIndex,formatExtraData) => {
    return(
      <center><Link to={'/' + row.user_details._id}><b><i style={{paddingTop:"15px",width:"20px",outline:"12px",fontSize:"15px"}} className="pe-7s-look text-primary"></i></b></Link></center>
    )

  }   
  render() {
    const { SearchBar } = Search;
    const columns =[
      {
        dataField:'user_details._id',
        text:'ID',
        isKey:true,
        hidden:true
      },
      {
        dataField:'user_details.username',
        text:'USERNAME'
      },
      {
        dataField:'user_details.f_name',
        text:'FIRST NAME'
      },
      {
        dataField:'user_details.m_name',
        text:'MIDDLE NAME' 
      },
      {
        dataField:'user_details.l_name',
        text:'LAST NAME'
      },
      {
        dataField:'user_details.email',
        text:'EMAIL ID'
      },
      {
        dataField:'user_details.phone',
        text:'PHONE NUMBER'
      },
      {
        dataField:'view',
        text:'VIEW',
        formatter: this.linkFormater
      }
    ]
    const options = {
      sizePerPage: 10,
      hideSizePerPage:true,
      hidePageListOnlyOnePage:true
    }
    const {patient} = this.state
    // const thArray = ["ID"," USERNAME","FIRST NAME","LAST NAME", "EMAIL" , "PHONE"]
    return (
      <div className="content">
        <Grid fluid>
          <Row>{console.log(patient)}
            <Col md={12}>
              <div className="card">
                <ToolkitProvider
                  
                  keyField="user_details._id"
                  data={ patient }
                  columns={ columns }
                  search
                >
                  {
                    props => (
                      <div>
                        <SearchBar
                          { ...props.searchProps }
                          className="custome-search-field"
                          style={ { color: 'black',width:"200px",padding:"20px"  ,float:"right",margin:"15px"} }
                          delay={ 1000 }
                          placeholder="Search"
                        />
                        <BootstrapTable
                          pagination={paginationFactory(options)}
                          {...props.baseProps}
                        />
                  
                      </div>
                    )
                  }
                </ToolkitProvider>
              </div>
              {/*// NORMAL TABLE
               <Card
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table striped hover>
                    <thead className="text-warninf">
                      <tr >
                        {thArray.map((prop, key) => {
                          return <th className="text-danger" style={{fontFamily:"Arial",fontSize:"15px"}}  key={key}>{prop}</th>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {
                         patient.map((ssup,i) => {
                           const {user_details} = ssup
                           
                        return (

                          <tr style={{fontFamily:"Arial"}} key={user_details._id}>
                            <td>{i+1}</td>
                            <td>{user_details.username}</td>
                            <td>{user_details.f_name}</td>
                            <td>{user_details.l_name}</td>
                            <td>{user_details.email}</td>
                            <td>{user_details.phone}</td>
                            
                            <td> <Link to={'/' + user_details._id}><b><i style={{paddingTop:"15px",width:"20px",outline:"12px"}} className="pe-7s-look text-primary"></i></b></Link></td> 
                          </tr>
                        );
                      })} 
                    </tbody>
                  </Table>
                }
              /> */}
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}
