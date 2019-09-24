import React, {Component} from 'react';
import axios from 'axios'
import $ from 'jquery'
import {ToastsStore} from 'react-toasts';

import Search from '../../../../Main/UI/SingleComponent/Search'
import Input from '../../../../Main/UI/SingleComponent/InputField'

let cusid;

export default class CreateForm extends Component{

    constructor(props){
        super(props)
        this.state = {
            save: false,
            values: []
        }
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

    searchCustomer(e){
        e.preventDefault();
        var self = this;
        var path = sessionStorage.getItem('url')+'/Customer/searchCutomer';

        axios.post(path, {
            data: $('#inputDNIC').val().toUpperCase()
          })
          .then(function (response) {
            if(response.data.msg){
                self.setState({ values: response.data.table.rows[0] });
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
        this.setState({ save: true });
        var path = sessionStorage.getItem('url')+'/Customer/deleteCutomer';

        if (this.state.values.nic === ''){
            axios.post(path, {
                data: cusid
            })
            .then(function (response) {
                if (response.data.msg) {
                    ToastsStore.success("Customer Deleted Sucessfull")
                } else {
                    ToastsStore.error("Customer Deleted Fail")
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
        
        return(
            <div className='container'>
                <Search
                    id="inputDNIC"
                    icon="fa fa-user"
                    placeholder="Search by NIC/Passport No"
                    btnId="searchBtn"
                    msg="Please input nic or passport no"
                    handleChange={this.searchCustomer.bind(this)}
                    width="92.5%"
                />
                <form className='col-sm-12 col-xs-12'>
                    <Input
                        size={[11, 11, 11, 12]}
                        id="inputETitle"
                        label="Title"
                        placeholder={data.title}
                        msg="Please input title"
                        handleChange={this.getValue.bind(this)}
                        reqiured={true}
                        disable={true}
                        type="text"
                        save={this.state.save}
                    />
                    <Input
                        size={[11, 11, 11, 12]}
                        id="inputEInitials"
                        label="Name With Initials"
                        placeholder={data.nameInitials}
                        msg="Please input name with initials"
                        handleChange={this.getValue.bind(this)}
                        reqiured={true}
                        disable={true}
                        type="text"
                        save={this.state.save}
                    />
                    <Input
                        size={[11, 11, 11, 12]}
                        id="inputEFullname"
                        label="Full Name"
                        placeholder={data.fullName}
                        msg="Please input full name"
                        handleChange={this.getValue.bind(this)}
                        reqiured={true}
                        disable={true}
                        type="text"
                        save={this.state.save}
                    />
                    <div class="form-row">
                        <Input
                            size={[5, 5, 5, 12]}
                            id="inputEGender"
                            label="Gender"
                            placeholder={data.gender}
                            msg="Please input gender"
                            handleChange={this.getValue.bind(this)}
                            reqiured={true}
                            disable={true}
                            type="text"
                            save={this.state.save}
                        />
                        <Input
                            size={[6, 6, 6, 12]}
                            id="inputEOccupation"
                            label="Occupation"
                            placeholder={data.occupation}
                            disable={true}
                            msg="Please input occupation"
                            handleChange={this.getValue.bind(this)}
                            reqiured={true}
                            type="text"
                            save={this.state.save}
                        />
                    </div>
                    <Input
                        size={[11, 11, 11, 12]}
                        id="inputEAddress"
                        label="Address"
                        placeholder={data.address}
                        disable={true}
                        msg="Please input address"
                        handleChange={this.getValue.bind(this)}
                        reqiured={true}
                        type="text"
                        save={this.state.save}
                    />
                    <Input
                        size={[11, 11, 11, 12]}
                        id="inputEAddress2"
                        label="Address 2"
                        placeholder={data.address_2}
                        disable={true}
                        msg="Please input address 2"
                        handleChange={this.getValue.bind(this)}
                        type="text"
                        save={this.state.save}
                    />
                    <div class="form-row">
                        <Input
                            size={[4, 4, 4, 12]}
                            id="inputECity"
                            label="City"
                            placeholder={data.city}
                            disable={true}
                            msg="Please input city"
                            handleChange={this.getValue.bind(this)}
                            reqiured={true}
                            type="text"
                            save={this.state.save}
                        />
                        <Input
                            size={[4, 4, 4, 12]}
                            id="inputEState"
                            label="State"
                            placeholder={data.state}
                            disable={true}
                            msg="Please input state"
                            handleChange={this.getValue.bind(this)}
                            reqiured={true}
                            type="text"
                            save={this.state.save}
                        />
                        <Input
                            size={[4, 4, 4, 12]}
                            id="inputECountry"
                            label="Country"
                            placeholder={data.country}
                            disable={true}
                            msg="Please input country"
                            handleChange={this.getValue.bind(this)}
                            reqiured={true}
                            type="text"
                            save={this.state.save}
                        />
                    </div>
                    <div class="form-row">
                        <Input
                            size={[6, 6, 6, 12]}
                            id="inputEEmail"
                            label="Email"
                            placeholder={data.email}
                            disable={true}
                            msg="Please input email"
                            handleChange={this.getValue.bind(this)}
                            reqiured={true}
                            type="text"
                            save={this.state.save}
                        />
                        <Input
                            size={[5, 5, 5, 12]}
                            id="inputEMobile"
                            label="Mobile No"
                            placeholder={data.mobile}
                            disable={true}
                            msg="Please input mobile no"
                            handleChange={this.getValue.bind(this)}
                            reqiured={true}
                            type="text"
                            save={this.state.save}
                        />
                    </div>
                    <div class="form-group col-sm-6 col-md-4 row">
                        <div class='col-sm-3 col-xs-6'>
                            <button type="button" onClick={this.deleteCustomer.bind(this)} class="btn btn-danger">Delete</button>
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
