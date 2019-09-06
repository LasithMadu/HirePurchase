import React, {Component} from 'react'

export default class CustomerDetails extends Component{

    state = {
        values: []
    }

    render(){
        var data = this.state.values;
        return(
            <div className="bodyLogo">
                <div className="container">
                    <h5 className="text-dark">Payment Details</h5>
                    <hr/>
                    <form className='col-sm-12 col-md-9'>
                    
                        <div class="form-row">
                            <div class="form-group col-sm-6">
                            <label for="paymentid">Payment ID</label>
                            <input type="text" disabled class="form-control" id="paymentid" placeholder="Registration No"/>
                            </div>
                            <div class="form-group col-sm-5">
                            <label for="inputDate">Date</label>
                            <input type="text" disabled class="form-control" id="inputDate" placeholder="Chassis No"/>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-sm-6">
                            <label for="inputType">Type</label>
                            <input type="text" class="form-control" id="inputType" placeholder="Type"/>
                            </div>
                            <div class="form-group col-sm-5">
                            <label for="inputCapital">Capital</label>
                            <input type="text" class="form-control" id="inputCapital" placeholder="Capital"/>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-sm-6">
                            <label for="inputIntrest">Intrest</label>
                            <input type="text" class="form-control" id="inputIntrest" placeholder='Intrest'/>
                            </div>
                            <div class="form-group col-sm-5">
                            <label for="inputOther">Other</label>
                            <input type="text" class="form-control" id="inputOther" placeholder='Other'/>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-sm-6">
                                <label for="inputPanelty">Panelty</label>
                                <input type="text" class="form-control" id="inputPanelty" placeholder="Panelty"/>
                            </div>
                            <div class="form-group col-sm-6">
                                
                            </div>
                        </div>
                        
                    </form>
                </div>
            </div>
        )
    }
}