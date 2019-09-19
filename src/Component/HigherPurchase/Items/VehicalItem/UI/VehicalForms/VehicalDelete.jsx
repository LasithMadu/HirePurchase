import React, {Component} from 'react';
import $ from 'jquery'
import axios from 'axios'
import {ToastsContainer, ToastsStore, ToastsContainerPosition} from 'react-toasts';

function loadData(data){
    setValue('#Duser', data.nameInitials)
    setValue('#Demail', data.email)
    setValue('#Daddress', data.address)
    setValue('#Dgender', data.gender)
    setValue('#Dmobile', data.mobile)
    setInput('#inputDRegistration', data.vehiNo)
    setInput('#inputDCassis', data.chassis)
    setInput('#inputDEngine', data.engineNo)
    setInput('#inputDCapacity', data.capacity)
    setInput('#inputDMake', data.make)
    setInput('#inputDModal', data.modal)
    setInput('#inputDFuel', data.fuel)
    setInput('#inputDYear', data.year)
}

function setValue(id, value){
    $(id).html(value);
}

function setInput(id, value){
    $(id).val(value);
}

export default class VehicalAdd extends Component{

    searchVehical(){
        var vehi = $('#inputDVehiNo').val().toUpperCase();

        if(vehi.length > 9){
            var path = sessionStorage.getItem('url')+'/Vehicals/searchVehical';

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

    deleteVehical(){
        var valid;

        var vehicals = [$('#inputDRegistration').val(), $('#inputDCassis').val(), $('#inputDEngine').val(), $('#inputDCapacity').val(), $('#inputDMake').val(), $('#inputDModal').val(), $('#inputDFuel').val(), $('#inputDYear').val()];

        for(var i=0; i<vehicals.length; i++){
            if(vehicals[i] === ''){
                valid = false
            }else{
                valid = true
            }
        }

        if(!valid){
            ToastsStore.warning("Vehical Details Are Not Found")
        }else{
            var path = sessionStorage.getItem('url')+'/Vehicals/deleteVehicals';

            axios.post(path, {
                vehiNo: $('#inputDVehiNo').val().toUpperCase()
              })
              .then(function (response) {
                if(response.data.msg){
                    ToastsStore.success("Sucessfuly Vehical Deleted")
                }else{
                    ToastsStore.error("Vehical Deleted Fail")
                }
              })
              .catch(function (error) {
                console.log(error)
              });
        }
    }

    showModel(){
        if($('#inputDTitle').val() != 'Choose Title' || $('#inputDInitials').val() != '' || $('#inputDFullname').val() != ''){
            $('.modal').show();
        }
    }

    handleClose(){
        $('.modal').hide();
    }

    render(){
        return(
            <div>
                <div className="modal" role="dialog" style={{borderRadius: '50px', marginTop: '75px'}}>
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title">Delete This Customer</h5>
                          <button type="button" className="close" data-dimdiss="modal" aria-label="Close" onClick={this.handleClose}>
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          Are you sure?
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-primary" onClick={this.deleteVehical}>Yes</button>
                          <button type="button" className="btn btn-secondary" data-dimdiss="modal" onClick={this.handleClose}>No</button>
                        </div>
                      </div>
                    </div>
                  </div>
                <div className='col-md-12 col-sm-7'>
                <form action="#" className="form-horizontal">
                        <div className="form-body pal">
                            <div className="form-group">
                                <div className='row'>
                                    <label htmlFor="inputDVehiNo" className="col-xs-3 control-label">
                                    Search :- </label>
                                    <div className="input-icon col-xs-5" style={{display: 'inline-block' }}>
                                        <i className="fa fa-car"></i>
                                        <input id="inputDVehiNo" type="text" placeholder="Vehical No" className="form-control" />
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
                                    <td id='Duser'></td>
                                </tr>
                                <tr>
                                    <td>Dmail</td>
                                    <td id='Demail'></td>
                                </tr>
                                <tr>
                                    <td>Address</td>
                                    <td id='Daddress'></td>
                                </tr>
                                <tr>
                                    <td>Gender</td>
                                    <td id='Dgender'></td>
                                </tr>
                                <tr>
                                    <td>Mobile No</td>
                                    <td id='Dmobile'></td>
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
                            <label for="inputDRegistration">Registration No</label>
                            <input type="text" class="form-control" id="inputDRegistration" disabled placeholder="Registration No"/>
                            </div>
                            <div class="form-group col-sm-5">
                            <label for="inputDCassis">Chassis No</label>
                            <input type="text" class="form-control" id="inputDCassis" disabled placeholder="Chassis No"/>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-sm-6">
                            <label for="inputDDngine">Dngine No</label>
                            <input type="text" class="form-control" id="inputDEngine" disabled placeholder="Dngine No"/>
                            </div>
                            <div class="form-group col-sm-5">
                            <label for="inputDCapacity">Cylinder Capacity</label>
                            <input type="text" class="form-control" id="inputDCapacity" disabled placeholder="Cylinder Capacity"/>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-sm-6">
                            <label for="inputDMake">Make</label>
                            <input type="text" class="form-control" id="inputDMake" disabled placeholder='Make'/>
                            </div>
                            <div class="form-group col-sm-5">
                            <label for="inputDModal">Modal</label>
                            <input type="text" class="form-control" id="inputDModal" disabled placeholder='Modal'/>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-sm-6">
                                <label for="inputDFuel">Fuel Type</label>
                                <input type="text" class="form-control" id="inputDFuel" disabled placeholder="Fuel Type"/>
                            </div>
                            <div class="form-group col-sm-5">
                                <label for="inputDYear">Year Of Manifacturing</label>
                                <input type="text" class="form-control" id="inputDYear" disabled placeholder="Year Of Manifacturing"/>
                            </div>
                        </div>
                        <div class="form-group col-sm-6 row">
                            <div class='col-xs-6 col-md-3'>
                                <button type="button" class="btn btn-danger" onClick={this.showModel.bind(this)}>Delete</button>
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
