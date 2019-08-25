import React, {Component} from 'react';
import $ from 'jquery'
import uuidv4 from 'uuid/v4'
import axios from 'axios'
import date from 'date-and-time';
import {ToastsContainer, ToastsStore, ToastsContainerPosition} from 'react-toasts';

const now = new Date();

function loadData(data){
    setValue('#user', data.nameInitials)
    setValue('#email', data.email)
    setValue('#address', data.address)
    setValue('#gender', data.gender)
    setValue('#mobile', data.mobile)
}

function setValue(id, value){
    $(id).html(value);
}

export default class VehicalAdd extends Component{

    componentDidMount(){
          $('#paymentid').val(uuidv4());
          $('#inputDate').val(date.format(now, 'YYYY/MM/DD'));
    }

    searchCustomer(){
        var nic = $('#inputSeNic').val().toUpperCase();
        
        if(nic.length > 9){
            var path = 'https://money360-server.herokuapp.com/Customer/searchCutomer';

            axios.post(path, {
                data: nic
              })
              .then(function (response) {
                if(response.data.msg){
                    loadData(response.data.table.rows[0]);
                    ToastsStore.success("Sucessfuly Load Customer Data")
                }else{
                  if(response.data.alert === 'fail'){
                    ToastsStore.warning("This Customer Is Not Registered Yet")
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
    
    saveVehicals(){
        var valid, cus = true;
        var customer = [$('#inputSeNic').val().toUpperCase(), $('#user').text(), $('#email').text(), $('#address').text(), $('#gender').text(), $('#mobile').text()];

        for(var i=0; i<customer.length; i++){
            if(customer[i] === ''){
                cus = false;
                ToastsStore.error("Customer Details Not Filed")
            }
        }

        var vehicals = [uuidv4(), $('#inputRegistration').val().toUpperCase(), $('#inputCassis').val(), $('#inputEngine').val(), $('#inputCapacity').val(), $('#inputMake').val(), $('#inputModal').val(), $('#inputFuel').val(), $('#inputYear').val()];

        for(var i=0; i<vehicals.length; i++){
            if(vehicals[i] === ''){
                valid = false
            }else{
                valid = true
            }
        }

        if($('#inputRegistration').val().length < 10){
            ToastsStore.warning("Vehical Number Is Invalid. Put Like This.\n Ex :- WP VS-1439")
        }else if(!cus){
            ToastsStore.error("Customer Details Not Filed")
        }else if(!valid){
            ToastsStore.warning("Some Fields Are Empty")
        }else{
            var path = 'https://money360-server.herokuapp.com/Vehicals/saveVehicals';

            axios.post(path, {
                nic: $('#inputSeNic').val(),
                vehiData: vehicals
              })
              .then(function (response) {
                if(response.data.msg){
                    ToastsStore.success("Sucessfuly Vehical Register")
                }else{
                    ToastsStore.error("Vehical Registeration Fail")
                }
              })
              .catch(function (error) {
                console.log(error)
              });
        }
    }

    render(){
        return(
            <div className='container' style={{backgroundColor: '#ffffff'}}>
                <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.BOTTOM_RIGHT} />
                <h3>Add New Vehical</h3>
                <hr/>
                <div className='col-md-12 col-sm-7'>
                    <div className="col-sm-12 col-md-3">
                        <div class="form-group col-xs-12">
                            <label for="inputSeNic">Search</label>
                            <input type="text" class="form-control" id="inputSeNic" onChange={this.searchCustomer} placeholder="Agreement No"/>
                        </div>
                        <br/>
                        <table className="table table-striped table-hover">
                            <tbody>
                                <tr>
                                    <td>Name</td>
                                    <td id='user'></td>
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    <td id='email'></td>
                                </tr>
                                <tr>
                                    <td>Vehical No</td>
                                    <td id='address'></td>
                                </tr>
                                <tr>
                                    <td>Cassis No</td>
                                    <td id='gender'></td>
                                </tr>
                                <tr>
                                    <td>Mobile No</td>
                                    <td id='mobile'></td>
                                </tr>
                                <tr>
                                    <td>Member Since</td>
                                    <td>Jun 03, 2014</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <form className='col-sm-12 col-md-9'>
                    
                        <div class="form-row">
                            <div class="form-group col-sm-6">
                            <label for="paymentid">Payment ID</label>
                            <input type="text" disabled class="form-control" id="paymentid" placeholder="Registration No"/>
                            </div>
                            <div class="form-group col-sm-5">
                            <label for="inputDate">Date</label>
                            <input type="text" disabled class="form-control" id="inputDate" placeholder="Chassis No"/>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-sm-6">
                            <label for="inputType">Type</label>
                            <input type="text" class="form-control" id="inputType" placeholder="Type"/>
                            </div>
                            <div class="form-group col-sm-5">
                            <label for="inputCapital">Capital</label>
                            <input type="text" class="form-control" id="inputCapital" placeholder="Capital"/>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-sm-6">
                            <label for="inputIntrest">Intrest</label>
                            <input type="text" class="form-control" id="inputIntrest" placeholder='Intrest'/>
                            </div>
                            <div class="form-group col-sm-5">
                            <label for="inputOther">Other</label>
                            <input type="text" class="form-control" id="inputOther" placeholder='Other'/>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-sm-6">
                                <label for="inputPanelty">Panelty</label>
                                <input type="text" class="form-control" id="inputPanelty" placeholder="Panelty"/>
                            </div>
                            <div class="form-group col-sm-6">
                                
                            </div>
                        </div>
                        <div class="form-group col-sm-6 row">
                            <div class='col-xs-6 col-md-3'>
                                <button type="button" class="btn btn-primary" onClick={this.saveVehicals}>Save</button>
                            </div>
                            <div class='col-xs-6 col-md-3'>
                                <button type="button" class="btn btn-light">Cancel</button>
                            </div>
                        </div>
                        
                    </form>
                </div>
            </div>
        )
    }
}