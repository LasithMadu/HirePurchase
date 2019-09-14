import React, {Component} from 'react'
import $ from 'jquery'
import axios from 'axios'

import Input from '../../../../Main/UI/SingleComponent/InputField'

export default class CustomerDetails extends Component{

    constructor(props){
        super(props)
        this.state = {
            values: [],
            show: true
        }

        this.saveOther = this.saveOther.bind(this);
    }

    saveOther(){
        var valid = true;
        var self = this;
        var values = [this.props.agreeId, $('#InputNic').val(), $('#InputName').val(), $('#InputMobile').val()];

        axios.post('http://localhost:8080/Agreement/saveOther', {
            data: values
        })
        .then(function (response) {
            if(response.data.msg){
                self.props.changeOther(values);
            }else{
                console.log('Other has a error');
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    cancel(){
        var self = this;
        var values = [this.props.agreeId, '', '', ''];

        axios.post('http://localhost:8080/Agreement/saveOther', {
            data: values
        })
        .then(function (response) {
            if(response.data.msg){
                self.props.changeOther(values);
                if(response.data.dub){
                    self.setState({show: false})
                }
            }else{
                console.log('Other has a error');
            }
        })
        .catch(function (error) {
            console.log(error);
        });
        
    }

    getValue(){
        
    }      

    render(){
        return(
                <div>
                    {
                        this.state.show ?
                        (
                            <div className="bodyLogo">
                                <div className="container">
                                <div className="col-lg-11 col-md-11 col-sm-11 col-xs-12">
                                <form className='col-sm-12 col-md-12'>
                                    <div class="form-row">
                                        <Input
                                            size = {[6, 6, 6, 12]}
                                            id = "InputAgreeId"
                                            label = "Agreement ID"
                                            placeholder = {this.props.agreeId}
                                            disable = {true}
                                        />
                                        <Input
                                            size = {[6, 6, 6, 12]}
                                            id = "InputNic"
                                            label = "NIC No"
                                            placeholder = "NIC No"
                                            msg = "Please Input nic no"
                                            handleChange = {this.getValue.bind(this)}
                                        />
                                    </div>
                                    <div class="form-row">
                                        <Input
                                            size = {[6, 6, 6, 12]}
                                            id = "InputName"
                                            label = "Name"
                                            placeholder = "Name"
                                            msg = "Please Input name"
                                            handleChange = {this.getValue.bind(this)}
                                        />
                                        <Input
                                            size = {[6, 6, 6, 12]}
                                            id = "InputMobile"
                                            label = "Mobile No"
                                            placeholder = "Mobile No"
                                            msg = "Please Input mobile no"
                                            handleChange = {this.getValue.bind(this)}
                                        />
                                    </div>
                                    <div class="form-group col-sm-4 row">
                                        <div className='col-xs-6 col-md-3'>
                                            <button type="button" class="btn btn-primary" onClick={this.saveOther.bind(this)}>Save</button>
                                        </div>
                                        <div className='col-xs-6 col-md-3'>
                                            <button type="button" class="btn btn-light" onClick={this.cancel.bind(this)}>Ignore</button>
                                        </div>
                                    </div>
                                    
                                </form>
                                </div>
                            </div>
                        </div>
                        ) : ""
                    }
                </div>
        )
    }
}