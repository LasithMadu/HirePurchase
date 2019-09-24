import React, {Component} from 'react';
import $ from 'jquery'
import uuidv4 from 'uuid/v4'
import axios from 'axios'
import cogoToast from 'cogo-toast';

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

const options = {
    position: 'top-center'
}

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
                    cogoToast.success("Sucessfuly Load Customer Data", options)
                }else{
                  if(response.data.alert === 'fail'){
                      cogoToast.warning("This Customer Is Not Registered Yet", options)
                  }else{
                      cogoToast.error("Fail To Load Customer Data", options)
                  }
                }
              })
              .catch(function (error) {
                console.log(error)
              });
        }
    }

    saveVehicals(e){
        e.preventDefault();
        var valid, cus = true;
        var data = this.state.values
        this.setState({ save: true });

        if(data.length === 0){
            cus = false;
        }

        var vehicals = [uuidv4(), $('#inputProvince').val().toUpperCase()+" "+$('#inputRegistration').val().toUpperCase(), $('#inputCassis').val(), $('#inputEngine').val(), $('#inputCapacity').val(), $('#inputMake').val(), $('#inputModal').val(), $('#inputFuel').val(), $('#inputYear').val()];

        for(var i=0; i<vehicals.length; i++){
            if(vehicals[i] === ''){
                valid = false
            }else{
                valid = true
            }
        }

        if(!cus){
            cogoToast.warn("Customer Details Not Filed", options)
        }else if (valid){
            var path = sessionStorage.getItem('url')+'/Vehicals/saveVehicals';

            axios.post(path, {
                nic: $('#inputSeNic').val(),
                vehiData: vehicals
              })
              .then(function (response) {
                if(response.data.msg){
                    cogoToast.success("Sucessfuly Vehical Register", options)
                }else{
                    cogoToast.error("Vehical Registeration Fail", options)
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

        const vehiForm = (
            <form>
                <div class="form-row">
                    <Input
                        size={[6, 6, 6, 12]}
                        id="inputProvince"
                        label="Province Letters"
                        placeholder="Province Letters"
                        msg="Please input province letters"
                        handleChange={this.getValue.bind(this)}
                        reqiured={true}
                        type="text"
                        save={this.state.save}
                    />
                    <Input
                        size={[6, 6, 6, 12]}
                        id="inputRegistration"
                        label="Vehicle No"
                        placeholder="Vehicle No"
                        msg="Please input vehicle no"
                        handleChange={this.getValue.bind(this)}
                        reqiured={true}
                        type="text"
                        save={this.state.save}
                    />
                </div>
                <div class="form-row">
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
                </div>
                <div class="form-row">
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
                </div>
                <div c>
                    <Input
                        size={[4, 4, 4, 12]}
                        id="inputModal"
                        label="Model"
                        placeholder="Model"
                        msg="Please input model"
                        handleChange={this.getValue.bind(this)}
                        reqiured={true}
                        type="text"
                        save={this.state.save}
                    />
                    <Input
                        size={[4, 4, 4, 12]}
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
                        size={[4, 4, 4, 12]}
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
