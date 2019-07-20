import React, {Component} from 'react';
import $ from 'jquery'

import Table from './CustomerTable'

export default class CustomerDetails extends Component {

    handleClose() {
      $('.modal').hide('slow');
    }

    handleShow() {
      $('.modal').show('slow');
    }

    redirect() {
      window.location.href = "/create";
    }

    render () {
      return (
            <div className="page-content">
              <form action="#" className="form-horizontal">
                  <div className="form-body pal">
                      <div className="form-group">
                        <div className='row'>
                          <label htmlFor="inputName" className="col-md-3 control-label">
                              Search :- </label>
                              <div className="input-icon col-md-6" style={{display: 'inline-block' }}>
                                <i className="fa fa-user"></i>
                                <input id="inputName" type="text" placeholder="Search by NIC/Passport No" className="form-control" />
                              </div>
                              <div className='col-md-2' style={{ height: '30px', paddingTop: '-50px'}}>
                                <a href="#" className="btn btn-primary ml-5" id="searchBtn" onClick={this.handleShow}>Search</a>
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
                    <div className="col-md-12"><h2>Profile: John Doe</h2>
                        <div className="row mtl">
                            <div className="col-md-3">
                                <table className="table table-striped table-hover">
                                    <tbody>
                                    <tr>
                                        <td>User Name</td>
                                        <td>John Doe</td>
                                    </tr>
                                    <tr>
                                        <td>Email</td>
                                        <td>name@example.com</td>
                                    </tr>
                                    <tr>
                                        <td>Address</td>
                                        <td>Street 123, Avenue 45, Country</td>
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
                                        <td> Jun 03, 2014</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-md-9">
                                  <Table/>
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
  

