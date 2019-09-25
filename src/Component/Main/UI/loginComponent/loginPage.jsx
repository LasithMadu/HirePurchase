import React, {Component} from 'react';
import $ from 'jquery';
import axios from 'axios'
import cogoToast from 'cogo-toast'
import 'simplebar'; // or "import SimpleBar from 'simplebar';" if you want to use it manually.
import 'simplebar/dist/simplebar.css';

import logo from '../../../../Assests/images/logo/hire logo.png'

let atempts = 1;

function reset(){
    $('.msgu').text('');
    $('.msgp').text('');
}

const options = {
    position: 'top-center'
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
        sessionStorage.setItem('url', 'https://hire-purchase-server.herokuapp.com');
        if(sessionStorage.getItem('userId') === null){
        }else{
            window.history.go(-1);
            //window.location.href = '/customer'
        }

        axios.get(sessionStorage.getItem('url')+'/getTheme')
        .then(function (response) {
            if(response.data.msg){
                sessionStorage.setItem('bgColor', response.data.table.rows[0].backColor);
                sessionStorage.setItem('fontColor', response.data.table.rows[0].fontColor);
            }else{
                cogoToast.error("Color Not Loaded", options)
            }
        })
        .catch(function (error) {
            cogoToast.error(error, options)
        });
    }

    backgroundColor(){
        this.setState = { bgColor: '#2ecc71' }
    }

    signin(event){
        event.preventDefault();
        reset();
        let path = sessionStorage.getItem('url')+'/signin';
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
                        $('.msgp').text('Invalid username, try again');
                    }else if(!response.data.user){
                        $('.msgu').text('Invalid user name, try again');
                    }else if(!response.data.pass){
                            sessionStorage.setItem('atempts', atempts++);
                            if((4-atempts) <= -1){
                                axios.post(sessionStorage.getItem('url')+'/lock',{
                                    data: response.data.table.userId
                                })
                                .then(function (response) {
                                    $('.msgp').text('Your account is locked.');
                                })
                                .catch(function (error) {
                                    console.log(error)
                                });
                            }else{
                                $('.msgp').text('Invalid password, try again. You have '+ (4 - parseInt(sessionStorage.getItem('atempts'))) +' atempts.');
                            }
                    }else if(response.data.user && response.data.pass){
                        var isLog;
                        if(locked){
                            $('.msgp').text('Your account is locked.');
                        }else{
                            atempts = 1;
                            sessionStorage.setItem('userId', response.data.table.userId);
                            sessionStorage.setItem('userLevel', response.data.table.userLevel);
                            sessionStorage.setItem('username', response.data.table.userName);
                            sessionStorage.setItem('firstname', response.data.table.firstName);
                            sessionStorage.setItem('lastname', response.data.table.lastName);
                            sessionStorage.setItem('company', response.data.table.company);
                            isLog = response.data.table.isLog;
                            try{
                                axios.post(sessionStorage.getItem('url')+'/getColor', {
                                    company: sessionStorage.getItem('company')
                                })
                                .then(function (response) {
                                    if(response.data.msg){
                                        sessionStorage.setItem('bgColor', response.data.table.rows[0].backColor);
                                        sessionStorage.setItem('fontColor', response.data.table.rows[0].fontColor);
                                        if(isLog || isLog !== null){
                                            window.location.replace('/customer');
                                        }else{
                                            window.location.replace('/firstLog');
                                        }
                                    }else{
                                        cogoToast.error("Color Not Loaded", options)
                                    }
                                })
                                .catch(function (error) {
                                    cogoToast.error(error, options)
                                });
                            }catch(e){
                                cogoToast.error("Some Error", options)
                            }
                        }
                    }
                }else{
                    cogoToast.error("Username or Password Incorrect", options)
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
        if(username === ''){
            $('.msgu').text('Please enter username');
        }else{
            axios.post(sessionStorage.getItem('url')+'/getUsername',{
                username: username
            })
            .then(function (response) {
                if(response.data.username[1]){
                    $('.msgp').text('Your account is locked.');
                }else{
                    if(response.data.username.length === 0){
                        $('.msgu').text('Invalid user name. Type the right username to change password');
                    }else{
                        sessionStorage.setItem('username', response.data.username[0]);
                        window.location.href = "/fogetpass";
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
        <div className='container loginBg'>
            <div className="page-form" >
                <div className="panel panel-blue col-md-12">
                    <div className="panel-body pan" >
                        <form className="form-horizontal" onSubmit={this.signin.bind(this)}>
                            <div className="form-body pal">
                                <div className="col-md-12 col-sm-12 text-center panel-title">
                                    <div className="col-md-8 col-sm-8">
                                        <img src={logo} alt="logo" style={{marginTop: '-180px', marginLeft: '90px'}} className="img-responsive"/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-md-3 col-sm-3 mt-sm-5">
                                          <img src={logo} alt="logo" className="img-responsive"/>
                                    </div>
                                    <div className="col-md-9 text-left">
                                        <h1>Login</h1>
                                        <br />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputName" className="col-md-3 control-label">
                                        Username:</label>
                                    <div className="col-md-9">
                                        <div className="input-icon left">
                                            <i className="fa fa-user"></i>
                                            <input id="inputName" type="text" placeholder="" className="form-control" />
                                            <span className="text-danger msgu"></span></div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputPassword" className="col-md-3 control-label">
                                        Password:</label>
                                    <div className="col-md-9">
                                        <div className="input-icon left">
                                            <i className="fa fa-lock"></i>
                                            {!this.state.show
                                            ? <i className="fa fa-eye-slash passicon" onClick={this.showPass.bind(this)} style={{right: '8px'}} aria-hidden="true"></i>
                                            : <i className="fa fa-eye passicon" onClick={this.showPass.bind(this)} style={{right: '8px'}} aria-hidden="true"></i>
                                            }
                                            <input id="inputPassword" type="password" placeholder="" className="form-control" />
                                            <span className="text-danger msgp"></span></div>
                                    </div>
                                </div>
                                <div className="col-lg-12 text-right">
                                    <p className="forgetpass" onClick={this.forgetPass.bind(this)}>
                                        Forgot Password ?
                                    </p>
                                </div>
                                <div className="form-group mbn">
                                    <div className="col-lg-12" align="right">
                                        <div className="form-group mbn">
                                            <div className="col-lg-3">
                                                &nbsp;
                                            </div>
                                            <div className="col-lg-9">
                                                <input type="submit" className="btn btn-default" value="Login"/>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>`
                        </form>
                    </div>
                </div>
            </div>
            {/* <div id="footer">
                <div className="row d-flex justify-content-center">
                    <div className="copyright">
                        <img src={company} className="img-responsive clogo text-center"/><a href="http://i-threesixty.co.uk/"><p className="text-center copytext">© Copyright 2019 by ithreesixty. All rights reserved.</p></a>
                    </div>
                </div>
            </div> */}
        </div>
      )
    }
  }
