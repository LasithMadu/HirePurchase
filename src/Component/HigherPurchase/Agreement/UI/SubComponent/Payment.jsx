import React, {Component} from 'react'
import $ from 'jquery'
import axios from 'axios'

import Input from '../../../../Main/UI/SingleComponent/InputField'
import DatePicker from '../../../../Main/UI/SingleComponent/DatePicker'

var day = new Date().getDate();
var month = new Date().getMonth();
var year = new Date().getFullYear();

export default class CustomerDetails extends Component{

    state = {
        values: [],
        show: false,
        startDate: new Date(),
        endDate: null,
        showDate: false,
        created: day + '-' + ++month + '-' + year,
        intrest: "3"
    }

    getPeriod(){
        var self = this;
        var x = parseInt($('#InputPeriod').val()); //or whatever offset
        if(x === null){
            setTimeout(function(){ self.setState({showDate: false}); }, 30);
        }else{
            setTimeout(function(){ self.setState({showDate: true}); }, 30);
        }
        var CurrentDate = new Date();
        CurrentDate.setMonth(CurrentDate.getMonth() + x);
        this.setState({endDate: CurrentDate});
        this.setState({showDate: false});
    }

    getValue(){
        
    }

    getIntrest(){
        this.setState({intrest: $('#InputIntrest').val()});
    }

    saveAgreement(){
        var valid;
        var self = this;
        var values = [this.props.agreeId, this.state.created, $('#InputCapital').val(), $('#InputPeriod').val(), this.state.intrest, $('#InputRepayment').val(), $('#InputFRental').val(), $('#InputLRental').val()]
        for(var i=0; i<values.length; i++){
            if(values[i] === ''){
                valid = false
                break;
            }else{
                valid = true;
            }
        }

        if(valid){
            axios.post('http://localhost:8080/Agreement/savePayment', {
                data: values
            })
            .then(function (response) {
                if(response.data.msg){
                    self.props.changePayment(values)
                    localStorage.setItem('agreeId', this.props.agreeId);
                }else{
                    console.log('Payment has a error');
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        }else{
            alert('Empty fields')
        }
    }
      

    render(){
        return(
            <div className="bodyLogo">
                <div className="container">
                    <hr/>
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
                                id = "InputDate"
                                label = "Created Date"
                                placeholder = {this.state.created}
                                disable = {true}
                            />
                        </div>
                        <div class="form-row">
                            <Input
                                size = {[6, 6, 6, 12]}
                                id = "InputCapital"
                                label = "Capital Amount"
                                placeholder = "Capital Amount"
                                msg = "Please Input capital amount"
                                handleChange = {this.getValue.bind(this)}
                            />
                            <Input
                                size = {[6, 6, 6, 12]}
                                id = "InputPeriod"
                                label = "Period"
                                placeholder = "Period"
                                msg = "Please Input period"
                                handleChange = {this.getPeriod.bind(this)}
                            />
                        </div>
                        <div class="form-row">
                            <Input
                                size = {[6, 6, 6, 12]}
                                id = "InputIntrest"
                                label = "Intrest Precentage"
                                placeholder = {this.state.intrest+"%"}
                                disable = {true}
                                editBtn = {true}
                                btnText = "Edit"
                                msg = "Please Input intrest"
                                handleChange = {this.getIntrest.bind(this)}
                            />
                            <Input
                                size = {[6, 6, 6, 12]}
                                id = "InputRepayment"
                                label = "Repayment Period"
                                placeholder = "Repayment Period"
                                msg = "Please Input repayment period"
                                handleChange = {this.getValue.bind(this)}
                            />
                        </div>
                        <div class="form-row">
                            <DatePicker
                                size = {[6, 6, 6, 12]}
                                id = "InputFRental"
                                label = "First Rentaldate"
                                dpId = "fdate"
                                placeholder = {this.state.startDate}
                                msg = "Please Input first rental date"
                                onChange={this.handleChange}
                            />
                            {
                                this.state.showDate ?
                                <DatePicker
                                    size = {[6, 6, 6, 12]}
                                    id = "InputLRental"
                                    label = "Last Rentaldate"
                                    dpId = "ldate"
                                    placeholder = {this.state.endDate}
                                    msg = "Please Input last rental date"
                                /> : 
                                <Input
                                    size = {[6, 6, 6, 12]}
                                    id = "InputLRental"
                                    label = "Last Rentaldate"
                                    placeholder = "Last Rentaldate"
                                    msg = "Please Input last rental date"
                                    handleChange = {this.getValue.bind(this)}
                                />
                            }
                            
                        </div>
                        <div class="form-group col-sm-4 col-md-4 col-lg-4 col-xs-12 row">
                            <div className='col-xs-6 col-md-3'>
                                <button type="button" class="btn btn-primary" onClick={this.saveAgreement.bind(this)}>Save</button>
                            </div>
                            <div className='col-xs-6 col-md-3'>
                                <button type="button" class="btn btn-light">Cancel</button>
                            </div>
                        </div>                        
                    </form>
                    </div>
                </div>
            </div>
        )
    }
}