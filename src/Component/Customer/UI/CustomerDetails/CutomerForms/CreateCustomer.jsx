import React, {Component} from 'react';
import axios from 'axios'
import $ from 'jquery'
import uuidv4 from 'uuid/v4'
import {ToastsContainer, ToastsStore, ToastsContainerPosition} from 'react-toasts';

export default class CreateForm extends Component{

    constructor(props){
        super(props)
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
        var title = $('#inputTitle').val();
        var gender = $('#inputGender').val();
        var country = $('#inputCountry').val();
        var values = [uuidv4(), title, $('#inputInitials').val(), $('#inputFullname').val(), $('#inputNic').val(), gender, $('#inputOccupation').val(), $('#inputAddress').val(), $('#inputAddress2').val(), $('#inputCity').val(), $('#inputState').val(), country, $('#inputEmail').val(), $('#inputMobile').val()];

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
            var path = 'https://money360-server.herokuapp.com/Customer/saveData';
            
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

    render(){
        return(
            <div className='container' style={{backgroundColor: '#ffffff'}}>
                <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.BOTTOM_RIGHT} />
                <h3>Customer Register</h3>
                <hr/>
                <form className='col-md-12'>
                    <div class="form-group col-md-11">
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
                    <div class="form-group col-md-11">
                        <label for="inputInitials">Name With Initials</label>
                        <input type="text" class="form-control" id="inputInitials" placeholder="M.D.S Something"/>
                    </div>
                    <div class="form-group col-md-11">
                        <label for="inputFullname">Full Name</label>
                        <input type="text" class="form-control" id="inputFullname" placeholder="Michael Dennis Stocks Something"/>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-4">
                        <label for="inputNic">NIC/Passport No</label>
                        <input type="text" class="form-control" id="inputNic"/>
                        </div>
                        <div class="form-group col-md-4">
                        <label for="inputGender">Gender</label>
                        <select id="inputGender" class="form-control">
                            <option selected>Choose Gender</option>
                            <option>Male</option>
                            <option>Female</option>
                        </select>
                        </div>
                        <div class="form-group col-md-3">
                        <label for="inputOccupation">Occupation</label>
                        <input type="text" class="form-control" id="inputOccupation"/>
                        </div>
                    </div>
                    <div class="form-group col-md-11">
                        <label for="inputAddress">Address</label>
                        <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St"/>
                    </div>
                    <div class="form-group col-md-11">
                        <label for="inputAddress2">Address 2</label>
                        <input type="text" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor"/>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-4">
                        <label for="inputCity">City</label>
                        <input type="text" class="form-control" id="inputCity"/>
                        </div>
                        <div class="form-group col-md-4">
                        <label for="inputState">State</label>
                        <input type="text" class="form-control" id="inputState"/>
                        </div>
                        <div class="form-group col-md-3">
                        <label for="inputCountry">Country</label>
                        <select id="inputCountry" class="form-control">
                            <option selected>Choose Country</option>
                        </select>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                        <label for="inputEmail">Email</label>
                        <input type="text" class="form-control" id="inputEmail"/>
                        </div>
                        <div class="form-group col-md-5">
                        <label for="inputMobile">Mobile No</label>
                        <input type="text" class="form-control" id="inputMobile"/>
                        </div>
                    </div>
                    <div class="form-group col-md-6 row">
                        <div class='col-md-2'>
                            <button type="button" onClick={this.saveCustomer.bind(this)} class="btn btn-primary">Save</button>
                        </div>
                        <div class='col-md-2'>
                            <button type="button" class="btn btn-light">Cancel</button>
                        </div>
                    </div>
                    
                </form>
            </div>
        )
    }
}