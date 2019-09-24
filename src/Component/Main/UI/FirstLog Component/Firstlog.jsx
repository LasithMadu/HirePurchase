import React, {Component} from 'react';
import axios from 'axios'
import { Scrollbars } from 'react-custom-scrollbars';

import Security from './SubComponent/Security'
import ChangePass from './SubComponent/ChangePass'

export default class Firstlog extends Component {

    constructor(props){
        super(props)
        this.state = {
            show: true,
            confirm: true,
            saveIcon: [false, false, false, false],
            expArr: [false, false, false, false],
            q1: '',
            q2: '',
            an1: '',
            an2: '',
            pass: ''
        }
    }
    
    changePass(pass){
        this.setState({pass: pass})
    }

    changeAns1(q1, value){
        this.setState({q1: q1, an1: value})
    }

    changeAns2(q2, value){
        this.setState({q2: q2, an2: value})
    }

    saveChnages(){
        if(this.state.an1 === '' || this.state.an2 === ''){
            alert('Please fill security question section')
        }else if(this.state.pass === ''){
            alert('Please add new password')
        }else{
            axios.post(sessionStorage.getItem('url')+'/changePass',{
                userId: sessionStorage.getItem('userId'),
                q1: this.state.q1,
                q2: this.state.q2,
                an1: this.state.an1.toLocaleLowerCase(),
                an2: this.state.an2.toLocaleLowerCase(),
                pass: this.state.pass
            })
            .then(function (response) {
                if(response.data.msg){
                    window.location.replace('/customer');
                }else{
                    console.log('Change password has a error');
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }

    logoShow(value){
        if(this.state.expArr[value-1]){
           this.state.expArr[value-1] = false;
            this.forceUpdate()
        }else{
            this.state.expArr[value-1] = true;
            this.forceUpdate()
        }        
    }

    render(){
        return(
            <div className="page-content" style={{paddingBottom: '100px', paddingTop: '30px'}}>
                <Scrollbars visibility-x={false} style={{height: 'calc(100vh - 90px)', display: 'inline-block', overflowX: 'hidden'}}>
                <div className="col-lg-3 col-md-3 col-sm-3"></div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                <div className="col-md-12 col-sm-12 col-xs-12 topItem">
                    <div className="itemTitle" onClick={() => this.logoShow(1)}>
                        <div className="row">
                            <div className="col-md-10 col-sm-10 col-xs-10">
                                {this.state.expArr[1-1]
                                    ? <i class="fa fa-angle-down arrowicon" style={{fontSize: '20px'}}></i>
                                    : <i class="fa fa-angle-right arrowicon" style={{fontSize: '20px'}}></i>
                                }
                                <h4 className="uploadTitle">Security Question</h4>
                            </div>
                            <div className="col-md-1 col-sm-1 col-xs-1">

                            </div>
                            <div className="col-md-1 col-sm-1 col-xs-1">
                                {this.state.saveIcon[0] && this.state.expArr[0]
                                    ? <i className="fa fa-save saveicon" style={{fontSize: '20px'}}></i>
                                    : ""
                                }
                            </div>
                        </div>
                    </div>
                        {this.state.expArr[0]
                            ? <Security changeAns1={this.changeAns1.bind(this)} changeAns2={this.changeAns2.bind(this)}/>
                            : ""
                        }
                </div>
                <br/>
                <div className="col-md-12 col-sm-12 col-xs-12 topItem">
                    <div className="itemTitle" onClick={() => this.logoShow(2)}>
                        <div className="row">
                            <div className="col-md-10 col-sm-10 col-xs-10">
                                {this.state.expArr[2-1]
                                    ? <i class="fa fa-angle-down arrowicon" style={{fontSize: '20px'}}></i>
                                    : <i class="fa fa-angle-right arrowicon" style={{fontSize: '20px'}}></i>
                                }
                                <h4 className="uploadTitle">Change Password</h4>
                            </div>
                            <div className="col-md-1 col-sm-1 col-xs-1">

                            </div>
                            <div className="col-md-1 col-sm-1 col-xs-1">
                                {this.state.saveIcon[1] && this.state.expArr[1]
                                    ? <i className="fa fa-save saveicon" style={{fontSize: '20px'}}></i>
                                    : ""
                                }
                            </div>
                        </div>
                    </div>
                        {this.state.expArr[1]
                            ? <ChangePass changePass={this.changePass.bind(this)}/>
                            : ""
                        }
                </div>
                <div class="form-group col-sm-6 row" style={{marginTop: '30px'}}>
                    <div className='col-xs-6 col-md-3'>
                        <button type="button" class="btn btn-primary" onClick={this.saveChnages.bind(this)}>Save</button>
                    </div>
                    <div className='col-xs-6 col-md-3'>
                        <button type="button" class="btn btn-light">Cancel</button>
                    </div>
                </div>
                </div>
                {/* <div id="footer">
                    <div className="row d-flex justify-content-center">
                        <div className="copyright">
                            <img src={company} class="img-responsive clogo text-center"/><a href="http://i-threesixty.co.uk/"><p className="text-center copytext">© Copyright 2019 by ithreesixty. All rights reserved.</p></a>
                        </div>   
                    </div>
                </div> */}
                </Scrollbars>
            </div>
        )
    }
}