import React, {Component} from 'react';
import $ from 'jquery'
import uuidv4 from 'uuid/v4'
import axios from 'axios'
import {ToastsContainer, ToastsStore, ToastsContainerPosition} from 'react-toasts';

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

    searchCustomer(){
        var nic = $('#inputSeNic').val();

        if(nic.length > 9){
            var path = 'http://localhost:8080/Customer/searchCutomer';

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
        var customer = [$('#inputSeNic').val(), $('#user').text(), $('#email').text(), $('#address').text(), $('#gender').text(), $('#mobile').text()];

        for(var i=0; i<customer.length; i++){
            if(customer[i] === ''){
                cus = false;
                ToastsStore.error("Customer Details Not Filed")
            }
        }

        var vehicals = [uuidv4(), $('#inputRegistration').val(), $('#inputCassis').val(), $('#inputEngine').val(), $('#inputCapacity').val(), $('#inputMake').val(), $('#inputModal').val(), $('#inputFuel').val(), $('#inputYear').val()];

        for(var i=0; i<vehicals.length; i++){
            if(vehicals[i] === ''){
                valid = false
            }else{
                valid = true
            }
        }

        if(!cus){
            ToastsStore.error("Customer Details Not Filed")
        }else if(!valid){
            ToastsStore.warning("Some Fields Are Empty")
        }else{
            var path = 'http://localhost:8080/Vehicals/saveVehicals';

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
                <div className='col-md-12'>
                    <div className="col-md-3">
                        <div class="form-group col-md-12">
                            <label for="inputSeNic">Search</label>
                            <input type="text" class="form-control" id="inputSeNic" onChange={this.searchCustomer} placeholder="NIC/Passport No"/>
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
                                    <td>Address</td>
                                    <td id='address'></td>
                                </tr>
                                <tr>
                                    <td>Gender</td>
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
                    <form className='col-md-9'>
                    
                        <div class="form-row">
                            <div class="form-group col-md-6">
                            <label for="inputRegistration">Registration No</label>
                            <input type="text" class="form-control" id="inputRegistration" placeholder="Registration No"/>
                            </div>
                            <div class="form-group col-md-5">
                            <label for="inputCassis">Chassis No</label>
                            <input type="text" class="form-control" id="inputCassis" placeholder="Chassis No"/>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                            <label for="inputEngine">Engine No</label>
                            <input type="text" class="form-control" id="inputEngine" placeholder="Engine No"/>
                            </div>
                            <div class="form-group col-md-5">
                            <label for="inputCapacity">Cylinder Capacity</label>
                            <input type="text" class="form-control" id="inputCapacity" placeholder="Cylinder Capacity"/>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                            <label for="inputMake">Make</label>
                            <input type="text" class="form-control" id="inputMake" placeholder='Make'/>
                            </div>
                            <div class="form-group col-md-5">
                            <label for="inputModal">Modal</label>
                            <input type="text" class="form-control" id="inputModal" placeholder='Modal'/>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="inputFuel">Fuel Type</label>
                                <input type="text" class="form-control" id="inputFuel" placeholder="Fuel Type"/>
                            </div>
                            <div class="form-group col-md-5">
                                <label for="inputYear">Year Of Manifacturing</label>
                                <input type="text" class="form-control" id="inputYear" placeholder="Year Of Manifacturing"/>
                            </div>
                        </div>
                        <div class="form-group col-md-6 row">
                            <div class='col-md-2'>
                                <button type="button" class="btn btn-primary" onClick={this.saveVehicals}>Save</button>
                            </div>
                            <div class='col-md-2'>
                                <button type="button" class="btn btn-light">Cancel</button>
                            </div>
                        </div>
                        
                    </form>
                </div>
            </div>
        )
    }
}