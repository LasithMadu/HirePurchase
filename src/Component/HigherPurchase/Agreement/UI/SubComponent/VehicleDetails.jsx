import React, {Component} from 'react'
import axios from 'axios'

import DataRow from '../../../../Main/UI/SingleComponent/DataCell'

export default class CustomerDetails extends Component{

    state = {
        values: [],
        reuslt: true,
        vehicles: []
    }

    componentDidMount(){
        if(this.props.nic === ''){
            alert('choose customer first')
        }else{
            var that = this;
            axios.post('http://localhost:8080/Vehicals/getByNicVehical',{
                nic: this.props.nic
            })
            .then((response) => {
                if(response.data.msg){
                    that.setState({vehicles: response.data.table.rows, loading: false});
                }
                else{
                    console.log("Did");
                }
            })
        }
    }

    searchVehicle(id){
        var data = this.state.vehicles;
        var self = this;
        for(var i=0; i<data.length; i++){
            if (data[i].agreeId == id) {
                axios.post('http://localhost:8080/Vehicals/searchVehical', {
                    data: data[i].vehiNo
                })
                .then(function (response) {
                    if(response.data.msg){
                        self.props.changeVehicle(response.data.table.rows[0])
                        self.setState({values: response.data.table.rows[0], reuslt: false})
                    }else{
                        
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            }
          }
        
    }

    render(){
        var data = this.state.values;
        var vehicles = this.state.vehicles;
        return(
            <div className="bodyLogo">
                <div className="container">
                    <div className="row ml-5">
                        {
                            this.state.reuslt ? 
                            (<div>
                                <table className="table">
                                    <thead className="thead-light">
                                        <tr>
                                        <th scope="col" class="th-sm">Customer Name</th>
                                        <th scope="col" class="th-sm">Vehical No</th>
                                        <th scope="col" class="th-sm">Chassis No</th>
                                        <th scope="col" class="th-sm">Cylinder Capcity</th>
                                        <th scope="col" class="th-sm">Modal</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {vehicles.map(vehicle =><tr scope="row" key={vehicle.agreeId} onClick={()=>this.searchVehicle(vehicle.agreeId)}>
                                            <td>{vehicle.nameInitials}</td>
                                            <td>{vehicle.vehiNo}</td>
                                            <td>{vehicle.chassis}</td>
                                            <td>{vehicle.capacity}</td>
                                            <td>{vehicle.make+' '+vehicle.modal}</td>
                                        </tr>
                                        )}
                                    </tbody>
                                </table>
                                </div>) : 
                                (<div>
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
                            </div>)
                        }
                    </div>
                </div>
            </div>
        )
    }
}