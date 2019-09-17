import React, {Component} from 'react'
import axios from 'axios'
import $ from 'jquery'

import Search from '../../../../Main/UI/SingleComponent/Search'
import DataRow from '../../../../Main/UI/SingleComponent/DataCell'

import nameIcon from '../../../../../Assests/images/gjoiconset/name.png'
import emailIcon from '../../../../../Assests/images/gjoiconset/email.png'
import addressIcon from '../../../../../Assests/images/gjoiconset/address.png'
import nicIcon from '../../../../../Assests/images/gjoiconset/NIC.png'
import statusIcon from '../../../../../Assests/images/gjoiconset/state.png'
import countryIcon from '../../../../../Assests/images/gjoiconset/country.png'
import mobileIcon from '../../../../../Assests/images/gjoiconset/mobile.png'
import cityIcon from '../../../../../Assests/images/gjoiconset/city.png'
import occupationIcon from '../../../../../Assests/images/gjoiconset/Occupation.png'

export default class CustomerDetails extends Component{

    searchCustomer(event){
        event.preventDefault();
        var self = this;
        axios.post('https://hire-purchase-server.herokuapp.com/Customer/searchCutomer', {
            data: $('#cusNic').val().toUpperCase()
        })
        .then(function (response) {
            if(response.data.msg){
                self.props.changeCustomer(response.data.table.rows[0])
                self.props.setNic($('#cusNic').val().toUpperCase());
                self.setState({values: response.data.table.rows[0]})          
            }else{
                
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    state = {
        values: []
    }

    render(){
        var data = this.state.values;        
        return(
            <div className="bodyLogo">
                <div className="container">
                    <div className="col-lg-11 col-md-11 col-sm-11 col-xs-12">
                        <Search
                            id = "cusNic"
                            icon = "fa fa-user"
                            placeholder = "Search by NIC/Passport No"
                            btnId = "searchBtn"
                            msg = "Please input nic or passport no"
                            handleChange = {this.searchCustomer.bind(this)}
                        />
                    </div>
                    
                    <hr/>
                    <div className="row ml-5">
                        <div className="col-lg-6 col-ms-6 col-sm-6 col-xs-12">
                            <table className="proTable">
                                <tbody>
                                <DataRow 
                                    icon = {nameIcon}
                                    label = "Name"
                                    value = {data.length == 0 ? "Not Specified" : data.nameInitials}
                                />
                                <DataRow 
                                    icon = {addressIcon}
                                    label = "Address"
                                    value = {data.length == 0 ? "Not Specified" : data.address+" "+data.address_2}
                                />
                                <DataRow 
                                    icon = {cityIcon}
                                    label = "City"
                                    value = {data.length == 0 ? "Not Specified" : data.city}
                                />
                                <DataRow 
                                    icon = {countryIcon}
                                    label = "Country"
                                    value = {data.length == 0 ? "Not Specified" : data.country}
                                />
                                <DataRow 
                                    icon = {mobileIcon}
                                    label = "Mobile"
                                    value = {data.length == 0 ? "Not Specified" : data.mobile}
                                />
                                </tbody>
                            </table>
                        </div>
                        <div className="col-lg-6 col-ms-6 col-sm-6 col-xs-12">
                            <table className="proTable">
                                <tbody>
                                <DataRow 
                                    icon = {nicIcon}
                                    label = "NIC"
                                    value = {data.length == 0 ? "Not Specified" : data.nic}
                                />
                                <DataRow 
                                    icon = {occupationIcon}
                                    label = "Occupation"
                                    value = {data.length == 0 ? "Not Specified" : data.occupation}
                                />
                                <DataRow 
                                    icon = {statusIcon}
                                    label = "State"
                                    value = {data.length == 0 ? "Not Specified" : data.state}
                                />
                                <DataRow 
                                    icon = {emailIcon}
                                    label = "Email"
                                    value = {data.length == 0 ? "Not Specified" : data.email}
                                />
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}