import React, {Component} from 'react';
import $ from 'jquery';
import axios from 'axios'

import logo from '../../../../Assests/images/logo/hire logo.png'
import company from '../../../../Assests/images/logo/logo.png'

export default class ForgetPassword extends Component {

    constructor(props){
        super(props)
        this.state = {
            que1: '',
            que2: '',
            ans1: '',
            ans2: ''
        }
    }

    componentDidMount(){
        var self = this;
        axios.post('https://hire-purchase-server.herokuapp.com/getSecurity',{
            username: localStorage.getItem('username')
        })
        .then(function (response) {
            self.setState({
                que1: response.data.values[0],
                que2: response.data.values[1],
                ans1: response.data.values[2],
                ans2: response.data.values[3]
            });
        })
        .catch(function (error) {
            console.log(error)
        });
    }

    checkAnswers(){
        var ans1 = $('#inputAnswer1').val().toLocaleLowerCase();
        var ans2 = $('#inputAnswer2').val().toLocaleLowerCase();

        $('.msgans1').text('');
        $('.msgans2').text('');

        if(ans1 === ''){
            $('.msgans1').text('Please answer the question');
        }else if(ans2 === ''){
            $('.msgans2').text('Please answer the question');
        }else{
            if(ans1 !== this.state.ans1 && ans2 != this.state.ans2){
                $('.msgans2').text('Both answers are wrong. try again');
            }else if(ans1 !== this.state.ans1){
                $('.msgans1').text('This is wrong answer. try again');
            }else if(ans2 !== this.state.ans2){
                $('.msgans2').text('This is wrong answer. try again');
            }else{
                window.location.href = "/changepass";
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
                                        <img src={logo} style={{marginTop: '-220px', marginLeft: '90px'}} class="img-responsive"/>
                                    </div>
                                    <h4 style={{marginTop: '-90px', fontSize: '32px'}}>
                                        Recovery your password</h4>
                                    <br />
                                </div>
                                <div class="form-group">
                                    <div className="row">
                                        <div class="col-md-12">
                                            <h5>{this.state.que1 == '' ? "Security Question 1" : this.state.que1}</h5>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="input-icon right">
                                                <input id="inputAnswer1" type="text" placeholder="" class="form-control" />
                                                <span class="text-danger msgans1"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <br/>
                                    <div className="row">
                                        <div class="col-md-12">
                                            <h5>{this.state.que2 == '' ? "Security Question 1" : this.state.que2}</h5>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="input-icon right">
                                                <input id="inputAnswer2" type="text" placeholder="" class="form-control" />
                                                <span class="text-danger msgans2"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <br/>
                                    <div class="form-group mbn">
                                        <div class="col-md-2">
                                            <button onClick={this.checkAnswers.bind(this)} type="submit" class="btn btn-primary">
                                                Submit</button>
                                        </div>
                                        <div class="col-md-2">
                                            <button onClick={this.signin} type="submit" class="btn btn-warning">
                                                Reset</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
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
            </div>
        )
    }
}