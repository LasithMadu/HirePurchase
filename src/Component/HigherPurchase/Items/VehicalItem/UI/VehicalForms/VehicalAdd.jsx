import React, {Component} from 'react';
import $ from 'jquery'
import uuidv4 from 'uuid/v4'
import axios from 'axios'
import {ToastsContainer, ToastsStore, ToastsContainerPosition} from 'react-toasts';

import Input from '../../../../../Main/UI/SingleComponent/InputField'
import Separation from '../../../../../Main/UI/SingleComponent/Separation'
import DataRow from '../../../../../Main/UI/SingleComponent/DataCell'
import Search from '../../../../../Main/UI/SingleComponent/Search'

import nameIcon from '../../../../../../Assests/images/gjoiconset/name.png'
import emailIcon from '../../../../../../Assests/images/gjoiconset/email.png'
import addressIcon from '../../../../../../Assests/images/gjoiconset/address.png'
import nicIcon from '../../../../../../Assests/images/gjoiconset/NIC.png'
import statusIcon from '../../../../../../Assests/images/gjoiconset/status.png'
import mobile from '../../../../../../Assests/images/gjoiconset/mobile.png'

export default class VehicalAdd extends Component{

    state = {
        save: false,
        values: []
    }

    searchCustomer(e){
        e.preventDefault();
        var self = this;
        var nic = $('#inputSeNic').val().toUpperCase();

        if(nic.length > 9){
            var path = sessionStorage.getItem('url')+'/Customer/searchCutomer';

            axios.post(path, {
                data: nic
              })
              .then(function (response) {
                if(response.data.msg){
                    self.setState({ values: response.data.table.rows[0]})
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
        this.setState({ save: true });
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
            var path = sessionStorage.getItem('url')+'/Vehicals/saveVehicals';

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

    getValue(){

    }

    render(){
        var data = this.state.values;
        console.log(data);
        

        const vehiForm = (
            <form>
                <div class="form-row">
                    <Input
                        size={[6, 6, 6, 12]}
                        id="inputRegistration"
                        label="Registration No"
                        placeholder="Registration No"
                        msg="Please input register no"
                        handleChange={this.getValue.bind(this)}
                        reqiured={true}
                        type="text"
                        save={this.state.save}
                    />
                    <Input
                        size={[6, 6, 6, 12]}
                        id="inputCassis"
                        label="Chassis No"
                        placeholder="Chassis No"
                        msg="Please input chassis no"
                        handleChange={this.getValue.bind(this)}
                        reqiured={true}
                        type="text"
                        save={this.state.save}
                    />
                </div>
                <div class="form-row">
                    <Input
                        size={[6, 6, 6, 12]}
                        id="inputEngine"
                        label="Engine No"
                        placeholder="Engine No"
                        msg="Please input engine no"
                        handleChange={this.getValue.bind(this)}
                        reqiured={true}
                        type="text"
                        save={this.state.save}
                    />
                    <Input
                        size={[6, 6, 6, 12]}
                        id="inputCapacity"
                        label="Cylinder Capacity"
                        placeholder="Cylinder Capacity"
                        msg="Please input cylinder capacity"
                        handleChange={this.getValue.bind(this)}
                        reqiured={true}
                        type="text"
                        save={this.state.save}
                    />
                </div>
                <div class="form-row">
                    <Input
                        size={[6, 6, 6, 12]}
                        id="inputMake"
                        label="Make"
                        placeholder="Make"
                        msg="Please input make"
                        handleChange={this.getValue.bind(this)}
                        reqiured={true}
                        type="text"
                        save={this.state.save}
                    />
                    <Input
                        size={[6, 6, 6, 12]}
                        id="inputModal"
                        label="Model"
                        placeholder="Model"
                        msg="Please input model"
                        handleChange={this.getValue.bind(this)}
                        reqiured={true}
                        type="text"
                        save={this.state.save}
                    />
                </div>
                <div class="form-row">
                    <Input
                        size={[6, 6, 6, 12]}
                        id="inputFuel"
                        label="Fuel Type"
                        placeholder="Fuel Type"
                        msg="Please input fuel type"
                        handleChange={this.getValue.bind(this)}
                        reqiured={true}
                        type="text"
                        save={this.state.save}
                    />
                    <Input
                        size={[6, 6, 6, 12]}
                        id="inputYear"
                        label="Year Of Manifacturing"
                        placeholder="Year Of Manifacturing"
                        msg="Please input year of manifacturing"
                        handleChange={this.getValue.bind(this)}
                        reqiured={true}
                        type="text"
                        save={this.state.save}
                    />
                </div>
                <div class="form-group col-sm-6 row">
                    <div class='col-xs-6 col-md-3'>
                        <button type="button" class="btn btn-primary" onClick={this.saveVehicals.bind(this)}>Save</button>
                    </div>
                    <div class='col-xs-6 col-md-3'>
                        <button type="button" class="btn btn-light">Cancel</button>
                    </div>
                </div>

            </form>
        )

        const profileTable = (
            <div>
                <Search
                    id="inputSeNic"
                    label=""
                    icon="fa fa-user"
                    placeholder="NIC/Passport No"
                    msg="Please Input nic or passport no"
                    handleChange={this.searchCustomer.bind(this)}
                />
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
        
        return(
            <div>
                <div className='col-md-12 col-sm-7'>
                        <Separation
                            size={[3, 3, 3, 12]}
                            title="Customer"
                            component={profileTable}
                        />
                    <div className='col-md-9 col-sm-9 col-lg-9 col-xs-12'>
                        <Separation
                            size={[12, 12,12, 12]}
                            title="Vehicle"
                            component={vehiForm}
                        />
                    </div>
                </div>
            </div>
        )
    }
}
