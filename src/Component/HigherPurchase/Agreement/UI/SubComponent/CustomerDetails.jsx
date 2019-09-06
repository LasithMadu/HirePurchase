import React, {Component} from 'react'
import axios from 'axios'
import $ from 'jquery'

export default class CustomerDetails extends Component{

    searchCustomer(){
        var self = this;
        axios.post('http://localhost:8080/Customer/searchCutomer', {
            data: $('#cusNic').val().toUpperCase()
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

    state = {
        values: []
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
                                <label htmlFor="cusNic" className="col-xs-3 control-label">
                                    Search :- </label>
                                    <div className="input-icon col-xs-6" style={{display: 'inline-block' }}>
                                        <i className="fa fa-user"></i>
                                        <input id="cusNic" type="text" placeholder="Search by NIC/Passport No" className="form-control" />
                                    </div>
                                    <div className='col-xs-2'>
                                        <a href="#" className="btn btn-primary xs-5" id="searchBtn" onClick={this.searchCustomer.bind(this)}>Search</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    <h5 className="text-dark">Customer Details</h5>
                        <hr/>
                        <div className="row ml-5">
                            <div className="col-md-6 col-sm-7 col-xs-12">
                                <p>Name :- <span id="name">{data.length == 0 ? "" : data.title+" "+data.nameInitials}</span></p>
                            </div>
                            <div className="col-md-6 col-sm-6 col-xs-12">
                                <p>NIC :- <span id="nic">{data.length == 0 ? "" : data.nic}</span></p>
                            </div>
                        </div>
                        <div className="row ml-5">
                            <div className="col-md-6 col-sm-6 col-xs-12">
                                <p>Address :- <span id="address">{data.length == 0 ? "" : data.address+" "+data.address_2}</span></p>
                            </div>
                            <div className="col-md-6 col-sm-6 col-xs-12">
                                <p>Occupation :- <span id="occ">{data.length == 0 ? "" : data.occupation}</span></p>
                            </div>
                        </div>
                        <div className="row ml-5">
                            <div className="col-md-6 col-sm-6 col-xs-12">
                                <p>City :- <span id="city">{data.length == 0 ? "" : data.city}</span></p>
                            </div>
                            <div className="col-md-6 col-sm-6 col-xs-12">
                                <p>State :- <span id="state">{data.length == 0 ? "" : data.state}</span></p>
                            </div>
                        </div>
                        <div className="row ml-5">
                            <div className="col-md-6 col-sm-6 col-xs-12">
                                <p>Country :- <span id="country">{data.length == 0 ? "" : data.country}</span></p>
                            </div>
                            <div className="col-md-6 col-sm-6 col-xs-12">
                                <p>Email :- <span id="email">{data.length == 0 ? "" : data.email}</span></p>
                            </div>
                        </div>
                        <div className="row ml-5">
                            <div className="col-md-6 col-sm-6 col-xs-12">
                                <p>Mobile :- <span id="mobile">{data.length == 0 ? "" : data.mobile}</span></p>
                            </div>
                        </div>
                </div>
            </div>
        )
    }
}