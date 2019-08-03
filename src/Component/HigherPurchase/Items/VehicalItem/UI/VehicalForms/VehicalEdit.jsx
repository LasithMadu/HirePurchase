import React, {Component} from 'react';
import $ from 'jquery'
import axios from 'axios'
import {ToastsContainer, ToastsStore, ToastsContainerPosition} from 'react-toasts';

function loadData(data){
    setValue('#Euser', data.nameInitials)
    setValue('#Eemail', data.email)
    setValue('#Eaddress', data.address)
    setValue('#Egender', data.gender)
    setValue('#Emobile', data.mobile)
    setInput('#inputERegistration', data.vehiNo)
    setInput('#inputECassis', data.chassis)
    setInput('#inputEEngine', data.engineNo)
    setInput('#inputECapacity', data.capacity)
    setInput('#inputEMake', data.make)
    setInput('#inputEModal', data.modal)
    setInput('#inputEFuel', data.fuel)
    setInput('#inputEYear', data.year)
}

function setValue(id, value){
    $(id).html(value);
}

function setInput(id, value){
    $(id).val(value);
}

export default class VehicalAdd extends Component{

    searchVehical(){
        var vehi = $('#inputVehiNo').val().toUpperCase();
        
        if(vehi.length > 9){
            var path = 'https://money360-server.herokuapp.com/Vehicals/searchVehical';

            axios.post(path, {
                data: vehi
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

    updateVehicals(){
        var valid;

        var vehicals = [$('#inputERegistration').val(), $('#inputECassis').val(), $('#inputEEngine').val(), $('#inputECapacity').val(), $('#inputEMake').val(), $('#inputEModal').val(), $('#inputEFuel').val(), $('#inputEYear').val()];

        for(var i=0; i<vehicals.length; i++){
            if(vehicals[i] === ''){
                valid = false
            }else{
                valid = true
            }
        }

        if(!valid){
            ToastsStore.warning("Some Fields Are Empty")
        }else{
            var path = 'https://money360-server.herokuapp.com/Vehicals/updateVehicals';

            axios.post(path, {
                vehiNo: $('#inputVehiNo').val().toUpperCase(),
                Data: vehicals
              })
              .then(function (response) {
                if(response.data.msg){
                    ToastsStore.success("Sucessfuly Vehical Updated")
                }else{
                    ToastsStore.error("Vehical Updated Fail")
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
                <h3>Edit Vehical</h3>
                <hr/>
                <div className='col-md-12 col-sm-7'>
                <form action="#" className="form-horizontal">
                        <div className="form-body pal">
                            <div className="form-group">
                                <div className='row'>
                                    <label htmlFor="inputVehiNo" className="col-xs-3 control-label">
                                    Search :- </label>
                                    <div className="input-icon col-xs-5" style={{display: 'inline-block' }}>
                                        <i className="fa fa-car"></i>
                                        <input id="inputVehiNo" type="text" placeholder="Vehical No" className="form-control" />
                                    </div>
                                    <div className='col-xs-2' style={{ height: '30px', paddingTop: '-50px'}}>
                                        <a href="#" className="btn btn-primary ml-5" id="searchBtn" onClick={this.searchVehical}>Search</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className="col-sm-12 col-md-3">
                        <table className="table table-striped table-hover">
                            <tbody>
                                <tr>
                                    <td>Name</td>
                                    <td id='Euser'></td>
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    <td id='Eemail'></td>
                                </tr>
                                <tr>
                                    <td>Address</td>
                                    <td id='Eaddress'></td>
                                </tr>
                                <tr>
                                    <td>Gender</td>
                                    <td id='Egender'></td>
                                </tr>
                                <tr>
                                    <td>Mobile No</td>
                                    <td id='Emobile'></td>
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
                            <label for="inputERegistration">Registration No</label>
                            <input type="text" class="form-control" id="inputERegistration" placeholder="Registration No"/>
                            </div>
                            <div class="form-group col-sm-5">
                            <label for="inputECassis">Chassis No</label>
                            <input type="text" class="form-control" id="inputECassis" placeholder="Chassis No"/>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-sm-6">
                            <label for="inputEEngine">Engine No</label>
                            <input type="text" class="form-control" id="inputEEngine" placeholder="Engine No"/>
                            </div>
                            <div class="form-group col-sm-5">
                            <label for="inputECapacity">Cylinder Capacity</label>
                            <input type="text" class="form-control" id="inputECapacity" placeholder="Cylinder Capacity"/>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-sm-6">
                            <label for="inputEMake">Make</label>
                            <input type="text" class="form-control" id="inputEMake" placeholder='Make'/>
                            </div>
                            <div class="form-group col-sm-5">
                            <label for="inputEModal">Modal</label>
                            <input type="text" class="form-control" id="inputEModal" placeholder='Modal'/>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-sm-6">
                                <label for="inputEFuel">Fuel Type</label>
                                <input type="text" class="form-control" id="inputEFuel" placeholder="Fuel Type"/>
                            </div>
                            <div class="form-group col-sm-5">
                                <label for="inputEYear">Year Of Manifacturing</label>
                                <input type="text" class="form-control" id="inputEYear" placeholder="Year Of Manifacturing"/>
                            </div>
                        </div>
                        <div class="form-group col-sm-6 row">
                            <div class='col-xs-6 col-md-3'>
                                <button type="button" class="btn btn-primary" onClick={this.updateVehicals}>Update</button>
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