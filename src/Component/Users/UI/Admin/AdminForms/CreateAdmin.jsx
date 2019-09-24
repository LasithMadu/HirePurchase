import React, {Component} from 'react';
import $ from 'jquery'
import uuidv4 from 'uuid/v4'
import axios from 'axios'
import cogoToast from 'cogo-toast';

import Input from '../../../../Main/UI/SingleComponent/InputField'
import Password from '../../../../Main/UI/SingleComponent/PasswordInput'

const options = {
    position: 'top-center'
}

export default class CreateAdmin extends Component{

    state = {
        save: false,
        err: '',
    }

    createAdmin(){
        var valid;
        let values = [uuidv4(), $('#inputFirst').val(), $('#inputLast').val(), $('#inputUser').val().toLowerCase(), $('#inputPass').val(), $('#inputEmail').val(), $('#inputNic').val().toUpperCase(), sessionStorage.getItem('company'), $('#inputAddress').val(), $('#inputCity').val(), $('#inputState').val(), $('#inputZip').val(), 'Admin'];

        for(var i = 0; i<13; i++){
            if(values[i] === ''){
                valid = false;
                break;
            }else{
                valid = true;
            }
        }

        if(valid){
            axios.post(sessionStorage.getItem('url') + '/superAdmin/create', {
                data: values
              })
              .then(function (response) {
                if(response.data.msg){
                    if(response.data.alert === ''){
                        cogoToast.success('Admin created sucessfull', options)
                    }else{
                        cogoToast.success(response.data.alert, options)
                    }
                }else{
                    cogoToast.error("Admin created fail", options)
                }
              })
              .catch(function (error) {
                  cogoToast.error("Server error", options)
              });
        }
    }

    newPass(value) {
        var strength = 1;
        var regex = [];
        regex.push(".{8,}"); //For length
        regex.push("[A-Z]"); //For Uppercase Alphabet
        regex.push("[a-z]"); //For Lowercase Alphabet
        regex.push("[0-9]"); //For Numeric Digits
        regex.push("[$@$!%*#?&]"); //For Special Characters
        $.map(regex, function (regexp) {
            if (value.match(regexp))
                strength++;
        });

        if (value === '') {
            this.setState({ err: 'Please input new password' })
        } else if (strength === 6) {
            this.setState({ err: '' })
        } else {
            this.setState({ err: 'Password should contain more than 8 characters and at least 1 upper case character, 1 lower case character, 1 number and 1 special character' })
        }
    }

    getValue(){

    }

    render(){
        return(
            <div>
                <form className='col-md-12 col-sm-12 col-xs-12'>
                    <div class="form-row">
                        <Input
                            size={[6, 6, 6, 12]}
                            id="inputFirst"
                            label="First Name"
                            placeholder="First Name"
                            msg="Please input first name"
                            handleChange={this.getValue.bind(this)}
                            reqiured={true}
                            type="text"
                            save={this.state.save}
                        />
                        <Input
                            size={[6, 6, 6, 12]}
                            id="inputLast"
                            label="Last Name"
                            placeholder="Last Name"
                            msg="Please input last name"
                            handleChange={this.getValue.bind(this)}
                            reqiured={true}
                            type="text"
                            save={this.state.save}
                        />
                    </div>
                    <div class="form-row">
                        <Input
                            size={[6, 6, 6, 12]}
                            id="inputUser"
                            label="Username"
                            placeholder="Username"
                            msg="Please input username"
                            handleChange={this.getValue.bind(this)}
                            reqiured={true}
                            type="text"
                            save={this.state.save}
                        />
                        <Password
                            size={[6, 6, 6, 12]}
                            id="inputPass"
                            label="Password"
                            placeholder="password"
                            msg="Please Input password"
                            handleChange={this.newPass.bind(this)}
                            err={this.state.err}
                        />
                    </div>
                    <div class="form-row">
                        <Input
                            size={[6, 6, 6, 12]}
                            id="inputEmail"
                            label="Email"
                            placeholder="Email"
                            msg="Please input email"
                            handleChange={this.getValue.bind(this)}
                            reqiured={true}
                            type="text"
                            save={this.state.save}
                        />
                        <Input
                            size={[6, 6, 6, 12]}
                            id="inputNic"
                            label="NIC/Passport No"
                            placeholder="NIC/Passport No"
                            msg="Please input nic or passport no"
                            handleChange={this.getValue.bind(this)}
                            reqiured={true}
                            type="text"
                            save={this.state.save}
                        />
                    </div>
                    <Input
                        size={[12, 12, 12, 12]}
                        id="inputAddress"
                        label="Company Address"
                        placeholder="Company Address"
                        msg="Please input company address"
                        handleChange={this.getValue.bind(this)}
                        reqiured={true}
                        type="text"
                        save={this.state.save}
                    />
                    <div class="form-row">
                        <Input
                            size={[4, 4, 4, 12]}
                            id="inputCity"
                            label="City"
                            placeholder="City"
                            msg="Please input city"
                            handleChange={this.getValue.bind(this)}
                            reqiured={true}
                            type="text"
                            save={this.state.save}
                        />
                        <Input
                            size={[4, 4, 4, 12]}
                            id="inputState"
                            label="State"
                            placeholder="State"
                            msg="Please input state"
                            handleChange={this.getValue.bind(this)}
                            reqiured={true}
                            type="text"
                            save={this.state.save}
                        />
                        <Input
                            size={[4, 4, 4, 12]}
                            id="inputZip"
                            label="Postal Code"
                            placeholder="Postal Code"
                            msg="Please input postal code"
                            handleChange={this.getValue.bind(this)}
                            reqiured={true}
                            type="text"
                            save={this.state.save}
                        />
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
