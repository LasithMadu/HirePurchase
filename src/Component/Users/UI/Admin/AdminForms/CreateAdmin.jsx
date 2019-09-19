import React, {Component} from 'react';
import $ from 'jquery'
import uuidv4 from 'uuid/v4'
import axios from 'axios'
import {ToastsContainer, ToastsStore, ToastsContainerPosition} from 'react-toasts';

export default class CreateAdmin extends Component{

    createAdmin(){
        var valid;
        let values= [uuidv4(), $('#inputFirst').val(), $('#inputLast').val(), $('#inputUser').val().toLowerCase(), $('#inputPass').val(), $('#inputEmail').val(), $('#inputNic').val().toUpperCase(), $('#inputCompany').val(), $('#inputAddress').val(), $('#inputCity').val(), $('#inputState').val(), $('#inputZip').val(), 'Admin'];
        let path = sessionStorage.getItem('url')+'/superAdmin/create';

        for(var i = 0; i<13; i++){
            if(values[i] === ''){
                valid = false;
                break;
            }else{
                valid = true;
            }
        }

        if(valid){
            axios.post(path, {
                data: values
              })
              .then(function (response) {
                if(response.data.msg){
                    if(response.data.alert === ''){
                        ToastsStore.success('Admin Created Sucessfull')
                    }else{
                        ToastsStore.success(response.data.alert)
                    }
                }else{
                    ToastsStore.error("Admin Created Fail")
                }
              })
              .catch(function (error) {
                ToastsStore.error("Connection Error")
              });
        }else{
            ToastsStore.warning("Some Fields Are Empty")
        }
    }

    render(){
        return(
            <div>
                <form className='col-md-12 col-sm-12 col-xs-12'>
                    <div class="form-row">
                        <div class="form-group col-md-6 col-sm-7 col-xs-12">
                        <label for="inputFirst">First Name</label>
                        <input type="text" class="form-control" id="inputFirst" placeholder="First Name"/>
                        </div>
                        <div class="form-group col-md-5 col-sm-7 col-xs-12">
                        <label for="inputLast">Last Name</label>
                        <input type="text" class="form-control" id="inputLast" placeholder="Last Name"/>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6 col-sm-7 col-xs-12">
                        <label for="inputFirst">Username</label>
                        <input type="text" class="form-control" id="inputUser" placeholder="Username"/>
                        </div>
                        <div class="form-group col-md-5 col-sm-7 col-xs-12">
                        <label for="inputLast">Password</label>
                        <input type="password" class="form-control" id="inputPass" placeholder="Password"/>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6 col-sm-7 col-xs-12">
                        <label for="inputEmail">Email</label>
                        <input type="email" class="form-control" id="inputEmail" placeholder='Email Address'/>
                        </div>
                        <div class="form-group col-md-5 col-sm-7 col-xs-12">
                        <label for="inputNic">NIC/Passport No</label>
                        <input type="text" class="form-control" id="inputNic" placeholder='NIC No'/>
                        </div>
                    </div>
                    <div class="form-group col-md-11 col-sm-7 col-xs-12">
                        <label for="inputCompany">Company Name</label>
                        <input type="text" class="form-control" id="inputCompany" placeholder="Company Name"/>
                    </div>
                    <div class="form-group col-md-11 col-sm-7 col-xs-12">
                        <label for="inputAddress">Company Address</label>
                        <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St, Apartment, studio, or floor"/>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-5 col-sm-7 col-xs-12">
                        <label for="inputCity">City</label>
                        <input type="text" class="form-control" id="inputCity"/>
                        </div>
                        <div class="form-group col-md-4 col-sm-7 col-xs-12">
                        <label for="inputState">State</label>
                        <input type="text" class="form-control" id="inputState"/>
                        </div>
                        <div class="form-group col-md-2 col-sm-7 col-xs-12">
                        <label for="inputZip">Zip</label>
                        <input type="text" class="form-control" id="inputZip"/>
                        </div>
                    </div>
                    <div class="form-group col-sm-6 col-md-4 row">
                        <div class='col-sm-3 col-xs-6'>
                            <button type="button" class="btn btn-primary" onClick={this.createAdmin.bind(this)}>Save</button>
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
