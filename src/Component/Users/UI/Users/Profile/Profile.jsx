import React, {Component} from 'react';
import axios from 'axios'
import $ from 'jquery'
import {ToastsContainer, ToastsStore, ToastsContainerPosition} from 'react-toasts';
import 'simplebar'; // or "import SimpleBar from 'simplebar';" if you want to use it manually.
import 'simplebar/dist/simplebar.css';

function loadData(data){
    setValue('#inputEmail', data.email)
    setValue('#inputUser', data.userName)
    setValue('#inputFirst', data.firstName)
    setValue('#inputLast', data.lastName)
}

function setValue(id, value){
    $(id).val(value);
}

function handleClose(){
    $('.modal').hide();
}

export default class Profile extends Component {

    constructor(props){
        super(props)
        this.state = {
            currentPass: ""
        };
        this.getProfileData();
    }


    getProfileData(){
        var self = this;
        var path = 'http://localhost:8080/Admin/profileData';

        console.log(localStorage.getItem('userId'))

        if(localStorage.getItem('userId') != ''){
            axios.post(path, {
                data: localStorage.getItem('userId')
              })
              .then(function (response) {
                if(response.data.msg){

                    loadData(response.data.table.rows[0])
                    self.setState({
                        currentPass: response.data.table.rows[0].password
                    });
                }else{
                    ToastsStore.error("User Data Is Not Found")
                }
              })
              .catch(function (error) {
                ToastsStore.error('Connection Fail')
              });
        }else{
            ToastsStore.error("Current User Is Unavalable")
        }

    }

    changePassword(){
        var pass,newPass,confirmPass;

        pass = $('#inputCurrent').val();
        newPass = $('#inputNew').val();
        confirmPass = $('#inputConfirm').val();

        if(pass === '' && newPass === '' && confirmPass === ''){
            ToastsStore.warning("Password Can't Change, Some Fields Are Empty")
        }else if(pass === ''){
            ToastsStore.warning("Current Password Is Required")
        }else if(newPass === ''){
            ToastsStore.warning("New Password Is Required")
        }else if(confirmPass === ''){
            ToastsStore.warning("Confirm Password Is Required")
        }else if(newPass != confirmPass){
            ToastsStore.warning("Confirm Password Is Miss Match")
        }else if(pass != this.state.currentPass){
            ToastsStore.warning("Current Password Is Miss Match")
        }else if(newPass.length <=5){
            ToastsStore.warning("New Password Must More Than 5 Letters")
        }else if(newPass === pass){
            ToastsStore.warning("You Can't Use Previous Password As A New Password")
        }else{
            var path = 'http://localhost:8080/Admin/changePass';
            var values = [localStorage.getItem('userId'), newPass]

            axios.post(path, {
                data: values
              })
              .then(function (response) {
                if(response.data.msg){
                    $('#inputCurrent').val('');
                    $('#inputNew').val('');
                    $('#inputConfirm').val('');
                    ToastsStore.success("Sucessfuly Changed Your Password")
                }else{
                    ToastsStore.error("Password Change Fail")
                }
              })
              .catch(function (error) {
                ToastsStore.error("Connection Fail")
              });
        }
    }

    updateData(){
        var valid;
        var values = [localStorage.getItem('userId'), $('#inputFirst').val(), $('#inputLast').val(), $('#inputEmail').val(), $('#inputUser').val().toLowerCase()];

        for(var i=0; i<values.length; i++){
            if(values[i] === ''){
                valid = false;
            }else{
                valid = true;
            }
        }

        if(valid){
            var path = 'http://localhost:8080/Admin/updateData';

            axios.post(path, {
                data: values
              })
              .then(function (response) {
                if(response.data.msg){
                    window.location.href = "/profile";
                    localStorage.setItem('username', $('#inputUser').val());
                    localStorage.setItem('firstname', $('#inputFirst').val());
                    localStorage.setItem('lastname', $('#inputLast').val());
                    ToastsStore.success("Sucessfuly Update Your Profile")
                }else{
                    ToastsStore.error("Update Fail")
                }
              })
              .catch(function (error) {
                ToastsStore.error("Connection Fail")
              });
        }else{
            ToastsStore.error("Some Fields Are Empty")
        }

    }

    showModel(){
        $('.modal').show();
    }

    close(){
        handleClose();
    }

    adminPermission(){
        var path = 'http://localhost:8080/Admin/signin';
        var values = [$('#inputAdminUser').val().toLowerCase(), $('#inputAdminPass').val(), localStorage.getItem('company')];

        if(values[0] === '' || values[1] === ''){
            ToastsStore.warning("Enter Username And Password")
        }else{
            axios.post(path, {
                data: values
                })
                .then(function (response) {
                    if(response.data.msg){
                        if(response.data.alert === 'fail'){
                            ToastsStore.warning("This Is Not The Admin Account")
                        }else{
                            $('.updateBtn').prop('disabled', false);
                            handleClose();
                            ToastsStore.success("You Can Change Your Account Settings")
                        }

                    }else{
                        if(response.data.alert === 'fail'){
                            ToastsStore.error("Username Or Password Incorrect")
                        }else{
                            ToastsStore.error("Connection Fail")
                        }
                    }
                })
                .catch(function (error) {
                    console.log(error)
                });
                $('#inputAdminUser').val('')
                $('#inputAdminPass').val('')
        }
    }

