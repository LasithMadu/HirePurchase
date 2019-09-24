import React, {Component} from 'react';
import $ from 'jquery'
import axios from 'axios'
import cogoToast from 'cogo-toast';

import Search from '../../../../../Main/UI/SingleComponent/Search'
import DataRow from '../../../../../Main/UI/SingleComponent/DataCell'
import Input from '../../../../../Main/UI/SingleComponent/InputField'
import Separation from '../../../../../Main/UI/SingleComponent/Separation'

import nameIcon from '../../../../../../Assests/images/gjoiconset/name.png'
import emailIcon from '../../../../../../Assests/images/gjoiconset/email.png'
import addressIcon from '../../../../../../Assests/images/gjoiconset/address.png'
import nicIcon from '../../../../../../Assests/images/gjoiconset/NIC.png'
import statusIcon from '../../../../../../Assests/images/gjoiconset/status.png'
import mobile from '../../../../../../Assests/images/gjoiconset/mobile.png'

const options = {
    position: 'top-center'
}

export default class VehicalAdd extends Component{

    state = {
        values: []
    }

    searchVehical(e){
        e.preventDefault();
        var self = this;
        var vehi = $('#inputDVehiNo').val().toUpperCase();

        if(vehi.length > 9){
            var path = sessionStorage.getItem('url')+'/Vehicals/searchVehical';

            axios.post(path, {
                data: vehi
              })
              .then(function (response) {
                if(response.data.msg){
                    self.setState({ values: response.data.table.rows[0] })
                }else{
                  if(response.data.alert === 'fail'){
                      cogoToast.warn("This vehicle is not registered yet", options)
                  }else{
                      cogoToast.error("Fail to load vehicle data.", options)
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
            cogoToast.warning("Vehical Details Are Not Found")
        }else{
            var path = sessionStorage.getItem('url')+'/Vehicals/deleteVehicals';

            axios.post(path, {
                vehiNo: $('#inputDVehiNo').val().toUpperCase()
              })
              .then(function (response) {
                if(response.data.msg){
                    cogoToast.success("Sucessfuly vehical deleted", options)
                }else{
                    cogoToast.error("Vehical deleted fail", options)
                }
              })
              .catch(function (error) {
                console.log(error)
              });
        }
    }

    showModel(){
        if($('#inputDTitle').val() !== 'Choose Title' || $('#inputDInitials').val() !== '' || $('#inputDFullname').val() !== ''){
            $('.modal').show();
        }
    }

    handleClose(){
        $('.modal').hide();
    }

    getValue() {

    }

    render(){
        var data = this.state.values;

        const profileTable = (
            <div>
                <table className="proTable">
                    <tbody>
                        <DataRow
                            icon={nameIcon}
                            label="Name"
                            value={data.length === 0 ? "Not Specified" : data.nameInitials}
                        />
                        <DataRow
                            icon={emailIcon}
                            label="Email"
                            value={data.length === 0 ? "Not Specified" : data.email}
                        />
                        <DataRow
                            icon={addressIcon}
                            label="Address"
                            value={data.length === 0 ? "Not Specified" : data.address}
                        />
                        <DataRow
                            icon={nicIcon}
                            label="NIC/Passport No"
                            value={data.length === 0 ? "Not Specified" : data.nic}
                        />
                        <DataRow
                            icon={statusIcon}
                            label="Gender"
                            value={data.length === 0 ? "Not Specified" : data.gender}
                        />
                        <DataRow
                            icon={mobile}
                            label="Mobile"
                            value={data.length === 0 ? "Not Specified" : data.mobile}
                        />
                    </tbody>
                </table>
            </div>
        );

        const vehicleDelete = (
            <form>
                <div class="form-row">
                    <Input
                        size={[6, 6, 6, 12]}
                        id="inputERegistration"
                        label="Registration No"
                        placeholder={data.vehiNo}
                        disable={true}
                        msg="Please input register no"
                        handleChange={this.getValue.bind(this)}
                        reqiured={true}
                        type="text"
                        save={this.state.save}
                        value={data.vehiNo}
                    />
                    <Input
                        size={[6, 6, 6, 12]}
                        id="inputECassis"
                        label="Chassis No"
                        placeholder={data.chassis}
                        disable={true}
                        msg="Please input chassis no"
                        handleChange={this.getValue.bind(this)}
                        reqiured={true}
                        type="text"
                        save={this.state.save}
                        value={data.chassis}
                    />
                </div>
                <div class="form-row">
                    <Input
                        size={[6, 6, 6, 12]}
                        id="inputEEngine"
                        label="Engine No"
                        placeholder={data.engineNo}
                        disable={true}
                        msg="Please input engine no"
                        handleChange={this.getValue.bind(this)}
                        reqiured={true}
                        type="text"
                        save={this.state.save}
                        value={data.engineNo}
                    />
                    <Input
                        size={[6, 6, 6, 12]}
                        id="inputECapacity"
                        label="Cylinder Capacity"
                        placeholder={data.capacity}
                        disable={true}
                        msg="Please input cylinder capacity"
                        handleChange={this.getValue.bind(this)}
                        reqiured={true}
                        type="text"
                        save={this.state.save}
                        value={data.capacity}
                    />
                </div>
                <div class="form-row">
                    <Input
                        size={[6, 6, 6, 12]}
                        id="inputEMake"
                        label="Make"
                        placeholder={data.make}
                        disable={true}
                        msg="Please input make"
                        handleChange={this.getValue.bind(this)}
                        reqiured={true}
                        type="text"
                        save={this.state.save}
                        value={data.make}
                    />
                    <Input
                        size={[6, 6, 6, 12]}
                        id="inputEModal"
                        label="Model"
                        placeholder={data.modal}
                        disable={true}
                        msg="Please input model"
                        handleChange={this.getValue.bind(this)}
                        reqiured={true}
                        type="text"
                        save={this.state.save}
                        value={data.modal}
                    />
                </div>
                <div class="form-row">
                    <Input
                        size={[6, 6, 6, 12]}
                        id="inputEFuel"
                        label="Fuel Type"
                        placeholder={data.fuel}
                        disable={true}
                        msg="Please input fuel type"
                        handleChange={this.getValue.bind(this)}
                        reqiured={true}
                        type="text"
                        save={this.state.save}
                        value={data.fuel}
                    />
                    <Input
                        size={[6, 6, 6, 12]}
                        id="inputEYear"
                        label="Year Of Manifacturing"
                        placeholder={data.year}
                        disable={true}
                        msg="Please input year of manifacturing"
                        handleChange={this.getValue.bind(this)}
                        reqiured={true}
                        type="text"
                        save={this.state.save}
                        value={data.year}
                    />
                </div>
                <div class="form-group col-sm-6 row">
                    <div class='col-xs-6 col-md-3'>
                        <button type="button" class="btn btn-danger" onClick={this.deleteVehical}>Delete</button>
                    </div>
                    <div class='col-xs-6 col-md-3'>
                        <button type="button" class="btn btn-light">Cancel</button>
                    </div>
                </div>

            </form>
        );

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
                    <Search
                        id="inputDVehiNo"
                        icon="fa fa-car"
                        placeholder="Vehical No"
                        btnId="searchBtn"
                        msg="Please input vehicle no"
                        handleChange={this.searchVehical.bind(this)}
                        width="92.5%"
                    />
                    <Separation
                        size={[3, 3, 3, 12]}
                        title="Customer"
                        component={profileTable}
                    />
                    <div className='col-md-9 col-sm-9 col-lg-9 col-xs-12'>
                        <Separation
                            size={[12, 12, 12, 12]}
                            title="Vehicle"
                            component={vehicleDelete}
                        />
                    </div>
                </div>
            </div>
        )
    }
}
