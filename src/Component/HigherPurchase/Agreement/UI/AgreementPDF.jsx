import React, { Component } from 'react';
import { PDFExport, savePDF } from '@progress/kendo-react-pdf';
import axios from 'axios'
import $ from 'jquery'
import date from 'date-and-time';
import {ToastsContainer, ToastsStore, ToastsContainerPosition} from 'react-toasts';
import 'simplebar'; // or "import SimpleBar from 'simplebar';" if you want to use it manually.
import 'simplebar/dist/simplebar.css';

const now = new Date();

function loadData(data){
    $('#ceated').text(date.format(now, 'YYYY/MM/DD'));
    $('#name').text(data.title+" "+data.nameInitials);
    $('#nic').text(data.nic);
    $('#address').text(data.address+" "+data.address_2);
    $('#occ').text(data.occupation);
    $('#city').text(data.city);
    $('#state').text(data.state);
    $('#country').text(data.country);
    $('#email').text(data.email);
    $('#mobile').text(data.mobile);
    $('#vahical').text(data.vehiNo);
    $('#cassis').text(data.chassis);
    $('#engine').text(data.engineNo);
    $('#capacity').text(data.capacity);
    $('#modal').text(data.make+" "+data.modal);
    $('#feul').text(data.fuel);
    $('#year').text(data.year);
}

export default class AgreementPDF extends Component {

    componentDidMount(){
        var retrievedObject = JSON.parse(localStorage.getItem('agreement'));
        loadData(retrievedObject);
    }

