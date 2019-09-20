import React, {Component} from 'react';
import $ from 'jquery'
import axios from 'axios'
import {ToastsContainer, ToastsStore, ToastsContainerPosition} from 'react-toasts';

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

    state = {
        values: [],
        save: false
    }

    searchVehical(e){
        e.preventDefault();
        var self = this;
        var vehi = $('#inputVehiNo').val().toUpperCase();

        if(vehi.length > 9){

            axios.post(sessionStorage.getItem('url') + '/Vehicals/searchVehical', {
                data: vehi
              })
              .then(function (response) {
                if(response.data.msg){
                    self.setState({values: response.data.table.rows[0]})
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
        this.setState({ save: true });
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
            var path = sessionStorage.getItem('url')+'/Vehicals/updateVehicals';

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

        const vehicleEdit = (
            <form>
                <div class="form-row">
                    <Input
                        size={[6, 6, 6, 12]}
                        id="inputERegistration"
                        label="Registration No"
                        placeholder="Registration No"
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
                        placeholder="Chassis No"
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
                        placeholder="Engine No"
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
                        placeholder="Cylinder Capacity"
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
                        placeholder="Make"
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
                        placeholder="Model"
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
                        placeholder="Fuel Type"
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
                        placeholder="Year Of Manifacturing"
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
                        <button type="button" class="btn btn-primary" onClick={this.updateVehicals.bind(this)}>Update</button>
                    </div>
                    <div class='col-xs-6 col-md-3'>
                        <button type="button" class="btn btn-light">Cancel</button>
                    </div>
                </div>

            </form>
        );

        return(
            <div>
                <div className='col-md-12 col-sm-7'>
                    <Search
                        id="inputVehiNo"
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
                            component={vehicleEdit}
                        />
                    </div>
                </div>
            </div>
        )
    }
}
