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
                                    <div className='col-md-12 col-sm-12 col-xs-12 container' style={{ float: 'center', backgroundColor: '#F2F4F4', paddingTop: '20px'}}>
                                        <div className="text-center">
                                            <h2 className="text-dark mt-5 agreeCompany">{sessionStorage.getItem('company')}</h2>
                                        </div>
                                        <div className="mt-5">
                                            <div className="text-center agreeTitle">
                                                <h4 className="text-dark titleText">Agreement Details</h4>
                                            </div>
                                            <div className="sepSection">
                                                <table className="agreeValue">
                                                    <tr>
                                                        <td className="subAgree">
                                                            <h4 className="titleCell">Agreement ID :</h4>
                                                        </td>
                                                        <td className="subAgree ">
                                                            <h5 className="valueCell">{data.length === 0 ? "" : data.agreeId}</h5>
                                                        </td>
                                                        <td className="subAgree">
                                                            <h4 className="titleCell">Created Date :</h4>
                                                        </td>
                                                        <td className="subAgree">
                                                            <h5 className="valueCell">{data.length === 0 ? "" : data.created}</h5>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="subAgree">
                                                            <h4 className="titleCell">Expire Date :</h4>
                                                        </td>
                                                        <td>
                                                            <h5 className="valueCell">{data.length === 0 ? "" : data.last_rental}</h5>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </div>

                                            <div className="text-center agreeTitle">
                                                <h4 className="text-dark titleText">Customer Details</h4>
                                            </div>
                                            <div className="sepSection">
                                                <table className="agreeValue">
                                                    <tr>
                                                        <td className="subAgree">
                                                            <h4 className="titleCell">Name :</h4>
                                                        </td>
                                                        <td className="subAgree ">
                                                            <h5 className="valueCell">{data.length === 0 ? "" : data.name}</h5>
                                                        </td>
                                                        <td className="subAgree">
                                                            <h4 className="titleCell">NIC :</h4>
                                                        </td>
                                                        <td className="subAgree">
                                                            <h5 className="valueCell">{data.length === 0 ? "" : data.nic}</h5>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="subAgree">
                                                            <h4 className="titleCell">Address :</h4>
                                                        </td>
                                                        <td>
                                                            <h5 className="valueCell">{data.length === 0 ? "" : data.address}</h5>
                                                        </td>
                                                        <td className="subAgree">
                                                            <h4 className="titleCell">Occupation :</h4>
                                                        </td>
                                                        <td>
                                                            <h5 className="valueCell">{data.length === 0 ? "" : data.occupation}</h5>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="subAgree">
                                                            <h4 className="titleCell">City :</h4>
                                                        </td>
                                                        <td>
                                                            <h5 className="valueCell">{data.length === 0 ? "" : data.city}</h5>
                                                        </td>
                                                        <td className="subAgree">
                                                            <h4 className="titleCell">State :</h4>
                                                        </td>
                                                        <td>
                                                            <h5 className="valueCell">{data.length === 0 ? "" : data.state}</h5>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="subAgree">
                                                            <h4 className="titleCell">Country :</h4>
                                                        </td>
                                                        <td>
                                                            <h5 className="valueCell">{data.length === 0 ? "" : data.country}</h5>
                                                        </td>
                                                        <td className="subAgree">
                                                            <h4 className="titleCell">Email :</h4>
                                                        </td>
                                                        <td>
                                                            <h5 className="valueCell">{data.length === 0 ? "" : data.email}</h5>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="subAgree">
                                                            <h4 className="titleCell">Phone :</h4>
                                                        </td>
                                                        <td>
                                                            <h5 className="valueCell">{data.length === 0 ? "" : data.mobile}</h5>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </div>

                                            <div className="text-center agreeTitle">
                                                <h4 className="text-dark titleText">Vehical Details</h4>
                                            </div>
                                            <div className="sepSection">
                                                <table className="agreeValue">
                                                    <tr>
                                                        <td className="subAgree">
                                                            <h4 className="titleCell">Vehical No :</h4>
                                                        </td>
                                                        <td className="subAgree ">
                                                            <h5 className="valueCell">{data.length === 0 ? "" : data.vehiNo}</h5>
                                                        </td>
                                                        <td className="subAgree">
                                                            <h4 className="titleCell">Cassis No :</h4>
                                                        </td>
                                                        <td className="subAgree">
                                                            <h5 className="valueCell">{data.length === 0 ? "" : data.chassis}</h5>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="subAgree">
                                                            <h4 className="titleCell">Engine No :</h4>
                                                        </td>
                                                        <td>
                                                            <h5 className="valueCell">{data.length === 0 ? "" : data.engineNo}</h5>
                                                        </td>
                                                        <td className="subAgree">
                                                            <h4 className="titleCell">Capacity :</h4>
                                                        </td>
                                                        <td>
                                                            <h5 className="valueCell">{data.length === 0 ? "" : data.capacity}</h5>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="subAgree">
                                                            <h4 className="titleCell">Modal :</h4>
                                                        </td>
                                                        <td>
                                                            <h5 className="valueCell">{data.length === 0 ? "" : data.modal}</h5>
                                                        </td>
                                                        <td className="subAgree">
                                                            <h4 className="titleCell">Fuel type :</h4>
                                                        </td>
                                                        <td>
                                                            <h5 className="valueCell">{data.length === 0 ? "" : data.fuel}</h5>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="subAgree">
                                                            <h4 className="titleCell">Year :</h4>
                                                        </td>
                                                        <td>
                                                            <h5 className="valueCell">{data.length === 0 ? "" : data.year}</h5>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </div>

                                            <div className="text-center agreeTitle">
                                                <h4 className="text-dark titleText">Payment Details</h4>
                                            </div>
                                            <div className="sepSection">
                                                <table className="agreeValue">
                                                    <tr>
                                                        <td className="subAgree">
                                                            <h4 className="titleCell">Capital :</h4>
                                                        </td>
                                                        <td className="subAgree ">
                                                            <h5 className="valueCell">{data.length === 0 ? "" : data.capital}</h5>
                                                        </td>
                                                        <td className="subAgree">
                                                            <h4 className="titleCell">Period :</h4>
                                                        </td>
                                                        <td className="subAgree">
                                                            <h5 className="valueCell">{data.length === 0 ? "" : data.period}</h5>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="subAgree">
                                                            <h4 className="titleCell">Intrest :</h4>
                                                        </td>
                                                        <td>
                                                            <h5 className="valueCell">{data.length === 0 ? "" : data.intrest}</h5>
                                                        </td>
                                                        <td className="subAgree">
                                                            <h4 className="titleCell">Repayment Period :</h4>
                                                        </td>
                                                        <td>
                                                            <h5 className="valueCell">{data.length === 0 ? "" : data.repayment}</h5>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="subAgree">
                                                            <h4 className="titleCell">First Rental :</h4>
                                                        </td>
                                                        <td>
                                                            <h5 className="valueCell">{data.length === 0 ? "" : data.first_rental}</h5>
                                                        </td>
                                                        <td className="subAgree">
                                                            <h4 className="titleCell">Last Rental :</h4>
                                                        </td>
                                                        <td>
                                                            <h5 className="valueCell">{data.length === 0 ? "" : data.last_rental}</h5>
                                                        </td>
                                                    </tr>
                                                </table>
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