    render(){
        return(
            <div>
                <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.BOTTOM_RIGHT} />
                <div className="modal" role="dialog" style={{borderRadius: '50px'}}>
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title">Admin Permission</h5>
                          <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.close}>
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          <form>
                            <div className="form-group"><label className="col-sm-3 control-label">Username</label>

                                <div className="col-sm-9 controls">
                                    <div className="row">
                                        <div className="col-xs-9"><input type="text" id='inputAdminUser' placeholder="Username" className="form-control"/></div>
                                    </div>
                                </div>
                            </div>
                            <br/>
                            <br/>
                            <br/>
                            <div className="form-group"><label className="col-sm-3 control-label">Password</label>

                                <div className="col-sm-9 controls">
                                    <div className="row">
                                        <div className="col-xs-9"><input type="password" id='inputAdminPass' placeholder="Password" className="form-control"/></div>
                                    </div>
                                </div>
                            </div>
                          </form>
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-primary" onClick={this.adminPermission}>Ok</button>
                          <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.close}>Cancel</button>
                        </div>
                      </div>
                    </div>
                  </div>
                <div data-simplebar>
                <div className="page-content profile">
                    <div id="tab-general">
                        <div className="row mbl">
                            <div className="col-sm-12">

                                            <div className="col-md-12">
                                                <div id="area-chart-spline">
                                                </div>
                                            </div>

                            </div>

                            <div className="col-sm-12">


                              <div className="row">
                    <div className="col-md-12 col-sm-12 col-xs-12"><h2>Profile :- {localStorage.getItem('firstname')+" "+localStorage.getItem('lastname')}</h2>

                        <div className="row mtl">
                            <div className="col-md-3 col-sm-6 col-xs-6 pofimage">
                                <div className="form-group">
                                    <div className="text-center mbl"><img src="http://lorempixel.com/640/480/business/1/" alt="" className="img-responsive"/></div>
                                    <div className="text-center mbl"><a href="#" className="btn btn-green"><i className="fa fa-upload"></i>&nbsp;
                                        Upload</a></div>
                                </div>
                            </div>
                            <div className="col-md-9 col-sm-12 col-xs-12">
                                <div id="generalTabContent" className="tab-content">
                                    <div id="tab-edit" className="tab-pane fade in active">
                                        <form action="#" className="form-horizontal"><h3>Account Setting   <a onClick={this.showModel} style={{fontSize: '12px', color: '#006ae2', cursor: 'pointer'}}>  Edit</a></h3>

                                            <div className="form-group"><label className="col-sm-3 control-label">First Name</label>

                                            <div className="col-sm-9 col-xs-12 controls">
                                                <div className="row">
                                                    <div className="col-sm-9 col-xs-12"><input type="text" id='inputFirst' placeholder="first name" className="form-control"/></div>
                                                </div>
                                            </div>
                                            </div>
                                            <div className="form-group"><label className="col-sm-3 control-label">Last Name</label>

                                            <div className="col-sm-9 col-xs-12 controls">
                                                <div className="row">
                                                    <div className="col-sm-9 col-xs-12"><input type="text" id='inputLast' placeholder="last name" className="form-control"/></div>
                                                </div>
                                            </div>
                                            </div>
                                            <div className="form-group"><label className="col-sm-3 control-label">Email</label>

                                                <div className="col-sm-9 col-xs-12 controls">
                                                    <div className="row">
                                                        <div className="col-sm-9 col-xs-12"><input type="email" id="inputEmail" placeholder="email@yourcompany.com" className="form-control"/></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group"><label className="col-sm-3 control-label">Username</label>

                                                <div className="col-sm-9 col-xs-12 controls">
                                                    <div className="row">
                                                        <div className="col-sm-9 col-xs-12"><input type="text" id='inputUser' placeholder="username" className="form-control"/></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <button type="button" onClick={this.updateData.bind(this)} disabled className="btn btn-green btn-block updateBtn">Update</button>
                                        </form>
                                        <br/>
                                        <hr/>
                                        <form className="form-horizontal"><h3>Security Setting</h3>
                                            <div className="form-group"><label className="col-sm-3 control-label">Password</label>

                                            <div className="col-sm-9 controls">
                                                <div className="row">
                                                    <div className="col-xs-12 col-sm-9"><input type="password" id='inputCurrent' placeholder="Current Password" className="form-control"/></div>
                                                </div>
                                            </div>
                                            </div>

                                            <div className="form-group"><label className="col-sm-3 control-label">Password</label>

                                                <div className="col-sm-9 controls">
                                                    <div className="row">
                                                        <div className="col-xs-12 col-sm-9"><input type="password" id='inputNew' placeholder="New Password" className="form-control"/></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group"><label className="col-sm-3 control-label">Confirm Password</label>

                                                <div className="col-sm-9 controls">
                                                    <div className="row">
                                                        <div className="col-xs-12 col-sm-9"><input type="password" id='inputConfirm' placeholder="Confirm Password" className="form-control"/></div>
                                                    </div>
                                                </div>
                                            </div>

                                            <button type="button" onClick={this.changePassword.bind(this)} className="btn btn-primary btn-block">Change</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                                </div>




                        </div>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}
