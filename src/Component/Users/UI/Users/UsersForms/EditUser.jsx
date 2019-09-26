import React, {Component} from 'react';
import $ from 'jquery'
import axios from 'axios'
import cogoToast from 'cogo-toast';

import Input from '../../../../Main/UI/SingleComponent/InputField'
import Password from '../../../../Main/UI/SingleComponent/PasswordInput'
import Search from '../../../../Main/UI/SingleComponent/Search'

const options = {
    position: 'top-center'
}


function setInput(id, value) {
    $(id).val(value);
}

function loadData(data){
    setInput('#inputFirst', data.firstName)
    setInput('#inputLast', data.lastName)
    setInput('#inputUser', data.userName)
    setInput('#inputPass', data.password)
    setInput('#inputEmail', data.email)
    setInput('#inputNic', data.nic)
    setInput('#inputAddress', data.address)
    setInput('#inputCity', data.city)
    setInput('#inputState', data.state)
    setInput('#inputZip', data.zip)
    setInput('#inputLevel', data.userLevel)
}

export default class EditUser extends Component{

    state = {
        save: false,
        id: ''
    }

    updateUser(){
        var valid;
        this.setState({save:true})
        var self = this;
        let values = [$('#inputFirst').val(), $('#inputLast').val(), $('#inputUser').val().toLowerCase(), $('#inputPass').val(), $('#inputEmail').val(), $('#inputNic').val().toUpperCase(), sessionStorage.getItem('company'), $('#inputAddress').val(), $('#inputCity').val(), $('#inputState').val(), $('#inputZip').val(), $('#inputLevel').val()];

        for(var i = 0; i<13; i++){
            if(values[i] === ''){
                valid = false;
                break;
            }else{
                valid = true;
            }
        }

        if (this.state.id === '') {
            valid = false;
        }

        if(valid){
            axios.post(sessionStorage.getItem('url') + '/Admin/updateUser', {
                id: self.state.id,
                data: values
              })
              .then(function (response) {
                if(response.data.msg){
                    cogoToast.success('User update sucessfull', options)
                }else{
                    cogoToast.error("User update fail", options)
                }
              })
              .catch(function (error) {
                  cogoToast.error("Connection Error", options)
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

    searchUser(e){
        e.preventDefault();
        var nic = $('#inputName').val();
        var self = this;

        if(nic !== ''){
            axios.post(sessionStorage.getItem('url') + '/Admin/getUserByNic', {
                nic: nic
            })
            .then(function (response) {
                if (response.data.msg) {
                    loadData(response.data.data.rows[0])
                    self.setState({id: response.data.data.rows[0].userId})
                } else {
                    cogoToast.error("User created Fail", options)
                }
            })
            .catch(function (error) {
                cogoToast.error("Connection Error", options)
            });
        }
    }
    getValue(){

    }

    render(){
        return(
            <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                    <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                        <Search
                            id="inputName"
                            icon="fa fa-user"
                            placeholder="Search by NIC/Passport No"
                            btnId="searchBtn"
                            msg="Please input nic or passport no"
                            handleChange={this.searchUser.bind(this)}
                            width="96%"
                        />
                    </div>
                </div>
                <form className='col-md-12 col-sm-12'>
                    <div class="form-row">
                        <Input
                            size={[6, 6, 6, 12]}
                            id="inputFirst"
                            label="First Name"
                            placeholder="First Name"
                            handleChange={this.getValue.bind(this)}
                            msg="Please input first name"
                            reqiured={true}
                            type="text"
                            save={this.state.save}
                        />
                        <Input
                            size={[6, 6, 6, 12]}
                            id="inputLast"
                            label="Last Name"
                            placeholder="Last Name"
                            handleChange={this.getValue.bind(this)}
                            msg="Please input last name"
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
                            handleChange={this.getValue.bind(this)}
                            msg="Please input username"
                            reqiured={true}
                            type="text"
                            save={this.state.save}
                        />
                        <Password
                            size={[6, 6, 6, 12]}
                            id="inputPass"
                            label="Password"
                            placeholder="password"
                            reqiured={true}
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
                            handleChange={this.getValue.bind(this)}
                            msg="Please input email"
                            reqiured={true}
                            type="text"
                            save={this.state.save}
                        />
                        <Input
                            size={[6, 6, 6, 12]}
                            id="inputNic"
                            label="NIC/Passport No"
                            placeholder="NIC/Passport No"
                            handleChange={this.getValue.bind(this)}
                            msg="Please input nic or passport no"
                            reqiured={true}
                            type="text"
                            save={this.state.save}
                        />
                    </div>
                    <div class="form-group col-md-11 col-sm-7 col-xs-12">
                        <label for="inputLevel">User Level</label>
                        <select id="inputLevel" class="form-control">
                            <option value='Admin' selected>Admin</option>
                            <option value='Oparator'>Oparator</option>
                        </select>
                    </div>
                    <Input
                        size={[12, 12, 12, 12]}
                        id="inputAddress"
                        label="Company Address"
                        placeholder="Company Address"
                        handleChange={this.getValue.bind(this)}
                        msg="Please input company address"
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
                            handleChange={this.getValue.bind(this)}
                            msg="Please input city"
                            reqiured={true}
                            type="text"
                            save={this.state.save}
                        />
                        <Input
                            size={[4, 4, 4, 12]}
                            id="inputState"
                            label="State"
                            placeholder="State"
                            handleChange={this.getValue.bind(this)}
                            msg="Please input state"
                            reqiured={true}
                            type="text"
                            save={this.state.save}
                        />
                        <Input
                            size={[4, 4, 4, 12]}
                            id="inputZip"
                            label="Postal Code"
                            placeholder="Postal Code"
                            handleChange={this.getValue.bind(this)}
                            msg="Please input postal code"
                            reqiured={true}
                            type="text"
                            save={this.state.save}
                        />
                    </div>
                    <div class="form-group col-sm-6 col-md-4 row">
                        <div class='col-sm-3 col-xs-6'>
                            <button type="button" class="btn btn-primary" onClick={this.updateUser.bind(this)}>Update</button>
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
