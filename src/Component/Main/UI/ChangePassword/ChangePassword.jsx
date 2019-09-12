import React, {Component} from 'react';
import $ from 'jquery';
import axios from 'axios'

import logo from '../../../../Assests/images/logo/hire logo.png'
import company from '../../../../Assests/images/logo/logo.png'

export default class ForgetPassword extends Component {

    constructor(props){
        super(props)
        this.state = {
            show: true,
            confirm: true
        }
    }

    showPass(){
        this.setState({ show: !this.state.show})
        if(this.state.show){
            $("#inputNewPass").attr("type", "text");
        }else{
            $("#inputNewPass").attr("type", "password");
        }
    }

    confirmPass(){
        this.setState({ confirm: !this.state.confirm})
        if(this.state.confirm){
            $("#inputConPass").attr("type", "text");
        }else{
            $("#inputConPass").attr("type", "password");
        }
    }

    showMsg(){
        $('.msgnew').text('Password should contain more than 8 characters and at least 1 upper case character, 1 lower case character, 1 number and 1 special character');
        var pass = $('#inputNewPass').val();

        var strength = 1;
        var regex = new Array();
        regex.push(".{8,}"); //For length
        regex.push("[A-Z]"); //For Uppercase Alphabet
        regex.push("[a-z]"); //For Lowercase Alphabet
        regex.push("[0-9]"); //For Numeric Digits
        regex.push("[$@$!%*#?&]"); //For Special Characters
        $.map(regex, function(regexp) {
        if(pass.match(regexp))
            strength++;
        });

        if(strength === 6){
            $('.msgnew').text('');
        }

        if(pass.length === 0){
            $('.msgnew').text('Please input your password.');
        }
    }

    confirmMsg(){
        $('.msgcon').text('Two passwords that you enter are inconsistent!');

        var confirm = $('#inputConPass').val();

        if(confirm.length === 0){
            $('.msgcon').text('Please confirm your password.');
        }

        if(confirm === $('#inputNewPass').val()){
            $('.msgcon').text('');
        }
    }

    savePass(){
        var newPass = $('#inputNewPass').val();
        var conPass = $('#inputConPass').val();

        if(newPass === '' && conPass === ''){
            $('.msgcon').text('Please input your new password and confirm password.');
        }else if(newPass === ''){
            $('.msgnew').text('Please input your new password.');
        }else if(conPass === ''){
            $('.msgcon').text('Please input your confirm password.');
        }else if(newPass !== conPass){
            $('.msgcon').text('Two passwords that you enter are inconsistent!');
        }else{
            var strength = 1;
            var regex = new Array();
            regex.push(".{8,}"); //For length
            regex.push("[A-Z]"); //For Uppercase Alphabet
            regex.push("[a-z]"); //For Lowercase Alphabet
            regex.push("[0-9]"); //For Numeric Digits
            regex.push("[$@$!%*#?&]"); //For Special Characters
            $.map(regex, function(regexp) {
            if(newPass.match(regexp))
                strength++;
            });

            if(strength === 6){
                axios.post('http://localhost:8080/savePassword',{
                    username: localStorage.getItem('username'),
                    password: newPass
                })
                .then(function (response) {
                    window.location.href = "/";
                })
                .catch(function (error) {
                    console.log(error)
                });
            }else{
                $('.msgnew').text('Password should contain more than 8 characters and at least 1 upper case character, 1 lower case character, 1 number and 1 special character');
            }
        }
    }

    render(){
        return(
            <div className='container-full'>
                <div class="page-form" >
                    <div class="panel panel-blue col-md-12">
                        <div class="panel-body pan" >
                            <form action="#" class="form-horizontal sec">
                                <div class="col-md-12 col-sm-12 text-center panel-title">
                                    <div class="col-md-8 col-sm-8">
                                        <img src={logo} alt="logo" style={{marginTop: '-220px', marginLeft: '90px'}} class="img-responsive"/>
                                    </div>
                                    <h4 style={{marginTop: '-90px', fontSize: '32px'}}>
                                        Change your password</h4>
                                    <br />
                                </div>
                                <div class="form-group">
                                    <div className="row">
                                        <div class="col-md-12">
                                            <h5>New Password</h5>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="input-icon left">
                                                <i class="fa fa-lock"></i>
                                                {!this.state.show 
                                                ? <i class="fa fa-eye-slash passicon" onClick={this.showPass.bind(this)} style={{right: '8px'}} aria-hidden="true"></i>
                                                : <i class="fa fa-eye passicon" onClick={this.showPass.bind(this)} style={{right: '8px'}} aria-hidden="true"></i>
                                                }
                                                <input id="inputNewPass" type="password" placeholder="" class="form-control" onChange={this.showMsg}/>
                                                <span class="text-danger msgnew"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <br/>
                                    <div className="row">
                                        <div class="col-md-12">
                                            <h5>Confirm Password</h5>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="input-icon left">
                                                <i class="fa fa-lock"></i>
                                                {!this.state.confirm 
                                                ? <i class="fa fa-eye-slash passicon" onClick={this.confirmPass.bind(this)} style={{right: '8px'}} aria-hidden="true"></i>
                                                : <i class="fa fa-eye passicon" onClick={this.confirmPass.bind(this)} style={{right: '8px'}} aria-hidden="true"></i>
                                                }
                                                <input id="inputConPass" type="password" placeholder="" class="form-control" onChange={this.confirmMsg} />
                                                <span class="text-danger msgcon"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <br/>
                                    <div class="form-group mbn">
                                        <div class="col-md-2">
                                            <button onClick={this.savePass} type="submit" class="btn btn-primary">
                                                Save</button>
                                        </div>
                                        <div class="col-md-2">
                                            <button onClick={this.signin} type="submit" class="btn btn-warning">
                                                Cancel</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div id="footer">
                    <div className="row d-flex justify-content-center">
                        <div className="copyright">
                            <img src={company} alt="company" class="img-responsive clogo text-center"/><a href="http://i-threesixty.co.uk/"><p className="text-center copytext">© Copyright 2019 by ithreesixty. All rights reserved.</p></a>
                        </div>   
                    </div>
                </div>
            </div>
        )
    }
}