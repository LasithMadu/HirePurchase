import React, {Component} from 'react';
import axios from 'axios'
import $ from 'jquery'
import {ToastsContainer, ToastsStore, ToastsContainerPosition} from 'react-toasts';

let cusid;

function loadData(data){
    setValue('#inputDTitle', data.title)
    setValue('#inputDInitials', data.nameInitials)
    setValue('#inputDFullname', data.fullName)
    setValue('#inputDGender', data.gender)
    setValue('#inputDCountry', data.country)
    setValue('#inputDAddress', data.address)
    setValue('#inputDAddress2', data.address_2)
    setValue('#inputDCity', data.city)
    setValue('#inputDState', data.state)
    setValue('#inputDOccupation', data.occupation)
    setValue('#inputDMobile', data.mobile)
    setValue('#inputDEmail', data.email)
    cusid = data.cusId;
}

function setValue(id, value){
    $(id).val(value);
}

export default class CreateForm extends Component{

    constructor(props){
        super(props)
        this.getCountries();
    }

    getCountries(){
        var country;
        axios.get('https://restcountries.eu/rest/v2/all')
        .then(response => {
            country = '<option selected>Choose Country</option>';
            for(var i=0; i<response.data.length; i++){
                country += '<option value='+response.data[i].name+'>'+response.data[i].name+'</option>'
            }
            $("#inputDCountry").html(country);
        })
        .catch(error => {
            ToastsStore.error("Countries Loaded Fail Please Refreash Page")
        });
    }

    showModel(){
        if($('#inputDTitle').val() != 'Choose Title' || $('#inputDInitials').val() != '' || $('#inputDFullname').val() != ''){
            $('.modal').show();
        }
    }

    handleClose(){
        $('.modal').hide();
    }

    searchCustomer(){
        var path = sessionStorage.getItem('url')+'/Customer/searchCutomer';

        axios.post(path, {
            data: $('#inputDNIC').val().toUpperCase()
          })
          .then(function (response) {
            if(response.data.msg){
                loadData(response.data.table.rows[0])
            }else{
                if(response.data.alert === 'fail'){
                    ToastsStore.warning("This Customer Is Not Registered")
                }else{
                    ToastsStore.error("Customer Data Not Found")
                }
            }
          })
          .catch(function (error) {
            console.log(error)
          });
    }

    deleteCustomer(){
        var path = sessionStorage.getItem('url')+'/Customer/deleteCutomer';

        axios.post(path, {
            data: cusid
          })
          .then(function (response) {
            if(response.data.msg){
                ToastsStore.success("Customer Deleted Sucessfull")
            }else{
                ToastsStore.error("Customer Deleted Fail")
            }
          })
          .catch(function (error) {
            console.log(error)
          });
    }

    render(){
        return(
            <div className='container'>
                <div className="modal" role="dialog" style={{borderRadius: '50px', marginTop: '75px'}}>
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title">Delete This Customer</h5>
                          <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.handleClose}>
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          Are you sure?
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-primary" onClick={this.deleteCustomer}>Yes</button>
                          <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.handleClose}>No</button>
                        </div>
                      </div>
                    </div>
                  </div>
                    <form action="#" className="form-horizontal">
                        <div className="form-body pal">
                            <div className="form-group">
                                <div className='row'>
                                    <label htmlFor="inputDNIC" className="col-md-3 col-sm-2 col-xs-3 control-label">
                                    Search :- </label>
                                    <div className="input-icon col-md-6 col-sm-4 col-xs-6" style={{display: 'inline-block' }}>
                                        <i className="fa fa-user"></i>
                                        <input id="inputDNIC" type="text" placeholder="Search by NIC/Passport No" className="form-control" />
                                    </div>
                                    <div className='col-md-2 col-sm-1 col-xs-2' style={{ height: '30px', paddingTop: '-50px'}}>
                                        <a href="#" className="btn btn-primary ml-5" id="searchBtn" onClick={this.searchCustomer.bind(this)}>Search</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                <form className='col-sm-12 col-xs-12'>
                    <div class="form-group col-md-11 col-sm-7 col-xs-12">
                        <label for="inputDTitle">Title</label>
                        <select id="inputDTitle" disabled class="form-control">
                            <option selected>Choose Title</option>
                            <option value="Mr. ">Mr. </option>
                            <option value="Miss. ">Miss. </option>
                            <option value="Mrs. ">Mrs. </option>
                            <option value="Ms. ">Ms. </option>
                            <option value="Dr. ">Dr. </option>
                            <option value="Sir. ">Sir. </option>
                            <option value="Ma'am. ">Ma'am. </option>
                        </select>
                    </div>
                    <div class="form-group col-md-11 col-sm-7 col-xs-12">
                        <label for="inputDInitials">Name With Initials</label>
                        <input type="text" class="form-control" disabled id="inputDInitials" placeholder="M.D.S Something"/>
                    </div>
                    <div class="form-group col-md-11 col-sm-7 col-xs-12">
                        <label for="inputDFullname">Full Name</label>
                        <input type="text" class="form-control" disabled id="inputDFullname" placeholder="Michael Dennis Stocks Something"/>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-5 col-sm-7 col-xs-12">
                        <label for="inputDGender">Gender</label>
                        <select id="inputDGender" disabled class="form-control">
                            <option selected>Choose Gender</option>
                            <option>Male</option>
                            <option>Female</option>
                        </select>
                        </div>
                        <div class="form-group col-md-6 col-sm-7 col-xs-12">
                        <label for="inputDOccupation">Occupation</label>
                        <input type="text" class="form-control" disabled id="inputDOccupation"/>
                        </div>
                    </div>
                    <div class="form-group col-md-11 col-sm-7 col-xs-12">
                        <label for="inputDAddress">Address</label>
                        <input type="text" class="form-control" disabled id="inputDAddress" placeholder="1234 Main St"/>
                    </div>
                    <div class="form-group col-md-11 col-sm-7 col-xs-12">
                        <label for="inputDAddress2">Address 2</label>
                        <input type="text" class="form-control" disabled id="inputDAddress2" placeholder="Apartment, studio, or floor"/>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-4 col-sm-7 col-xs-12">
                        <label for="inputDCity">City</label>
                        <input type="text" class="form-control" disabled id="inputDCity"/>
                        </div>
                        <div class="form-group col-md-4 col-sm-7 col-xs-12">
                        <label for="inputDState">State</label>
                        <input type="text" class="form-control" disabled id="inputDState"/>
                        </div>
                        <div class="form-group col-md-3 col-sm-7 col-xs-12">
                        <label for="inputDCountry">Country</label>
                        <select id="inputDCountry" disabled class="form-control">
                            <option selected>Choose Country</option>
                        </select>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6 col-sm-7 col-xs-12">
                        <label for="inputDEmail">Email</label>
                        <input type="text" disabled class="form-control" id="inputDEmail"/>
                        </div>
                        <div class="form-group col-md-5 col-sm-7 col-xs-12">
                        <label for="inputDMobile">Mobile No</label>
                        <input type="text" disabled class="form-control" id="inputDMobile"/>
                        </div>
                    </div>
                    <div class="form-group col-sm-6 col-md-4 row">
                        <div class='col-sm-3 col-xs-6'>
                            <button type="button" onClick={this.showModel.bind(this)} class="btn btn-danger">Delete</button>
                        </div>
                        <div class='col-sm-3 col-xs-6'>
                            <button type="button" class="btn btn-light">Cancel</button>
                        </div>
                    </div>

                </form>
            </div>
        )
    }
}
