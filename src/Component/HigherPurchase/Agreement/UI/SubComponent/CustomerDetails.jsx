import React, {Component} from 'react'
import axios from 'axios'
import $ from 'jquery'

import Search from '../../../../Main/UI/SingleComponent/Search'
import DataRow from '../../../../Main/UI/SingleComponent/DataCell'

export default class CustomerDetails extends Component{

    searchCustomer(){
        var self = this;
        axios.post('http://localhost:8080/Customer/searchCutomer', {
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
                            handleChange = {this.searchCustomer.bind(this)}
                        />
                    </div>
                    
                    <hr/>
                    <div className="row ml-5">
                        <div className="col-lg-6 col-ms-6 col-sm-6 col-xs-12">
                            <table className="proTable">
                                <tbody>
                                <DataRow 
                                    icon = "fa fa-user"
                                    label = "Name"
                                    value = {data.length == 0 ? "Not Specified" : data.nameInitials}
                                />
                                <DataRow 
                                    icon = "fa fa-envelope"
                                    label = "Address"
                                    value = {data.length == 0 ? "Not Specified" : data.address+" "+data.address_2}
                                />
                                <DataRow 
                                    icon = "fa fa-map-marker"
                                    label = "City"
                                    value = {data.length == 0 ? "Not Specified" : data.city}
                                />
                                <DataRow 
                                    icon = "fa address-card"
                                    label = "Country"
                                    value = {data.length == 0 ? "Not Specified" : data.country}
                                />
                                <DataRow 
                                    icon = "fa fa-unlock"
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
                                    icon = "fa fa-user"
                                    label = "NIC"
                                    value = {data.length == 0 ? "Not Specified" : data.nic}
                                />
                                <DataRow 
                                    icon = "fa fa-envelope"
                                    label = "Occupation"
                                    value = {data.length == 0 ? "Not Specified" : data.occupation}
                                />
                                <DataRow 
                                    icon = "fa fa-map-marker"
                                    label = "State"
                                    value = {data.length == 0 ? "Not Specified" : data.state}
                                />
                                <DataRow 
                                    icon = "fa address-card"
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