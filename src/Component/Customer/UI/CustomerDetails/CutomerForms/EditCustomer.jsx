import React, {Component} from 'react';
import axios from 'axios'
import $ from 'jquery'
import {ToastsContainer, ToastsStore, ToastsContainerPosition} from 'react-toasts';

let cusid;

function loadData(data){
    setValue('#inputETitle', data.title)
    setValue('#inputEInitials', data.nameInitials)
    setValue('#inputEFullname', data.fullName)
    setValue('#inputEGender', data.gender)
    setValue('#inputECountry', data.country)
    setValue('#inputEAddress', data.address)
    setValue('#inputEAddress2', data.address_2)
    setValue('#inputECity', data.city)
    setValue('#inputEState', data.state)
    setValue('#inputEOccupation', data.occupation)
    setValue('#inputEMobile', data.mobile)
    setValue('#inputEEmail', data.email)
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
            $("#inputECountry").html(country);
        })
        .catch(error => {
            ToastsStore.error("Countries Loaded Fail Please Refreash Page")
        });
    }

    updateCustomer(){
        var valid;
        var title = $('#inputETitle').val();
        var gender = $('#inputEGender').val();
        var country = $('#inputECountry').val();
        var values = [title, $('#inputEInitials').val(), $('#inputEFullname').val(), gender, $('#inputEOccupation').val(), $('#inputEAddress').val(), $('#inputEAddress2').val(), $('#inputECity').val(), $('#inputEState').val(), country, $('#inputEEmail').val(), $('#inputEMobile').val()];

        for(var i=0; i<values.length; i++){
            if(values[i] === ''){
                valid = false;
                break;
            }else{
                valid = true;
            }
        }

        if(title === 'Choose Title'){
            ToastsStore.warning("Title Not Select")
        }else if(gender === 'Choose Gender'){
            ToastsStore.warning("Gender Not Select")
        }else if(country === 'Choose Country'){
            ToastsStore.warning("Country Not Select")
        }else if(!valid){
            ToastsStore.warning("Some Fields Are Empty")
        }else{
            var path = 'https://hire-purchase-server.herokuapp.com/Customer/updateCustomer';

            axios.post(path, {
                cusid: cusid,
                data: values
              })
              .then(function (response) {
                if(response.data.msg){
                    ToastsStore.success("Customer Is Updated")
                }else{
                    ToastsStore.error("Customer Update Is Fail")
                }
              })
              .catch(function (error) {
                console.log(error)
              });
        }
    }

    searchCustomer(){
        var path = 'https://hire-purchase-server.herokuapp.com/Customer/searchCutomer';

        axios.post(path, {
            data: $('#inputENIC').val().toUpperCase()
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

    render(){
        return(
            <div className='container'>
                    <form action="#" className="form-horizontal">
                        <div className="form-body pal">
                            <div className="form-group">
                                <div className='row'>
                                    <label htmlFor="inputENIC" className="col-md-3 col-sm-2 col-xs-3 control-label">
                                    Search :- </label>
                                    <div className="input-icon col-md-6 col-sm-4 col-xs-6 " style={{display: 'inline-block' }}>
                                        <i className="fa fa-user"></i>
                                        <input id="inputENIC" type="text" placeholder="Search by NIC/Passport No" className="form-control" />
                                    </div>
                                    <div className='col-md-2 col-sm-1 col-xs-2' style={{ height: '30px', paddingTop: '-50px'}}>
                                        <button className="btn btn-primary ml-5" id="searchBtn" onClick={this.searchCustomer}>Search</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                <form className='col-sm-12 col-xs-12'>
                    <div class="form-group col-md-11 col-sm-7 col-xs-12">
                        <label for="inputETitle">Title</label>
                        <select id="inputETitle" class="form-control">
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
                        <label for="inputEInitials">Name With Initials</label>
                        <input type="text" class="form-control" id="inputEInitials" placeholder="M.D.S Something"/>
                    </div>
                    <div class="form-group col-md-11 col-sm-7 col-xs-12">
                        <label for="inputEFullname">Full Name</label>
                        <input type="text" class="form-control" id="inputEFullname" placeholder="Michael Dennis Stocks Something"/>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-5 col-sm-7 col-xs-12">
                        <label for="inputEGender">Gender</label>
                        <select id="inputEGender" class="form-control">
                            <option selected>Choose Gender</option>
                            <option>Male</option>
                            <option>Female</option>
                        </select>
                        </div>
                        <div class="form-group col-md-6 col-sm-7 col-xs-12">
                        <label for="inputEOccupation">Occupation</label>
                        <input type="text" class="form-control" id="inputEOccupation"/>
                        </div>
                    </div>
                    <div class="form-group col-md-11 col-sm-7 col-xs-12">
                        <label for="inputEAddress">Address</label>
                        <input type="text" class="form-control" id="inputEAddress" placeholder="1234 Main St"/>
                    </div>
                    <div class="form-group col-md-11 col-sm-7 col-xs-12">
                        <label for="inputEAddress2">Address 2</label>
                        <input type="text" class="form-control" id="inputEAddress2" placeholder="Apartment, studio, or floor"/>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-4 col-sm-7 col-xs-12">
                        <label for="inputECity">City</label>
                        <input type="text" class="form-control" id="inputECity"/>
                        </div>
                        <div class="form-group col-md-4 col-sm-7 col-xs-12">
                        <label for="inputEState">State</label>
                        <input type="text" class="form-control" id="inputEState"/>
                        </div>
                        <div class="form-group col-md-3 col-sm-7 col-xs-12">
                        <label for="inputECountry">Country</label>
                        <select id="inputECountry" class="form-control">
                            <option selected>Choose Country</option>
                        </select>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6 col-sm-7 col-xs-12">
                        <label for="inputEEmail">Email</label>
                        <input type="text" class="form-control" id="inputEEmail"/>
                        </div>
                        <div class="form-group col-md-5 col-sm-7 col-xs-12">
                        <label for="inputEMobile">Mobile No</label>
                        <input type="text" class="form-control" id="inputEMobile"/>
                        </div>
                    </div>
                    <div class="form-group col-sm-6 col-md-4 row">
                        <div class='col-sm-3 col-xs-6'>
                            <button type="button" onClick={this.updateCustomer.bind(this)} class="btn btn-primary">Update</button>
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
