import React, {Component} from 'react';
import $ from 'jquery'
import uuidv4 from 'uuid/v4'
import axios from 'axios'
import date from 'date-and-time';
import {ToastsStore} from 'react-toasts';

import DataRow from '../../../../../Main/UI/SingleComponent/DataCell'
import Search from '../../../../../Main/UI/SingleComponent/Search'
import Input from '../../../../../Main/UI/SingleComponent/InputField'
import Separation from '../../../../../Main/UI/SingleComponent/Separation'

import nameIcon from '../../../../../../Assests/images/gjoiconset/name.png'
import nicIcon from '../../../../../../Assests/images/gjoiconset/NIC.png'
import vehiIcon from '../../../../../../Assests/images/gjoiconset/Vehiclw NO.2.png'
import capitalIcon from '../../../../../../Assests/images/gjoiconset/Capital amount.png'
import statusIcon from '../../../../../../Assests/images/gjoiconset/status.png'
import expireIcon from '../../../../../../Assests/images/gjoiconset/Expire in.png'
import haveIcon from '../../../../../../Assests/images/gjoiconset/have to pay.png'
import dateIcon from '../../../../../../Assests/images/gjoiconset/Year.png'

const now = new Date();

export default class VehicalAdd extends Component{

    state = {
        values: []
    }

    componentDidMount(){
          $('#paymentid').val(uuidv4());
          $('#inputDate').val();
        axios.get(sessionStorage.getItem('url')+"/Payment/getPaymentTypes")
        .then(function (response) {
            if(response.data.msg){
                console.log(response.data.values)
                $(function () { 
                    var pymentType = $("#Inputtype");
                    for(var i=0; i<response.data.values.length; i++){
                        pymentType.append("<option value="+response.data.values[i]+">" + response.data.values[i] + "</option>");
                    }
                });
            }
        })
        .catch(function (error) {
            console.log(error)
        });

    }

    searchCustomer(e){      
        e.preventDefault();
        var self = this;
        var agreeid = $('#inputSeNic').val();
        
        if(agreeid.length > 5){
            var path = sessionStorage.getItem('url')+'/Agreement/getAgreeData';

            axios.post(path, {
                data: agreeid
            })
            .then(function (response) {
            if(response.data.msg){
                self.setState({values: response.data.table.rows[0]})
            }else{
                if(response.data.alert === 'fail'){
                }else{
                }
            }
            })
            .catch(function (error) {
            console.log(error)
            });
        }
    }

    getValue(){
        
    }
    
    saveVehicals(){
        var valid, cus = true;
        var customer = [$('#inputSeNic').val().toUpperCase(), $('#user').text(), $('#email').text(), $('#address').text(), $('#gender').text(), $('#mobile').text()];

        for(var i=0; i<customer.length; i++){
            if(customer[i] === ''){
                cus = false;
                ToastsStore.error("Customer Details Not Filed")
            }
        }

        var vehicals = [uuidv4(), $('#inputRegistration').val().toUpperCase(), $('#inputCassis').val(), $('#inputEngine').val(), $('#inputCapacity').val(), $('#inputMake').val(), $('#inputModal').val(), $('#inputFuel').val(), $('#inputYear').val()];

        for(i=0; i<vehicals.length; i++){
            if(vehicals[i] === ''){
                valid = false
            }else{
                valid = true
            }
        }

        if($('#inputRegistration').val().length < 10){
            ToastsStore.warning("Vehical Number Is Invalid. Put Like This.\n Ex :- WP VS-1439")
        }else if(!cus){
            ToastsStore.error("Customer Details Not Filed")
        }else if(!valid){
            ToastsStore.warning("Some Fields Are Empty")
        }else{
            var path = sessionStorage.getItem('url') +'Vehicals/saveVehicals';

            axios.post(path, {
                nic: $('#inputSeNic').val(),
                vehiData: vehicals
              })
              .then(function (response) {
                if(response.data.msg){
                    ToastsStore.success("Sucessfuly Vehical Register")
                }else{
                    ToastsStore.error("Vehical Registeration Fail")
                }
              })
              .catch(function (error) {
                console.log(error)
              });
        }
    }

