import React, {Component} from 'react'
import uniqueid from 'uniqueid';
import $ from 'jquery'

import Input from '../../../../Main/UI/SingleComponent/InputField'
import DatePicker from '../../../../Main/UI/SingleComponent/DatePicker'

export default class CustomerDetails extends Component{

    state = {
        values: [],
        show: false,
        startDate: new Date(),
        endDate: null,
        showDate: false
    }

    componentDidMount(){
        var self = this;
        var first = uniqueid('i360-00');
    }

    saveAgreement(){
        console.log($('#InputCapital').val());
    }

    getPeriod(){
        var self = this;
        var x = parseInt($('#InputPeriod').val()); //or whatever offset
        if(x == null){
            setTimeout(function(){ self.setState({showDate: false}); }, 30);
        }else{
            setTimeout(function(){ self.setState({showDate: true}); }, 30);
        }
        var CurrentDate = new Date();
        CurrentDate.setMonth(CurrentDate.getMonth() + x);
        this.setState({endDate: CurrentDate});
        this.setState({showDate: false});
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
                                placeholder = "Agreement No"
                                disable = {true}
                            />
                            <Input
                                size = {[6, 6, 6, 12]}
                                id = "InputDate"
                                label = "Created Date"
                                placeholder = "Created Date"
                                disable = {true}
                            />
                        </div>
                        <div class="form-row">
                            <Input
                                size = {[6, 6, 6, 12]}
                                id = "InputCapital"
                                label = "Capital"
                                placeholder = "Capital"
                                msg = "Please Input capital amount"
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
                                label = "Intrest"
                                placeholder = "Intrest"
                                msg = "Please Input intrest"
                            />
                            <Input
                                size = {[6, 6, 6, 12]}
                                id = "InputRepayment"
                                label = "Repayment Period"
                                placeholder = "Repayment Period"
                                msg = "Please Input repayment period"
                            />
                        </div>
                        <div class="form-row">
                            <DatePicker
                                size = {[6, 6, 6, 12]}
                                id = "InputFRental"
                                label = "First Rentaldate"
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
                                    placeholder = {this.state.endDate}
                                    msg = "Please Input last rental date"
                                /> : 
                                <Input
                                    size = {[6, 6, 6, 12]}
                                    id = "InputLRental"
                                    label = "Last Rentaldate"
                                    placeholder = "Last Rentaldate"
                                    msg = "Please Input last rental date"
                                />
                            }
                            
                        </div>
                        <div class="form-group col-sm-6 row">
                            <div className='col-xs-6 col-md-3'>
                                <button type="button" class="btn btn-primary" onClick={this.saveAgreement}>Save</button>
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