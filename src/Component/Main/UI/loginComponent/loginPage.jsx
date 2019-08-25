import React, {Component} from 'react';
import $ from 'jquery';
import axios from 'axios'
import {ToastsContainer, ToastsStore, ToastsContainerPosition} from 'react-toasts';
import 'simplebar'; // or "import SimpleBar from 'simplebar';" if you want to use it manually.
import 'simplebar/dist/simplebar.css';

import logo from '../../../../Assests/images/logo/hire logo.png'
import company from '../../../../Assests/images/logo/logo.png'

let atempts = 1;

function reset(){
    $('.msgu').text('');
    $('.msgp').text('');
}

export default class LoginPage extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            bgColor: '',
            fontColor: '#2e4053',
            show: true
        }
    }

    componentDidMount(){
        
        if(localStorage.getItem('userId') === null){
        }else{
            window.history.go(-1);
            //window.location.href = '/customer'
        }
    }

    backgroundColor(){
        this.setState = { bgColor: '#2ecc71' }
    }

    signin(){
        reset();
        let path = 'http://localhost:8080/signin';
        var locked = false;

        if($('#inputName').val().toLowerCase() === ''){
            $('.msgu').text('Please enter username');
        }else if($('#inputPassword').val() === ''){
            $('.msgp').text('Please enter password');
        }else{
            axios.post(path, {
                username: $('#inputName').val().toLowerCase(),
                password:  $('#inputPassword').val()
              })
              .then(function (response) {
                if(response.data.msg){
                    if(response.data.table != null){
                        locked = response.data.table.isLock;
                    }
                    if(!response.data.user && !response.data.pass){
                        $('.msgp').text('Invalid username and password, try again');
                    }else if(!response.data.user){
                        $('.msgu').text('Invalid user name, try again');
                    }else if(!response.data.pass){
                            localStorage.setItem('atempts', atempts++);
                            if((4-atempts) <= -1){
                                axios.post('http://localhost:8080/lock',{
                                    data: response.data.table.userId
                                })
                                .then(function (response) {
                                    $('.msgp').text('Your account is locked.');
                                })
                                .catch(function (error) {
                                    console.log(error)
                                });
                            }else{
                                $('.msgp').text('Invalid password, try again. You have '+ (4 - parseInt(localStorage.getItem('atempts'))) +' chances.');
                            }
                    }else if(response.data.user && response.data.pass){
                        if(locked){
                            $('.msgp').text('Your account is locked.');
                        }else{
                            atempts = 1;
                            localStorage.setItem('userId', response.data.table.userId);
                            localStorage.setItem('userLevel', response.data.table.userLevel);
                            localStorage.setItem('username', response.data.table.userName);
                            localStorage.setItem('firstname', response.data.table.firstName);
                            localStorage.setItem('lastname', response.data.table.lastName);
                            localStorage.setItem('company', response.data.table.company);
                            try{
                                axios.post('https://money360-server.herokuapp.com/getColor', {
                                    company: localStorage.getItem('company')
                                })
                                .then(function (response) {
                                    if(response.data.msg){
                                        localStorage.setItem('bgColor', response.data.table.rows[0].color);
                                        localStorage.setItem('fontColor', '#eeeeee');
                                        window.location.href = "/customer";
                                    }else{
                                        ToastsStore.error("Color Not Loaded")
                                    }
                                })
                                .catch(function (error) {
                                    ToastsStore.error(error)
                                });
                            }catch(e){
                                ToastsStore.error("Some Error")
                            }   
                        }
                    }
                }else{
                    ToastsStore.error("Username or Password Incorrect")
                }
              })
              .catch(function (error) {
                console.log(error)
            });
        }
    }

    showPass(){
        this.setState({ show: !this.state.show})
        if(this.state.show){
            $("#inputPassword").attr("type", "text");
        }else{
            $("#inputPassword").attr("type", "password");
        }
    }

    forgetPass(){
        reset();
        var username = $('#inputName').val();
        if(username == ''){
            $('.msgu').text('Please enter username');
        }else{
            axios.post('http://localhost:8080/getUsername',{
                username: username
            })
            .then(function (response) {
                if(response.data.username[1]){
                    $('.msgp').text('Your account is locked.');
                }else{
                    if(response.data.username.length == 0){
                        $('.msgu').text('Invalid user name. Type the right user name to change password');
                    }else{
                        localStorage.setItem('username', response.data.username);
                        //window.location.href = "/fogetpass";
                    }
                }
            })
            .catch(function (error) {
                console.log(error)
            });
        }
    }

    render () {
      return (
        <div className='container'>
            <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.BOTTOM_RIGHT} />
            <div class="page-form" >
                <div class="panel panel-blue col-md-12">
                    <div class="panel-body pan" >
                        <form action="#" class="form-horizontal">
                        <div class="form-body pal">
                            <div class="col-md-12 col-sm-12 text-center panel-title">
                                <div class="col-md-8 col-sm-8">
                                    <img src={logo} style={{marginTop: '-220px', marginLeft: '90px'}} class="img-responsive"/>
                                </div>
                                <h1 style={{marginTop: '-90px', fontSize: '48px', fontColor: this.state.fontColor}}>
                                    Hire Purchase</h1>
                                <br />
                            </div>
                            <div class="form-group">
                                <div class="col-md-3 col-sm-3 mt-sm-5">
                                    <img src={logo} class="img-responsive"/>
                                </div>
                                <div class="col-md-9 text-center">
                                    <h1>Login</h1>
                                    <br />
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="inputName" class="col-md-3 control-label">
                                    Username:</label>
                                <div class="col-md-9">
                                    <div class="input-icon left">
                                        <i class="fa fa-user"></i>
                                        <input id="inputName" type="text" placeholder="" class="form-control" />
                                        <span class="text-danger msgu"></span></div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="inputPassword" class="col-md-3 control-label">
                                    Password:</label>
                                <div class="col-md-9">
                                    <div class="input-icon left">
                                        <i class="fa fa-lock"></i>
                                        {!this.state.show 
                                        ? <i class="fa fa-eye-slash passicon" onClick={this.showPass.bind(this)} style={{right: '8px'}} aria-hidden="true"></i>
                                        : <i class="fa fa-eye passicon" onClick={this.showPass.bind(this)} style={{right: '8px'}} aria-hidden="true"></i>
                                        }
                                        <input id="inputPassword" type="password" placeholder="" class="form-control" />
                                        <span class="text-danger msgp"></span></div>
                                </div>
                            </div>
                            <div class="col-lg-12 text-right">
                                <p className="forgetpass" onClick={this.forgetPass.bind(this)}>
                                    Forgot Password ?
                                </p>
                            </div>
                            <div class="form-group mbn">
                                <div class="col-lg-12" align="right">
                                    <div class="form-group mbn">
                                        <div class="col-lg-3">
                                            &nbsp;
                                        </div>
                                        <div class="col-lg-9">
                                            <button onClick={this.signin} type="submit" class="btn btn-default">
                                                Login</button>
                                        </div>
                                    </div>
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
                        <img src={company} class="img-responsive clogo text-center"/><a href="http://i-threesixty.co.uk/"><p className="text-center copytext">© Copyright 2019 by ithreesixty. All rights reserved.</p></a>
                    </div>   
                </div>
            </div>
        </div>
      )
    }
  }
  

