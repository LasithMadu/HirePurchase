import React, {Component} from 'react'
import axios from 'axios'
import $ from 'jquery'

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
                    <form action="#" className="form-horizontal">
                        <div className="form-body pal">
                            <div className="form-group">
                                <div className='row'>
                                <label htmlFor="vehiNo" className="col-xs-3 control-label">
                                    Search :- </label>
                                    <div className="input-icon col-xs-6" style={{display: 'inline-block' }}>
                                        <i className="fa fa-user"></i>
                                        <input id="vehiNo" type="text" placeholder="Search by Agreement No/Vehical No" className="form-control" />
                                    </div>
                                    <div className='col-xs-2'>
                                        <a href="#" className="btn btn-primary xs-5" id="searchBtn" onClick={this.searchVehicle.bind(this)}>Search</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    <h5 className="text-dark">Vehical Details</h5>
                    <hr/>
                    <div className="row ml-5">
                        <div className="col-md-6 col-sm-7 col-xs-12">
                            <p>Vehical No :- <span id="vahical">{data.length == 0 ? "" : data.vehiNo}</span></p>
                        </div>
                        <div className="col-md-6 col-sm-6 col-xs-12">
                            <p>Cassis No :- <span id="cassis">{data.length == 0 ? "" : data.chassis}</span></p>
                        </div>
                    </div>
                    <div className="row ml-5">
                        <div className="col-md-6 col-sm-6 col-xs-12">
                            <p>Engine No :- <span id="engine">{data.length == 0 ? "" : data.engineNo}</span></p>
                        </div>
                        <div className="col-md-6 col-sm-6 col-xs-12">
                            <p>Capacity :- <span id="capacity">{data.length == 0 ? "" : data.capacity}</span></p>
                        </div>
                    </div>
                    <div className="row ml-5">
                        <div className="col-md-6 col-sm-6 col-xs-12">
                            <p>Modal :- <span id="modal">{data.length == 0 ? "" : data.make+" "+data.modal}</span></p>
                        </div>
                        <div className="col-md-6 col-sm-6 col-xs-12">
                            <p>Feul type :- <span id="feul">{data.length == 0 ? "" : data.fuel}</span></p>
                        </div>
                    </div>
                    <div className="row ml-5">
                        <div className="col-md-6 col-sm-6 col-xs-12">
                            <p>Year :- <span id="year">{data.length == 0 ? "" : data.year}</span></p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}