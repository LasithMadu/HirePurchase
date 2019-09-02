import React, {Component} from 'react';
import axios from 'axios'
import $ from 'jquery'
import {ToastsContainer, ToastsStore, ToastsContainerPosition} from 'react-toasts';

import Table from './CustomerTable'

  function handleShow() {
    $('.modal').show('slow');
  }

export default class CustomerDetails extends Component {

    state = {
      values: [],
      agreement: []
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

    searchCustomer(){
      var self = this;
      if($('#inputName').val() === ''){
        ToastsStore.warning("Enter Customer NIC or Passport No")
      }else if($('#inputName').val().length < 9){
        ToastsStore.warning("Invalid NIC No")
      }else{
        axios.post('http://localhost:8080/Agreement/getAgree', {
          data: $('#inputName').val().toUpperCase()
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
              <form action="#" className="form-horizontal">
                  <div className="form-body container-full">
                      <div className="form-group">
                        <div className='row'>
                          <label htmlFor="inputName" className="col-lg-1 col-md-1 col-sm-1 col-xs-3 control-label">
                              Search : </label>
                              <div className="input-icon col-lg-10 col-md-10 col-sm-10 col-xs-6" style={{display: 'inline-block' }}>
                                <i className="fa fa-user"></i>
                                <input id="inputName" type="text" placeholder="Search by NIC/Passport No" className="form-control" />
                              </div>
                              <div className='col-lg-1 col-md-1 col-sm-1 col-xs-2'>
                                <a href="#" className="btn btn-primary" id="searchBtn" onClick={this.searchCustomer.bind(this )}><i class="fa fa-search" aria-hidden="true"></i></a>
                              </div>
                            </div>
                          </div>
                      </div>
                  </form>

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

                  <div className="col-lg-12">

                    <div className="col-md-12">
                      <div id="area-chart-spline" style={{ display: 'none'}}>
                      </div>
                    </div>
                  </div>
              <div className="col-lg-12">
                <div className="row">
                    <div className="col-md-12"><h2 id='profile'>Profile: {data.length == 0 ? "" : data[0].fullName}</h2>
                        <div className="row mtl">
                            <div className="col-md-3">
                                <table className="table table-striped table-hover">
                                    <tbody>
                                    <tr>
                                        <td>User Name</td>
                                        <td id='user'>{data.length == 0 ? "" : data[0].nameInitials}</td>
                                    </tr>
                                    <tr>
                                        <td>Email</td>
                                        <td id='email'>{data.length == 0 ? "" : data[0].email}</td>
                                    </tr>
                                    <tr>
                                        <td>Address</td>
                                        <td id='address'>{data.length == 0 ? "" : data[0].address}</td>
                                    </tr>
                                    <tr>
                                        <td>Status</td>
                                        <td><span className="label label-success">Active</span></td>
                                    </tr>
                                    <tr>
                                        <td>User Rating</td>
                                        <td><i className="fa fa-star text-yellow fa-fw"></i><i className="fa fa-star text-yellow fa-fw"></i><i className="fa fa-star text-yellow fa-fw"></i><i className="fa fa-star text-yellow fa-fw"></i><i className="fa fa-star text-yellow fa-fw"></i></td>
                                    </tr>
                                    <tr>
                                        <td>Member Since</td>
                                        <td>Jun 03, 2014</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-md-9">
                                  <Table agrrement = {this.state.values}/>
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
