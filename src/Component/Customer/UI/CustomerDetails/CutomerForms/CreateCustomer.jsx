import React, {Component} from 'react';
import axios from 'axios'
import $ from 'jquery'
import uuidv4 from 'uuid/v4'
import cogoToast from 'cogo-toast';

import Input from '../../../../Main/UI/SingleComponent/InputField'
import Dropdown from '../../../../Main/UI/SingleComponent/Dropdown'

const options = {
    position: 'top-center'
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

    componentDidMount(){
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
            for(var i=0; i<response.data.length; i++){
                country.push(response.data[i].name);
            }
            self.setState({ country: country }) 
        })
        .catch(error => {
            cogoToast.error("Countries Loaded Fail Please Refreash Page", options)
        });
    }

    saveCustomer(){
        var valid;
        this.setState({save: true});
        var title = $('#inputTitle').val();
        var gender = $('#inputGender').val();
        var country = $('#inputCountry').val();
        var values = [uuidv4(), title, $('#inputInitials').val(), $('#inputFullname').val(), $('#inputNic').val().toUpperCase(), gender, $('#inputOccupation').val(), $('#inputAddress').val(), $('#inputCity').val(), $('#inputState').val(), country, $('#inputEmail').val(), $('#inputMobile').val()];

        for(var i=0; i<values.length; i++){
            if(values[i] === ''){
                valid = false;
                break;
            }else{
                valid = true;
            }
        }

        values = [uuidv4(), title, $('#inputInitials').val(), $('#inputFullname').val(), $('#inputNic').val().toUpperCase(), gender, $('#inputOccupation').val(), $('#inputAddress').val(), $('#inputAddress2').val(), $('#inputCity').val(), $('#inputState').val(), country, $('#inputEmail').val(), $('#inputMobile').val()];

        if(title === 'Choose Title'){
            cogoToast.warn("Title Not Select", options)
        }else if(gender === 'Choose Gender'){
            cogoToast.warn("Gender Not Select", options)
        }else if(country === 'Choose Country'){
            cogoToast.warn("Country Not Select", options)
        }else if(!valid){
            
        }else if($('#inputNic').val().length < 9){
            cogoToast.warn("Invalid NIC No", options)
        }else{
            var path = sessionStorage.getItem('url')+'/Customer/saveData';

            axios.post(path, {
                data: values
              })
              .then(function (response) {
                if(response.data.msg){
                    cogoToast.success("New Customer Is Registered", options)
                }else{
                    if(response.data.alert === 'fail'){
                        cogoToast.success("This Customer Already Registered", options)
                    }else{
                        cogoToast.error("New Customer Is Registered Fail", options)
                    }
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
        return(
            <div className='container'>
                <form className='col-md-12 col-xs-12'>
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
                        size = {[11, 11, 11, 12]}
                        id = "inputInitials"
                        label = "Name With Initials"
                        placeholder = "M.D.S Something"
                        msg = "Please input name with initials"
                        handleChange = {this.getValue.bind(this)}
                        reqiured = {true}
                        type = "text"
                        save = {this.state.save}
                    />
                    <Input
                        size = {[11, 11, 11, 12]}
                        id = "inputFullname"
                        label = "Full Name"
                        placeholder = "Michael Dennis Stocks Something"
                        msg = "Please input full name"
                        handleChange = {this.getValue.bind(this)}
                        reqiured = {true}
                        type = "text"
                        save = {this.state.save}
                    />
                    <div class="form-row">
                        <Input
                            size = {[4, 4, 4, 12]}
                            id = "inputNic"
                            label = "NIC/Passport No"
                            placeholder= "NIC/Passport No"
                            msg = "Please input nic/passport No"
                            handleChange = {this.getValue.bind(this)}
                            reqiured = {true}
                            type = "text"
                            save = {this.state.save}
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
                            size = {[3, 3, 3, 12]}
                            id= "inputOccupation"
                            label = "Occupation"
                            placeholder= "Occupation"
                            msg = "Please input occupation"
                            handleChange = {this.getValue.bind(this)}
                            reqiured = {true}
                            type = "text"
                            save = {this.state.save}
                        />
                    </div>
                    <Input
                            size = {[11, 11, 11, 12]}
                            id = "inputAddress"
                            label = "Address"
                            placeholder = "1234 Main St"
                            msg = "Please input address"
                            handleChange = {this.getValue.bind(this)}
                            reqiured = {true}
                            type = "text"
                            save = {this.state.save}
                        />
                       <Input
                            size = {[11, 11, 11, 12]}
                            id = "inputAddress2"
                            label = "Address 2"
                            placeholder = "Apartment, studio, or floor"
                            msg = "Please input address 2"
                            handleChange = {this.getValue.bind(this)}
                            type = "text"
                            save = {this.state.save}
                        />  
                    <div class="form-row">
                        <Input
                            size = {[4, 4, 4, 12]}
                            id = "inputCity"
                            label = "City"
                            placeholder= "City"
                            msg = "Please input city"
                            handleChange = {this.getValue.bind(this)}
                            reqiured = {true}
                            type = "text"
                            save = {this.state.save}
                        /> 
                        <Input
                            size = {[4, 4, 4, 12]}
                            id = "inputState"
                            label = "State"
                            placeholder= "State"
                            msg = "Please input state"
                            handleChange = {this.getValue.bind(this)}
                            reqiured = {true}
                            type = "text"
                            save = {this.state.save}
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
                            size = {[6, 6, 6, 12]}
                            id = "inputEmail"
                            label = "Email"
                            placeholder= "Email"
                            msg = "Please input email"
                            handleChange = {this.getValue.bind(this)}
                            reqiured = {true}
                            type = "text"
                            save = {this.state.save}
                        /> 
                        <Input
                            size = {[5, 5, 5, 12]}
                            id = "inputMobile"
                            label = "Mobile No"
                            placeholder= "Mobile No"
                            msg = "Please input mobile no"
                            handleChange = {this.getValue.bind(this)}
                            reqiured = {true}
                            type = "number"
                            save = {this.state.save}
                        /> 
                    </div>
                    <div class="form-group col-sm-6 col-md-4 row">
                        <div class='col-sm-3 col-xs-6'>
                            <button type="button" onClick={this.saveCustomer.bind(this)} class="btn btn-primary">Save</button>
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
