import React, {Component} from 'react';
import $ from 'jquery'
import uuidv4 from 'uuid/v4'
import axios from 'axios'
import {ToastsContainer, ToastsStore, ToastsContainerPosition} from 'react-toasts';

export default class CreateAdmin extends Component{

    createUser(){
        var valid;
        let values= [uuidv4(), $('#inputFirst').val(), $('#inputLast').val(), $('#inputUser').val().toLowerCase(), $('#inputPass').val(), $('#inputEmail').val(), $('#inputNic').val(), localStorage.getItem('company'), $('#inputAddress').val(), $('#inputCity').val(), $('#inputState').val(), $('#inputZip').val(), $('#inputLevel').val()];
        let path = 'https://money360-server.herokuapp.com/Admin/create';

        for(var i = 0; i<values.length; i++){
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
            <div className='container' style={{backgroundColor: '#ffffff'}}>
                    <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.BOTTOM_RIGHT} />
                    
                <h3>Delete User Account</h3>
                <hr/>
                    <form action="#" className="form-horizontal">
                        <div className="form-body pal">
                            <div className="form-group">
                                <div className='row'>
                                    <label htmlFor="inputName" className="col-md-3 col-sm-2 col-xs-3 control-label">
                                    Search :- </label>
                                    <div className="input-icon col-md-6 col-sm-4 col-xs-6" style={{display: 'inline-block' }}>
                                        <i className="fa fa-user"></i>
                                        <input id="inputName" type="text" placeholder="Search by NIC/Passport No" className="form-control" />
                                    </div>
                                    <div className='col-md-2 col-sm-1 col-xs-2' style={{ height: '30px', paddingTop: '-50px'}}>
                                        <a href="#" className="btn btn-primary ml-5" id="searchBtn" >Search</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                <form className='col-md-12 col-xs-12'>
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
                        <label for="inputLevel">User Level</label>
                        <select id="inputLevel" class="form-control">
                            <option value='Admin' selected>Admin</option>
                            <option value='Oparator'>Oparator</option>
                        </select>
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
                        <select id="inputState" class="form-control">
                            <option selected>Choose...</option>
                            <option>...</option>
                        </select>
                        </div>
                        <div class="form-group col-md-2">
                        <label for="inputZip">Zip</label>
                        <input type="text" class="form-control" id="inputZip"/>
                        </div>
                    </div>
                    <div class="form-group col-sm-6 col-md-4 row">
                        <div class='col-sm-3 col-xs-6'>
                            <button type="button" class="btn btn-danger" onClick={this.createUser.bind(this)}>Delete</button>
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