    render(){
        return(
            <div className="col-md-12 col-sm-12 col-xs-12" style={{marginTop: '3%', backgroundColor: '#ffffff'}}>
                <div data-simplebar>
                <div className="col-md-12 col-sm-12 col-xs-12 pdf">
                <PDFExport ref={(component) => this.pdfExportComponent = component} paperSize="A4">
                    <div className="col-md-11 col-sm-11 col-xs-11" style={{marginLeft: '4%', marginTop: '2%'}}>
                         <div className='col-md-12 col-sm-12 col-xs-12 container' style={{backgroundColor: '#ffffff', float: 'center'}}>
                                <div className="text-center">
                                    <h4 className="text-dark mt-5">{localStorage.getItem('company')} Agreement</h4>
                                </div>
                                <div className="mt-5">
                                <h5 className="text-dark">Agreement Details</h5>
                                    <hr/>
                                    <div className="row ml-5">
                                        <div className="col-md-6 col-sm-7 col-xs-12">
                                            <p>Agreement ID :- <span id="agreeid">{localStorage.getItem('agreeid')}</span></p>
                                        </div>
                                        <div className="col-md-6 col-sm-6 col-xs-12">
                                            <p>Created Date :- <span id="ceated"></span></p>
                                        </div>
                                    </div>
                                    <div className="row ml-5">
                                        <div className="col-md-6 col-sm-6 col-xs-12">
                                            <p>Expire Date :- <span id="expire"></span></p>
                                        </div>
                                        <div className="col-md-6 col-sm-6 col-xs-12">
                                            <p>Version :- <span id="version"></span></p>
                                        </div>
                                    </div>
                                    <h5 className="text-dark">Customer Details</h5>
                                    <hr/>
                                    <div className="row ml-5">
                                        <div className="col-md-6 col-sm-7 col-xs-12">
                                            <p>Name :- <span id="name"></span></p>
                                        </div>
                                        <div className="col-md-6 col-sm-6 col-xs-12">
                                            <p>NIC :- <span id="nic"></span></p>
                                        </div>
                                    </div>
                                    <div className="row ml-5">
                                        <div className="col-md-6 col-sm-6 col-xs-12">
                                            <p>Address :- <span id="address"></span></p>
                                        </div>
                                        <div className="col-md-6 col-sm-6 col-xs-12">
                                            <p>Occupation :- <span id="occ"></span></p>
                                        </div>
                                    </div>
                                    <div className="row ml-5">
                                        <div className="col-md-6 col-sm-6 col-xs-12">
                                            <p>City :- <span id="city"></span></p>
                                        </div>
                                        <div className="col-md-6 col-sm-6 col-xs-12">
                                            <p>State :- <span id="state"></span></p>
                                        </div>
                                    </div>
                                    <div className="row ml-5">
                                        <div className="col-md-6 col-sm-6 col-xs-12">
                                            <p>Country :- <span id="country"></span></p>
                                        </div>
                                        <div className="col-md-6 col-sm-6 col-xs-12">
                                            <p>Email :- <span id="email"></span></p>
                                        </div>
                                    </div>
                                    <div className="row ml-5">
                                        <div className="col-md-6 col-sm-6 col-xs-12">
                                            <p>Mobile :- <span id="mobile"></span></p>
                                        </div>
                                    </div>
                                    <h5 className="text-dark">Vehical Details</h5>
                                    <hr/>
                                    <div className="row ml-5">
                                        <div className="col-md-6 col-sm-7 col-xs-12">
                                            <p>Vehical No :- <span id="vahical"></span></p>
                                        </div>
                                        <div className="col-md-6 col-sm-6 col-xs-12">
                                            <p>Cassis No :- <span id="cassis"></span></p>
                                        </div>
                                    </div>
                                    <div className="row ml-5">
                                        <div className="col-md-6 col-sm-6 col-xs-12">
                                            <p>Engine No :- <span id="engine"></span></p>
                                        </div>
                                        <div className="col-md-6 col-sm-6 col-xs-12">
                                            <p>Capacity :- <span id="capacity"></span></p>
                                        </div>
                                    </div>
                                    <div className="row ml-5">
                                        <div className="col-md-6 col-sm-6 col-xs-12">
                                            <p>Modal :- <span id="modal"></span></p>
                                        </div>
                                        <div className="col-md-6 col-sm-6 col-xs-12">
                                            <p>Feul type :- <span id="feul"></span></p>
                                        </div>
                                    </div>
                                    <div className="row ml-5">
                                        <div className="col-md-6 col-sm-6 col-xs-12">
                                            <p>Year :- <span id="year"></span></p>
                                        </div>
                                    </div>
                                    <h5 className="text-dark">Payment Details</h5>
                                    <hr/>
                                    <div className="row ml-5">
                                        <div className="col-md-6 col-sm-7 col-xs-12">
                                            <p>Capital :- </p>
                                        </div>
                                        <div className="col-md-6 col-sm-6 col-xs-12">
                                            <p>Paid :- </p>
                                        </div>
                                    </div>
                                    <div className="row ml-5">
                                        <div className="col-md-6 col-sm-6 col-xs-12">
                                            <p>Total Months :- </p>
                                        </div>
                                        <div className="col-md-6 col-sm-6 col-xs-12">
                                            <p>Have to Pay :- </p>
                                        </div>
                                    </div>
                                    <div className="row ml-5">
                                        <div className="col-md-6 col-sm-6 col-xs-12">
                                            <p>Monthly Rental :- </p>
                                        </div>
                                        <div className="col-md-6 col-sm-6 col-xs-12">
                                            <p>Rental Months :- </p>
                                        </div>
                                    </div>
                            </div>
                            <hr/>
                        </div>
                        </div>
                        </PDFExport>
                        <div className="example-config rightButton" style={{marginRight: '8%'}}>
                            <button className="btn btn-primary" onClick={this.exportPDFWithComponent}>Save</button>
                        </div>
                    </div>
                    
                </div>
                
             </div>
        )
    }

    exportPDFWithComponent = () => {
        var retrievedObject = JSON.parse(localStorage.getItem('agreement'));
        var path = 'http://localhost:8080/Agreement/saveData';
        var agreementData = [localStorage.getItem('agreeid'), date.format(now, 'YYYY/MM/DD'), $('#expire').val(), $('#version').val(), retrievedObject.vehiNo];

        axios.post(path, {
            data: agreementData
          })
          .then(function (response) {
            if(response.data.msg){
                this.pdfExportComponent.save();
                ToastsStore.success("Agreement Data saved")
            }
          })
          .catch(function (error) {
            ToastsStore.error('Connection Fail')
          });
    }
}