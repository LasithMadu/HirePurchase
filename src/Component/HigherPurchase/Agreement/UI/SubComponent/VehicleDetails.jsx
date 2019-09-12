import React, {Component} from 'react'
import axios from 'axios'
import $ from 'jquery'

import Search from '../../../../Main/UI/SingleComponent/Search'
import DataRow from '../../../../Main/UI/SingleComponent/DataCell'

export default class CustomerDetails extends Component{

    state = {
        values: []
    }

    searchVehicle(){
        var self = this;
        axios.post('http://localhost:8080/Vehicals/searchVehical', {
            data: $('#vehiNo').val().toUpperCase()
        })
        .then(function (response) {
            if(response.data.msg){
                self.props.changeVehicle(response.data.table.rows[0])
                self.setState({values: response.data.table.rows[0]})
            }else{
                
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    render(){
        var data = this.state.values;
        return(
            <div className="bodyLogo">
                <div className="container">
                    <div className="col-lg-11 col-md-11 col-sm-11 col-xs-12">
                        <Search
                            id = "vehiNo"
                            icon = "fa fa-user"
                            placeholder = "Search by Agreement No/Vehical No"
                            btnId = "searchBtn"
                            handleChange = {this.searchVehicle.bind(this)}
                        />
                    </div>
                    <hr/>
                    <div className="row ml-5">
                        <div className="col-lg-6 col-ms-6 col-sm-6 col-xs-12">
                            <table className="proTable">
                                <tbody>
                                <DataRow 
                                    icon = "fa fa-user"
                                    label = "Vehical No"
                                    value = {data.length == 0 ? "Not Specified" : data.vehiNo}
                                />
                                <DataRow 
                                    icon = "fa fa-envelope"
                                    label = "Engine No"
                                    value = {data.length == 0 ? "Not Specified" : data.engineNo}
                                />
                                <DataRow 
                                    icon = "fa fa-map-marker"
                                    label = "Modal"
                                    value = {data.length == 0 ? "Not Specified" : data.make+" "+data.modal}
                                />
                                <DataRow 
                                    icon = "fa address-card"
                                    label = "Year"
                                    value = {data.length == 0 ? "Not Specified" : data.year}
                                />
                                </tbody>
                            </table>
                        </div>
                        <div className="col-lg-6 col-ms-6 col-sm-6 col-xs-12">
                            <table className="proTable">
                                <tbody>
                                <DataRow 
                                    icon = "fa fa-user"
                                    label = "Cassis No"
                                    value = {data.length == 0 ? "Not Specified" : data.chassis}
                                />
                                <DataRow 
                                    icon = "fa fa-envelope"
                                    label = "Capacity"
                                    value = {data.length == 0 ? "Not Specified" : data.capacity}
                                />
                                <DataRow 
                                    icon = "fa fa-map-marker"
                                    label = "Feul type"
                                    value = {data.length == 0 ? "Not Specified" : data.fuel}
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