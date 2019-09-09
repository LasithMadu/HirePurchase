import React, {Component} from 'react'
import uniqueid from 'uniqueid';
import $ from 'jquery'

import Input from '../../../../Main/UI/SingleComponent/InputField'
import DatePicker from '../../../../Main/UI/SingleComponent/DatePicker'

export default class CustomerDetails extends Component{

    state = {
        values: [],
        show: false
    }

    componentDidMount(){
        var self = this;
        var first = uniqueid('i360-00');
        console.log(first());
        console.log(first());
        console.log(first());

        $(document).on("focusout","#InputFRental",function(){
            self.setState({show: false});
        });
    
        $(document).on("focusin","#InputFRental",function(){
            self.setState({show: true});
        });
    }

    saveAgreement(){
        console.log($('#InputCapital').val());
    }
      

    render(){
        return(
            <div className="bodyLogo">
                <div className="container">
                    <h5 className="text-dark">Payment Details</h5>
                    <hr/>
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
                                placeholder = "First Rentaldate"
                                msg = "Please Input first rental date"
                            />
                            
                            <Input
                                size = {[6, 6, 6, 12]}
                                id = "InputLRental"
                                label = "Last Rentaldate"
                                placeholder = "Last Rentaldate"
                                msg = "Please Input last rental date"
                            />
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
        )
    }
}