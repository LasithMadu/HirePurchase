import React, {Component} from 'react';
import axios from 'axios'
import $ from 'jquery'
import cogoToast from 'cogo-toast';

import Table from './CustomerTable'
import Search from '../../../Main/UI/SingleComponent/Search'
import DataRow from '../../../Main/UI/SingleComponent/DataCell'
import Separation from '../../../Main/UI/SingleComponent/Separation'

import nameIcon from '../../../../Assests/images/gjoiconset/name.png'
import emailIcon from '../../../../Assests/images/gjoiconset/email.png'
import addressIcon from '../../../../Assests/images/gjoiconset/address.png'
import nicIcon from '../../../../Assests/images/gjoiconset/NIC.png'
import statusIcon from '../../../../Assests/images/gjoiconset/status.png'
import ratingIcon from '../../../../Assests/images/gjoiconset/user rating.png'

  function handleShow() {
    $('.modal').show('slow');
  }

  const options = {
    position: 'top-center'
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

    searchCustomer(event){
      event.preventDefault();
      var nic = $('#inputName').val();
      var self = this;
      if(nic === ''){
        //ToastsStore.warning("Enter Customer NIC or Passport No")
      }else if(nic.length < 9){
        //ToastsStore.warning("Invalid NIC No")
      }else{
        axios.post(sessionStorage.getItem('url')+'/Agreement/getAgree', {
          data: nic.toUpperCase()
        })
        .then(function (response) {
          if(response.data.msg){
              self.setState({values: response.data.table.rows})
              cogoToast.success('Sucessfuly load customer data.', options);
          }else{
            if(response.data.alert === 'fail'){
              cogoToast.warn('Customer is not register yet.', options);
              handleShow();
            }else{
              cogoToast.error('Fail to load customer data.', options);
            }
          }
        })
        .catch(function (error) {
          cogoToast.error('Connection error', options);
        });
      }
    }

    render () {
      let data = this.state.values;

      const profileTable = (
        <table className="proTable">
          <tbody>
          <DataRow 
              icon = {nameIcon}
              label = "Name"
              value = {data.length === 0 ? "Not Specified" : data[0].nameInitials}
          />
          <DataRow 
              icon = {emailIcon}
              label = "Email"
              value = {data.length === 0 ? "Not Specified" : data[0].email}
          />
          <DataRow 
              icon = {addressIcon}
              label = "Address"
              value = {data.length === 0 ? "Not Specified" : data[0].address}
          />
          <DataRow 
              icon = {nicIcon}
              label = "NIC/Passport No"
              value = {data.length === 0 ? "Not Specified" : data[0].nic}
          />
          <DataRow 
              icon = {statusIcon}
              label = "Status"
              value = {data.length === 0 ? "Not Specified" : <span className="label label-success">Active</span>}
          />
          <DataRow 
              icon = {ratingIcon}
              label = "User Rating"
              value = {data.length === 0 ? "Not Specified" : "Not Specified"}
          />
          </tbody>
        </table>
    );

      return (
            <div className="page-content">               
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
                  msg = "Please input nic or passport no"
                  handleChange = {this.searchCustomer.bind(this)}
                  width = "92.5%"
                />
              <div className="col-lg-12">
                <div className="row">
                    <div className="col-md-11">
                        <div className="row mtl">
                              <Separation
                                size = {[3, 3, 3, 12]}
                                title = "Profile"
                                component = {profileTable}
                              /> 
                            <div className="col-md-9">
                              <Separation
                                  size = {[12, 12, 12, 12]}
                                  title = "AGREEMENT"
                                  component = {<Table agrrement = {this.state.values}/>}
                              />  
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