    render(){
        var data = this.state.values;

        const agreeTable = (
            <div style={{marginTop: '10px'}}>
                <Search
                    id = "inputSeNic"
                    label = ""
                    icon = "fa fa-user"
                    placeholder = "Agreement No"
                    msg = "Please Input agreement no"
                    handleChange = {this.searchCustomer.bind(this)}
                />
                <div >
                    <table className="proTable">
                        <tbody>
                        <DataRow 
                            icon = {nameIcon}
                            label = "Name"
                            value = {data.length === 0 ? "Not Specified" : data.name}
                        />
                        <DataRow 
                            icon = {nicIcon}
                            label = "NIC"
                            value = {data.length === 0 ? "Not Specified" : data.nic}
                        />
                        <DataRow 
                            icon = {vehiIcon}
                            label = "Vehicle No"
                            value = {data.length === 0 ? "Not Specified" : data.vehiNo}
                        />
                        <DataRow 
                            icon = {capitalIcon}
                            label = "Capital Amount"
                            value = {data.length === 0 ? "Not Specified" : data.capital}
                        />
                        <DataRow 
                            icon = {statusIcon}
                            label = "Status"
                            value = {data.length === 0 ? "Not Specified" : <span className="label label-success">Active</span>}
                        />
                        </tbody>
                    </table>
                </div>
            </div>
        )

        const paymentDetails = (
            <div>
                <div className="row">
                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                        <table className="proTable">
                            <tbody>
                            <DataRow 
                                icon = {dateIcon}
                                label = "Date"
                                value = {data.length === 0 ? "Not Specified" : date.format(now, 'YYYY/MM/DD')}
                            />
                            </tbody>
                        </table>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                        <table className="proTable">
                            <tbody>
                            <DataRow 
                                icon = {capitalIcon}
                                label = "Capital Amount"
                                value = {data.length === 0 ? "Not Specified" : data.capital}
                            />
                            </tbody>
                        </table>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                        <table className="proTable">
                            <tbody>
                            <DataRow 
                                icon = {haveIcon}
                                label = "Have to pay"
                                value = {data.length === 0 ? "Not Specified" : data.nameInitials}
                            />
                            </tbody>
                        </table>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                        <table className="proTable">
                            <tbody>
                            <DataRow 
                                icon = {expireIcon}
                                label = "Expire in"
                                value = {data.length === 0 ? "Not Specified" : data.nameInitials}
                            />
                            </tbody>
                        </table>
                    </div>
                </div>
            <form className='col-sm-12 col-md-12'>

                <div class="form-row">
                    <div class="form-group col-sm-12">
                        <label for="Inputtype">Payment Type</label>
                        <select class="form-control" id="Inputtype" style={{border: '1px solid #000000'}}>
                            
                        </select>
                    </div>
                </div>
                <div class="form-row">
                    <Input
                        size = {[12, 12, 12, 12]}
                        id = "inputAmount"
                        label = "Amount"
                        placeholder = "Amount"
                        msg = "Please Input amount"
                        handleChange = {this.getValue.bind(this)}
                    />
                </div>
                <div class="form-group col-sm-6 row">
                    <div class='col-xs-6 col-md-3'>
                        <button type="button" class="btn btn-primary" onClick={this.saveVehicals}>Save</button>
                    </div>
                    <div class='col-xs-6 col-md-3'>
                        <button type="button" class="btn btn-light">Cancel</button>
                    </div>
                </div>
                
            </form>
        </div>
        )

        return(
            <div className="col-lg-12">
                <div className="row">
                    <div className="col-md-11">
                        <div className="row mtl">
                            <div className='col-md-12 col-sm-7'>
                                <Separation 
                                    size = {[3, 3, 3, 12]}
                                    title = "AGREEMENT"
                                    component = {agreeTable}
                                />
                                <div className="col-md-9 col-sm-9 col-lg-9 col-xs-12">
                                    <Separation 
                                        size = {[12, 12, 12, 12]}
                                        title = "Payment"
                                        component = {paymentDetails}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}