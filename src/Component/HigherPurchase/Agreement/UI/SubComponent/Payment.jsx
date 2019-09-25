import React, {Component} from 'react'
import $ from 'jquery'
import axios from 'axios'
import date from 'date-and-time';
import cogoToast from 'cogo-toast';

import Input from '../../../../Main/UI/SingleComponent/InputField'
import DatePicker from '../../../../Main/UI/SingleComponent/DatePicker'

var day = new Date().getDate();
var month = new Date().getMonth();
var year = new Date().getFullYear();
var newMonth = month+2;

const now = new Date();
const fdate = new Date()
fdate.setMonth(month + 1);

const options = {
    position: 'top-center'
}

export default class CustomerDetails extends Component{

    state = {
        values: [],
        show: false,
        startDate: date.format(fdate, 'YYYY/MM/DD'),
        endDate: null,
        showDate: false,
        created: day + '-' + ++month + '-' + year,
        intrest: "3",
        save: false
    }

    getPeriod(value){
        var self = this;
        
        var x = parseInt(value); //or whatever offset
        if(x === null || x === ''){
            self.setState({endDate: date.format(now, 'YYYY/MM/DD')});
            setTimeout(function(){ self.setState({showDate: false}); }, 30);
        }else{
            setTimeout(function(){ self.setState({showDate: true}); }, 30);
            now.setMonth(month + x);
            this.setState({endDate: date.format(now, 'YYYY/MM/DD')});
            this.setState({showDate: false});
        }
    }

    getValue(){
        
    }

    changeExpire(value){
        console.log(value);
        this.setState({endDate: day + '-' + newMonth + '-' + year})
    }

    getIntrest(){
        this.setState({intrest: $('#InputIntrest').val()});
    }

    saveAgreement(){
        var valid;
        var self = this;
        self.setState({save: true});
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
            axios.post(sessionStorage.getItem('url')+'/Agreement/savePayment', {
                data: values
            })
            .then(function (response) {
                if(response.data.msg){
                    self.props.changePayment(values)
                    cogoToast.success('Sucessfuly insert payment data.', options);
                    sessionStorage.setItem('agreeId', self.props.agreeId);
                }else{
                    cogoToast.error('Fail to insert payment data. Try again.', options);
                }
            })
            .catch(function (error) {
                console.log(error);
                cogoToast.error('Connection error', options);
            });
        }else{
            //alert('Empty fields')
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
                                save = {false}
                            />
                            <Input
                                size = {[6, 6, 6, 12]}
                                id = "InputDate"
                                label = "Created Date"
                                placeholder = {this.state.created}
                                disable = {true}
                                save = {false}
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
                                reqiured = {true}
                                type = "number"
                                save = {this.state.save}
                            />
                            <Input
                                size = {[6, 6, 6, 12]}
                                id = "InputPeriod"
                                label = "Period"
                                placeholder = "Period"
                                msg = "Please Input period"
                                handleChange = {this.getPeriod.bind(this)}
                                reqiured = {true}
                                type = "number"
                                save = {this.state.save}
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
                                type = "number"
                                msg = "Please Input intrest"
                                handleChange = {this.getIntrest.bind(this)}
                                reqiured = {true}
                            />
                            <Input
                                size = {[6, 6, 6, 12]}
                                id = "InputRepayment"
                                label = "Repayment Period"
                                placeholder = "Repayment Period"
                                msg = "Please Input repayment period"
                                handleChange = {this.getValue.bind(this)}
                                reqiured = {true}
                                type = "number"
                                save = {this.state.save}
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
                                    reqiured = {true}
                                    save = {this.state.save}
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