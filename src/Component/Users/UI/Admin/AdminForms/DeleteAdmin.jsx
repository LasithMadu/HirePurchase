import React, {Component} from 'react';
import $ from 'jquery'
import axios from 'axios'
import cogoToast from 'cogo-toast';

import Input from '../../../../Main/UI/SingleComponent/InputField'
import Search from '../../../../Main/UI/SingleComponent/Search'

const options = {
    position: 'top-center'
}

export default class EditAdmin extends Component{

    state = {
        save: false,
        id: '',
        values: []
    }

    searchAdmin(e) {
        e.preventDefault();
        var nic = $('#inputName').val();
        var self = this;

        if (nic !== '') {
            axios.post(sessionStorage.getItem('url') + '/Admin/getUserByNic', {
                nic: nic
            })
            .then(function (response) {
                if (response.data.msg) {
                    self.setState({ id: response.data.data.rows[0].userId, values: response.data.data.rows[0]})
                } else {
                    cogoToast.error("Invalid nic or passport number", options)
                }
            })
            .catch(function (error) {
                cogoToast.error("Connection Error", options)
            });
        }
    }


    deleteAdmin(){
        this.setState({save: true})
        var nic = $('#inputNic').val();

        if (nic !== '') {
            axios.post(sessionStorage.getItem('url') + '/Admin/deleteUser', {
                id: this.state.id
            })
            .then(function (response) {
                if (response.data.msg) {
                    cogoToast.success("Admin account delete sucessful", options)
                } else {
                    cogoToast.error("Admin account delete fail", options)
                }
            })
            .catch(function (error) {
                cogoToast.error("Connection Error", options)
            });
        }
    }

    getValue() {

    }

    render(){
        var data = this.state.values;
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
                            handleChange={this.searchAdmin.bind(this)}
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
                            disable={true}
                            placeholder= {data.firstName}
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
                            disable={true}
                            placeholder={data.lastName}
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
                            disable={true}
                            placeholder={data.userName}
                            msg="Please input username"
                            handleChange={this.getValue.bind(this)}
                            reqiured={true}
                            type="text"
                            save={this.state.save}
                        />
                        <Input
                            size={[6, 6, 6, 12]}
                            id="inputPass"
                            label="Password"
                            disable={true}
                            placeholder={data.password}
                            msg="Please input password"
                            handleChange={this.getValue.bind(this)}
                            reqiured={true}
                            type="password"
                            save={this.state.save}
                        />
                    </div>
                    <div class="form-row">
                        <Input
                            size={[6, 6, 6, 12]}
                            id="inputEmail"
                            label="Email"
                            disable={true}
                            placeholder={data.email}
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
                            disable={true}
                            placeholder={data.nic}
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
                        disable={true}
                        placeholder={data.address}
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
                            id="inputState"
                            label="State"
                            disable={true}
                            placeholder={data.state}
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
                            disable={true}
                            placeholder={data.zip}
                            msg="Please input postal code"
                            handleChange={this.getValue.bind(this)}
                            reqiured={true}
                            type="text"
                            save={this.state.save}
                        />
                    </div>
                    <div class="form-group col-sm-6 col-md-4 row">
                        <div class='col-sm-3 col-xs-6'>
                            <button type="button" class="btn btn-danger" onClick={this.deleteAdmin.bind(this)}>Delete</button>
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
