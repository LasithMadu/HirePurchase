import React, {Component} from 'react';
import axios from 'axios'
import $ from 'jquery'
import cogoToast from 'cogo-toast';

import Search from '../../../../Main/UI/SingleComponent/Search'
import Input from '../../../../Main/UI/SingleComponent/InputField'
import Dropdown from '../../../../Main/UI/SingleComponent/Dropdown'

let cusid;

const options = {
    position: 'top-center'
}

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
        this.state = {
            save: false,
            title: [],
            country: []
        }
        this.getCountries();
    }

    componentDidMount() {
        var items = [];
        var self = this;
        axios.get(sessionStorage.getItem('url') + "/Customer/getTitles")
        .then(function (response) {
            if (response.data.msg) {
                $(function () {
                    items.push('Choose Title');
                    for (var i = 0; i < response.data.values.length; i++) {
                        items.push(response.data.values[i]);
                    }
                    self.setState({ title: items })
                });
            }
        })
        .catch(function (error) {
            cogoToast.error("Titles not loading", options)
        });
    }

    getCountries(){
        var country = [];
        var self = this;
        axios.get('https://restcountries.eu/rest/v2/all')
        .then(response => {
            country.push('Choose Country');
            for (var i = 0; i < response.data.length; i++) {
                country.push(response.data[i].name);
            }
            self.setState({ country: country })
        })
        .catch(error => {
            cogoToast.error("Countries Loaded Fail Please Refreash Page", options)
        });
    }

    updateCustomer(){
        this.setState({ save: true });
        var valid;
        var title = $('#inputETitle').val();
        var gender = $('#inputEGender').val();
        var country = $('#inputECountry').val();
        var values = [title, $('#inputEInitials').val(), $('#inputEFullname').val(), $('#inputNic').val(), gender, $('#inputEOccupation').val(), $('#inputEAddress').val(), $('#inputEAddress2').val(), $('#inputECity').val(), $('#inputEState').val(), country, $('#inputEEmail').val(), $('#inputEMobile').val()];

        for(var i=0; i<values.length; i++){
            if(values[i] === ''){
                valid = false;
                break;
            }else{
                valid = true;
            }
        }

        if(title === 'Choose Title'){
            cogoToast.warn("Title Not Select", options)
        }else if(gender === 'Choose Gender'){
            cogoToast.warn("Gender Not Select", options)
        }else if(country === 'Choose Country'){
            cogoToast.warn("Country Not Select", options)
        }else if(!valid){
            
        }else{
            var path = sessionStorage.getItem('url')+'/Customer/updateCustomer';

            axios.post(path, {
                cusid: cusid,
                data: values
              })
              .then(function (response) {
                if(response.data.msg){
                    cogoToast.success("Customer is updated", options)
                }else{
                    cogoToast.error("Customer update fail", options)
                }
              })
              .catch(function (error) {
                console.log(error)
              });
        }
    }

    searchCustomer(e){
        e.preventDefault();
        axios.post(sessionStorage.getItem('url') + '/Customer/searchCutomer', {
            data: $('#inputENIC').val().toUpperCase()
        })
        .then(function (response) {
        if(response.data.msg){
            loadData(response.data.table.rows[0])
        }else{
            if(response.data.alert === 'fail'){
                cogoToast.warn("This customer is not registered yet", options)
            }else{
                cogoToast.error("Customer data not found", options)
            }
        }
        })
        .catch(function (error) {
        console.log(error)
        });
    }

    getValue(){

    }

    render(){
        return(
            <div className='container'>
                <Search
                    id="inputENIC"
                    icon="fa fa-user"
                    placeholder="Search by NIC/Passport No"
                    btnId="searchBtn"
                    msg="Please input nic or passport no"
                    handleChange={this.searchCustomer.bind(this)}
                    width="92.5%"
                />
                <form className='col-sm-12 col-xs-12'>
                    <Dropdown
                        size={[11, 11, 11, 12]}
                        id="inputTitle"
                        label="Title"
                        reqiured={true}
                        save={this.state.save}
                        msg="Please choose title"
                        value={this.state.title}
                    />
                    <Input
                        size={[11, 11, 11, 12]}
                        id="inputEInitials"
                        label="Name With Initials"
                        placeholder="M.D.S Something"
                        msg="Please input name with initials"
                        handleChange={this.getValue.bind(this)}
                        reqiured={true}
                        type="text"
                        save={this.state.save}
                    />
                    <Input
                        size={[11, 11, 11, 12]}
                        id="inputEFullname"
                        label="Full Name"
                        placeholder="Michael Dennis Stocks Something"
                        msg="Please input full name"
                        handleChange={this.getValue.bind(this)}
                        reqiured={true}
                        type="text"
                        save={this.state.save}
                    />
                    <div class="form-row">
                        <Input
                            size={[4, 4, 4, 12]}
                            id="inputNic"
                            label="NIC/Passport No"
                            placeholder="NIC/Passport No"
                            msg="Please input nic/passport No"
                            handleChange={this.getValue.bind(this)}
                            reqiured={true}
                            type="text"
                            save={this.state.save}
                        />
                        <Dropdown
                            size={[4, 4, 4, 12]}
                            id="inputGender"
                            label="Gender"
                            reqiured={true}
                            save={this.state.save}
                            msg="Please choose gender"
                            value={['Choose Gender', 'Male', 'Female']}
                        />
                        <Input
                            size={[3, 3, 3, 12]}
                            id="inputEOccupation"
                            label="Occupation"
                            placeholder="Job role"
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
                        placeholder="1234 Main St"
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
                        placeholder="Apartment, studio, or floor"
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
                            placeholder=""
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
                            placeholder=""
                            msg="Please input state"
                            handleChange={this.getValue.bind(this)}
                            reqiured={true}
                            type="text"
                            save={this.state.save}
                        />
                        <Dropdown
                            size={[3, 3, 3, 12]}
                            id="inputCountry"
                            label="Country"
                            reqiured={true}
                            save={this.state.save}
                            msg="Please choose country"
                            value={this.state.country}
                        />
                    </div>
                    <div class="form-row">
                        <Input
                            size={[6, 6, 6, 12]}
                            id="inputEEmail"
                            label="Email"
                            placeholder=""
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
                            placeholder=""
                            msg="Please input mobile no"
                            handleChange={this.getValue.bind(this)}
                            reqiured={true}
                            type="text"
                            save={this.state.save}
                        />
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
