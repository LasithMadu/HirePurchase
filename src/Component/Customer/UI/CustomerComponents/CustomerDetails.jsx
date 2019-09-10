import React, {Component} from 'react';
import axios from 'axios'
import $ from 'jquery'
import {ToastsContainer, ToastsStore, ToastsContainerPosition} from 'react-toasts';

import Table from './CustomerTable'
import Search from '../../../Main/UI/SingleComponent/Search'
import DataRow from '../../../Main/UI/SingleComponent/DataCell'

  function handleShow() {
    $('.modal').show('slow');
  }

export default class CustomerDetails extends Component {

    state = {
      values: [],
      agreement: [],
      searchValue: ''
    }

    handleClose() {
      $('.modal').hide('slow');
    }

    componentDidUpdate(){
      window.onpopstate  = (e) => {
        if(window.location.href === 'http://localhost:3000/customer'){
          window.location.href = '/customer'
        }
      }

    }

    redirect() {
      window.location.href = "/create";
    }

    searchCustomer(nic){
      var self = this;
      if(nic === ''){
        ToastsStore.warning("Enter Customer NIC or Passport No")
      }else if(nic.length < 9){
        ToastsStore.warning("Invalid NIC No")
      }else{
        axios.post('http://localhost:8080/Agreement/getAgree', {
          data: nic.toUpperCase()
        })
        .then(function (response) {
          if(response.data.msg){
              self.setState({values: response.data.table.rows})
              ToastsStore.success("Sucessfuly Load Customer Data")
          }else{
            if(response.data.alert === 'fail'){
              ToastsStore.warning("This Customer Is Not Registered Yet")
              handleShow();
            }else{
              ToastsStore.error("Fail To Load Customer Data")
            }
          }
        })
        .catch(function (error) {
          console.log(error)
        });
      }
    }

    render () {
      let data = this.state.values;

      return (
            <div className="page-content">
              <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.BOTTOM_RIGHT} />
                
                <div className="modal" role="dialog" style={{borderRadius: '50px'}}>
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">New Customer</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.handleClose}>
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <p>Are sure create new customer?</p>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={this.redirect}>Yes</button>
                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.handleClose}>No</button>
                      </div>
                    </div>
                  </div>
                </div>


                <div className="row mbl">
                <Search
                  id = "inputName"
                  icon = "fa fa-user"
                  placeholder = "Search by NIC/Passport No"
                  btnId = "searchBtn"
                  handleChange = {this.searchCustomer.bind(this)}
                />
              <div className="col-lg-12">
                <div className="row">
                    <div className="col-md-11">
                        <div className="row mtl">
                            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12 border">
                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 titlediv">
                                <span className="align-middle title">Profile</span>
                              </div>
                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 item row" >
                                <table className="proTable">
                                  <tbody>
                                  <DataRow 
                                      icon = "fa fa-user"
                                      label = "Name"
                                      value = {data.length == 0 ? "Not Specified" : data[0].nameInitials}
                                  />
                                  <DataRow 
                                      icon = "fa fa-envelope"
                                      label = "Email"
                                      value = {data.length == 0 ? "Not Specified" : data[0].email}
                                  />
                                  <DataRow 
                                      icon = "fa fa-map-marker"
                                      label = "Address"
                                      value = {data.length == 0 ? "Not Specified" : data[0].address}
                                  />
                                  <DataRow 
                                      icon = "fa address-card"
                                      label = "NIC/Passport No"
                                      value = {data.length == 0 ? "Not Specified" : data[0].nic}
                                  />
                                  <DataRow 
                                      icon = "fa fa-unlock"
                                      label = "Status"
                                      value = {data.length == 0 ? "Not Specified" : <span className="label label-success">Active</span>}
                                  />
                                  <DataRow 
                                      icon = "fa fa-star-half"
                                      label = "User Rating"
                                      value = {data.length == 0 ? "Not Specified" : "Not Specified"}
                                  />
                                  </tbody>
                                </table>
                              </div>
                              
                            </div>
                            <div className="col-md-9">
                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 border">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 titlediv">
                                  <span className="align-middle title">Agreement</span>
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 item row agreeTable" >
                                  <Table agrrement = {this.state.values}/>
                                </div>
                              </div>
                                  
                                </div>
                              </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      )
    }
  }
