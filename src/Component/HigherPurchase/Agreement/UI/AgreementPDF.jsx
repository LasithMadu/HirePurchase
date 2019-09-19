import React, { Component } from 'react';
import { PDFExport } from '@progress/kendo-react-pdf';
import axios from 'axios'

export default class AgreementPDF extends Component {

    state = {
      values: [],
      agreeid: null,
      loading: true
    }

    componentDidMount(){
        var self = this;
        axios.post(sessionStorage.getItem('url')+'/Agreement/getData', {
            data: sessionStorage.getItem('agreeId')
        })
        .then(function (response) {
            if(response.data.msg){
                self.setState({loading: false, values: response.data.table.rows[0]})
            }else{
                console.log("PDF Error");
            }
        })
        .catch(function (error) {
        });
        
    }

    printHandler(){
        window.print();
    }

    render(){
      var data = this.state.values;
        return(
            <div className="col-md-12 col-sm-12 col-xs-12">
                <div className="col-md-12 col-sm-12 col-xs-12 pdf">
                    {
                        this.state.loading ?
                        (<h2>Loading</h2>) :
                        (
                            <div>
                            <PDFExport ref={(component) => this.pdfExportComponent = component} paperSize="A4">
                            <div className="col-md-11 col-sm-11 col-xs-11" style={{marginLeft: '4%', marginTop: '2%'}}>
                                <div className='col-md-12 col-sm-12 col-xs-12 container' style={{backgroundColor: '#ffffff', float: 'center'}}>
                                        <div className="text-center">
                                            <h4 className="text-dark mt-5">{sessionStorage.getItem('company')} Agreement</h4>
                                        </div>
                                        <div className="mt-5">
                                        <h5 className="text-dark">Agreement Details</h5>
                                            <hr/>
                                            <div className="row ml-5">
                                                <div className="col-md-6 col-sm-7 col-xs-12">
                                                    <p>Agreement ID :- <span id="agreeid">{data.length === 0 ? "" : data.agreeId}</span></p>
                                                </div>
                                                <div className="col-md-6 col-sm-6 col-xs-12">
                                                    <p>Created Date :- <span id="ceated">{data.length === 0 ? "" : data.created}</span></p>
                                                </div>
                                            </div>
                                            <div className="row ml-5">
                                                <div className="col-md-6 col-sm-6 col-xs-12">
                                                    <p>Expire Date :- <span id="expire">{data.length === 0 ? "" : data.last_rental}</span></p>
                                                </div>
                                            </div>
                                            <h5 className="text-dark">Customer Details</h5>
                                            <hr/>
                                            <div className="row ml-5">
                                                <div className="col-md-6 col-sm-7 col-xs-12">
                                                    <p>Name :- <span id="name">{data.length === 0 ? "" : data.name}</span></p>
                                                </div>
                                                <div className="col-md-6 col-sm-6 col-xs-12">
                                                    <p>NIC :- <span id="nic">{data.length === 0 ? "" : data.nic}</span></p>
                                                </div>
                                            </div>
                                            <div className="row ml-5">
                                                <div className="col-md-6 col-sm-6 col-xs-12">
                                                    <p>Address :- <span id="address">{data.length === 0 ? "" : data.address+" "+data.address_2}</span></p>
                                                </div>
                                                <div className="col-md-6 col-sm-6 col-xs-12">
                                                    <p>Occupation :- <span id="occ">{data.length === 0 ? "" : data.occupation}</span></p>
                                                </div>
                                            </div>
                                            <div className="row ml-5">
                                                <div className="col-md-6 col-sm-6 col-xs-12">
                                                    <p>City :- <span id="city">{data.length === 0 ? "" : data.city}</span></p>
                                                </div>
                                                <div className="col-md-6 col-sm-6 col-xs-12">
                                                    <p>State :- <span id="state">{data.length === 0 ? "" : data.state}</span></p>
                                                </div>
                                            </div>
                                            <div className="row ml-5">
                                                <div className="col-md-6 col-sm-6 col-xs-12">
                                                    <p>Country :- <span id="country">{data.length === 0 ? "" : data.country}</span></p>
                                                </div>
                                                <div className="col-md-6 col-sm-6 col-xs-12">
                                                    <p>Email :- <span id="email">{data.length === 0 ? "" : data.email}</span></p>
                                                </div>
                                            </div>
                                            <div className="row ml-5">
                                                <div className="col-md-6 col-sm-6 col-xs-12">
                                                    <p>Mobile :- <span id="mobile">{data.length === 0 ? "" : data.mobile}</span></p>
                                                </div>
                                            </div>
                                            <h5 className="text-dark">Vehical Details</h5>
                                            <hr/>
                                            <div className="row ml-5">
                                                <div className="col-md-6 col-sm-7 col-xs-12">
                                                    <p>Vehical No :- <span id="vahical">{data.length === 0 ? "" : data.vehiNo}</span></p>
                                                </div>
                                                <div className="col-md-6 col-sm-6 col-xs-12">
                                                    <p>Cassis No :- <span id="cassis">{data.length === 0 ? "" : data.chassis}</span></p>
                                                </div>
                                            </div>
                                            <div className="row ml-5">
                                                <div className="col-md-6 col-sm-6 col-xs-12">
                                                    <p>Engine No :- <span id="engine">{data.length === 0 ? "" : data.engineNo}</span></p>
                                                </div>
                                                <div className="col-md-6 col-sm-6 col-xs-12">
                                                    <p>Capacity :- <span id="capacity">{data.length === 0 ? "" : data.capacity}</span></p>
                                                </div>
                                            </div>
                                            <div className="row ml-5">
                                                <div className="col-md-6 col-sm-6 col-xs-12">
                                                    <p>Modal :- <span id="modal">{data.length === 0 ? "" : data.modal}</span></p>
                                                </div>
                                                <div className="col-md-6 col-sm-6 col-xs-12">
                                                    <p>Feul type :- <span id="feul">{data.length === 0 ? "" : data.fuel}</span></p>
                                                </div>
                                            </div>
                                            <div className="row ml-5">
                                                <div className="col-md-6 col-sm-6 col-xs-12">
                                                    <p>Year :- <span id="year">{data.length === 0 ? "" : data.year}</span></p>
                                                </div>
                                            </div>
                                            <h5 className="text-dark">Payment Details</h5>
                                            <hr/>
                                            <div className="row ml-5">
                                                <div className="col-md-6 col-sm-7 col-xs-12">
                                                    <p>Capital :- <span id="year">{data.length === 0 ? "" : data.capital}</span></p>
                                                </div>
                                                <div className="col-md-6 col-sm-6 col-xs-12">
                                                    <p>Period :- <span id="year">{data.length === 0 ? "" : data.period}</span></p>
                                                </div>
                                            </div>
                                            <div className="row ml-5">
                                                <div className="col-md-6 col-sm-6 col-xs-12">
                                                    <p>Intrest :- <span id="year">{data.length === 0 ? "" : data.intrest}</span></p>
                                                </div>
                                                <div className="col-md-6 col-sm-6 col-xs-12">
                                                    <p>Repayment Period :- <span id="year">{data.length === 0 ? "" : data.repayment}</span></p>
                                                </div>
                                            </div>
                                            <div className="row ml-5">
                                                <div className="col-md-6 col-sm-6 col-xs-12">
                                                    <p>First Rental :- <span id="year">{data.length === 0 ? "" : data.first_rental}</span></p>
                                                </div>
                                                <div className="col-md-6 col-sm-6 col-xs-12">
                                                    <p>Last Rental :- <span id="year">{data.length === 0 ? "" : data.last_rental}</span></p>
                                                </div>
                                            </div>
                                    </div>
                                    <hr/>
                                </div>
                                </div>
                        </PDFExport>
                        <div className="example-config rightButton" style={{marginRight: '8%'}}>
                            <button className="btn btn-primary" onClick={this.printHandler}>Print</button>
                        </div>
                        </div>
                        )
                    }
                
                        
                    </div>

                </div>
        )
    }
}
