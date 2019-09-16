import React, {Component} from 'react'
import axios from 'axios'
import cogoToast from 'cogo-toast'

import Input from '../../../../Main/UI/SingleComponent/InputField'

const options = {
    position: 'top-right'
}

export default class CustomerDetails extends Component{

    constructor(props){
        super(props)
        this.state = {
            values: [],
            show: true,
            save: false
        }

        this.saveOther = this.saveOther.bind(this);
    }

    saveOther(event){
        event.preventDefault();
        var valid = false;
        const data = new FormData(event.target);
        var self = this;
        self.setState({save: true});
        const other = {}

        for (let entry of data.entries()) {
            other[entry[0]] = entry[1]
        }

        var values = [this.props.agreeId, other.InputNic, other.InputName, other.InputMobile];

        for(var i=0; i<values.length; i++){
            if(values[i] === ''){
                valid = false;
            }else{
                valid = true;
            }
        }
        
        if(valid){
            axios.post('http://localhost:8080/Agreement/saveOther', {
                data: values
            })
            .then(function (response) {
                if(response.data.msg){
                    self.props.changeOther(values);
                    cogoToast.success('Sucessfuly insert other details.', options);
                }else{
                    cogoToast.warn('Fail to insert other details. Try again.', options);
                }
            })
            .catch(function (error) {
                cogoToast.error('Connection error', options);
            });
        }

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
                cogoToast.success('Sucessfuly insert other details.', options);
            }else{
                cogoToast.warn('Fail to insert other details. Try again.', options);
            }
        })
        .catch(function (error) {
            cogoToast.error('Connection error', options);
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
                                <form className='col-sm-12 col-md-12' onSubmit={this.saveOther.bind(this)}>
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
                                            type = "text"
                                            save = {this.state.save}
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
                                            type = "text"
                                            save = {this.state.save}
                                            handleChange = {this.getValue.bind(this)}
                                        />
                                        <Input
                                            size = {[6, 6, 6, 12]}
                                            id = "InputMobile"
                                            label = "Mobile No"
                                            placeholder = "Mobile No"
                                            msg = "Please Input mobile no"
                                            type = "number"
                                            save = {this.state.save}
                                            handleChange = {this.getValue.bind(this)}
                                        />
                                    </div>
                                    <div class="form-group col-sm-4 row">
                                        <div className='col-xs-6 col-md-3'>
                                            <button type="submit" class="btn btn-primary">Save</button>
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