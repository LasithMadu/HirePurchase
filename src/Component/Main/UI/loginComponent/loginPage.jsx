import React, {Component} from 'react';
import $ from 'jquery';
import axios from 'axios'
import {ToastsContainer, ToastsStore, ToastsContainerPosition} from 'react-toasts';
import 'simplebar'; // or "import SimpleBar from 'simplebar';" if you want to use it manually.
import 'simplebar/dist/simplebar.css';

import avatar from '../../../../Assests/images/avatar/profile-pic.png'

export default class LoginPage extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            bgColor: '',
            fontColor: '#2e4053'
        }
    }

    backgroundColor(){
        this.setState = { bgColor: '#2ecc71' }
    }

    signin(){
        var values = [$('#inputName').val().toLowerCase(), $('#inputPassword').val()];
        let path = 'https://money360-server.herokuapp.com//signin';

        if(values[0] === ''){
            ToastsStore.warning("Please Fill The Username Field")
        }else if(values[1] === ''){
            ToastsStore.warning("Please Fill The Password Field")
        }else{
            axios.post(path, {
                data: values
              })
              .then(function (response) {
                if(response.data.msg){
                    localStorage.setItem('userId', response.data.table.rows[0].userId);
                    localStorage.setItem('userLevel', response.data.table.rows[0].userLevel);
                    localStorage.setItem('username', response.data.table.rows[0].userName);
                    localStorage.setItem('firstname', response.data.table.rows[0].firstName);
                    localStorage.setItem('lastname', response.data.table.rows[0].lastName);
                    localStorage.setItem('company', response.data.table.rows[0].company);
                    try{
                        axios.post('https://money360-server.herokuapp.com//getColor', {
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
                }else{
                    console.log(response.data)
                    ToastsStore.error("Username or Password Incorrect")
                }
              })
              .catch(function (error) {
                  console.log(error)
                ToastsStore.error("Network Error")
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
                            <div class="col-md-12 text-center panel-title">
                                <h1 style={{marginTop: '-90px', fontSize: '48px', fontColor: this.state.fontColor}}>
                                    Money 360 Login</h1>
                                <br />
                            </div>
                            <div class="form-group">
                                <div class="col-md-3">
                                    <img src={avatar} class="img-responsive" style={{marginTop: '-35px'}}/>
                                </div>
                                <div class="col-md-9 text-center">
                                    <h1>
                                        Hold on, please.</h1>
                                    <br />
                                    <p>
                                        Just sign in and we’ll send you on your way</p>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="inputName" class="col-md-3 control-label">
                                    Username:</label>
                                <div class="col-md-9">
                                    <div class="input-icon right">
                                        <i class="fa fa-user"></i>
                                        <input id="inputName" type="text" placeholder="" class="form-control" /></div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="inputPassword" class="col-md-3 control-label">
                                    Password:</label>
                                <div class="col-md-9">
                                    <div class="input-icon right">
                                        <i class="fa fa-lock"></i>
                                        <input id="inputPassword" type="password" placeholder="" class="form-control" /></div>
                                </div>
                            </div>
                            <div class="col-lg-12 text-right">
                                <p>
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
                                                Sign In</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
      )
    }
  }
  

