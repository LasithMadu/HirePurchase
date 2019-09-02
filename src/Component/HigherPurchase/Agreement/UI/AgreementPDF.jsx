import React, { Component } from 'react';
import { PDFExport, savePDF } from '@progress/kendo-react-pdf';
import axios from 'axios'
import $ from 'jquery'
import date from 'date-and-time';
import generateUniqueId from 'generate-unique-id'
import {ToastsContainer, ToastsStore, ToastsContainerPosition} from 'react-toasts';
import 'simplebar'; // or "import SimpleBar from 'simplebar';" if you want to use it manually.
import 'simplebar/dist/simplebar.css';

const now = new Date();

export default class AgreementPDF extends Component {

    state = {
      values: [],
      agreeid: null
    }

    componentDidMount(){
        var id = generateUniqueId({
          length: 10,
          useLetters: false,
          useNumbers: true
        });
        var retrievedObject = JSON.parse(localStorage.getItem('agreement'));
        this.setState({values: retrievedObject, agreeid: id})
        console.log(retrievedObject);
    }

    render(){
      var data = this.state.values;
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
                                            <p>Agreement ID :- <span id="agreeid">{data.length == 0 ? "" : this.state.agreeid}</span></p>
                                        </div>
                                        <div className="col-md-6 col-sm-6 col-xs-12">
                                            <p>Created Date :- <span id="ceated">{date.format(now, 'YYYY/MM/DD')}</span></p>
                                        </div>
                                    </div>
                                    <div className="row ml-5">
                                        <div className="col-md-6 col-sm-6 col-xs-12">
                                            <p>Expire Date :- <span id="expire"></span></p>
                                        </div>
                                        <div className="col-md-6 col-sm-6 col-xs-12">
                                            <p>Version :- <span id="version">{localStorage.getItem('version') == '' ? "" : localStorage.getItem('version')}</span></p>
                                        </div>
                                    </div>
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
        var self = this;
        var path = 'http://localhost:8080/Agreement/saveData';

        axios.post(path, {
            vehiNo: this.state.values.vehiNo,
            created: date.format(now, 'YYYY/MM/DD'),
            agreementData: this.state.values,
            nic: this.state.values.nic,
            agreementNo: this.state.agreeid
          })
          .then(function (response) {
            if(response.data.msg){
                self.pdfExportComponent.save();
                ToastsStore.success("Agreement Data saved")
                console.log(response);
            }
          })
          .catch(function (error) {
            ToastsStore.error('Connection Fail')
          });
    }
}
