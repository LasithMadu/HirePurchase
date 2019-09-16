import React, {Component} from 'react';
import axios from 'axios'
import $ from 'jquery'
import uuidv4 from 'uuid/v4'
import {ToastsContainer, ToastsStore, ToastsContainerPosition} from 'react-toasts';

import Input from '../../../../Main/UI/SingleComponent/InputField'

export default class CreateForm extends Component{

    constructor(props){
        super(props)
        this.state = {
            save: false
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
            $("#inputCountry").html(country);
        })
        .catch(error => {
            ToastsStore.error("Countries Loaded Fail Please Refreash Page")
        });
    }

    saveCustomer(){
        var valid;
        this.setState({save: true});
        var title = $('#inputTitle').val();
        var gender = $('#inputGender').val();
        var country = $('#inputCountry').val();
        var values = [uuidv4(), title, $('#inputInitials').val(), $('#inputFullname').val(), $('#inputNic').val().toUpperCase(), gender, $('#inputOccupation').val(), $('#inputAddress').val(), $('#inputAddress2').val(), $('#inputCity').val(), $('#inputState').val(), country, $('#inputEmail').val(), $('#inputMobile').val()];

        for(var i=0; i<values.length; i++){
            if(values[i] === ''){
                valid = false;
                break;
            }else{
                valid = true;
            }
        }

        if(title === 'Choose Title'){
            ToastsStore.warning("Title Not Select")
        }else if(gender === 'Choose Gender'){
            ToastsStore.warning("Gender Not Select")
        }else if(country === 'Choose Country'){
            ToastsStore.warning("Country Not Select")
        }else if(!valid){
            ToastsStore.warning("Some Fields Are Empty")
        }else if($('#inputNic').val().length < 9){
            ToastsStore.warning("Invalid NIC No")
        }else{
            var path = 'http://localhost:8080/Customer/saveData';

            axios.post(path, {
                data: values
              })
              .then(function (response) {
                if(response.data.msg){
                    ToastsStore.success("New Customer Is Registered")
                }else{
                    if(response.data.alert === 'fail'){
                        ToastsStore.success("This Customer Already Registered")
                    }else{
                        ToastsStore.error("New Customer Is Registered Fail")
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
                    <div class="form-group col-md-11 col-sm-7 col-xs-12">
                        <label for="inputTitle">Title</label>
                        <select id="inputTitle" class="form-control">
                            <option selected>Choose Title</option>
                            <option value="Mr. ">Mr. </option>
                            <option value="Miss. ">Miss. </option>
                            <option value="Mrs. ">Mrs. </option>
                            <option value="Ms. ">Ms. </option>
                            <option value="Dr. ">Dr. </option>
                            <option value="Sir. ">Sir. </option>
                            <option value="Ma'am. ">Ma'am. </option>
                        </select>
                    </div>
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
                            placeholder = ""
                            msg = "Please input nic/passport No"
                            handleChange = {this.getValue.bind(this)}
                            reqiured = {true}
                            type = "text"
                            save = {this.state.save}
                        />
                        <div class="form-group col-md-4 col-sm-7 col-xs-12">
                        <label for="inputGender">Gender</label>
                        <select id="inputGender" class="form-control">
                            <option selected>Choose Gender</option>
                            <option>Male</option>
                            <option>Female</option>
                        </select>
                        </div>
                        <Input
                            size = {[3, 3, 3, 12]}
                            id = "inputOccupatio"
                            label = "Occupation"
                            placeholder = ""
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
                            label = "City 2"
                            placeholder = ""
                            msg = "Please input city 2"
                            handleChange = {this.getValue.bind(this)}
                            reqiured = {true}
                            type = "text"
                            save = {this.state.save}
                        /> 
                        <Input
                            size = {[4, 4, 4, 12]}
                            id = "inputState"
                            label = "State"
                            placeholder = ""
                            msg = "Please input state"
                            handleChange = {this.getValue.bind(this)}
                            reqiured = {true}
                            type = "text"
                            save = {this.state.save}
                        />  
                        <div class="form-group col-md-3 col-sm-7 col-xs-12">
                        <label for="inputCountry">Country</label>
                        <select id="inputCountry" class="form-control">
                            <option selected>Choose Country</option>
                        </select>
                        </div>
                    </div>
                    <div class="form-row">
                    <Input
                            size = {[5, 5, 5, 12]}
                            id = "inputEmail"
                            label = "Email"
                            placeholder = ""
                            msg = "Please input email"
                            handleChange = {this.getValue.bind(this)}
                            reqiured = {true}
                            type = "text"
                            save = {this.state.save}
                        /> 
                        <Input
                            size = {[4, 4, 4, 12]}
                            id = "inputMobile"
                            label = "Mobile No"
                            placeholder = ""
                            msg = "Please input mobile no"
                            handleChange = {this.getValue.bind(this)}
                            reqiured = {true}
                            type = "text"
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
