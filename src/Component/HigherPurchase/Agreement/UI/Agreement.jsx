import React, {Component} from 'react'
import axios from 'axios'
import $ from 'jquery'
import generateUniqueId from 'generate-unique-id'
import {ToastsContainer, ToastsStore, ToastsContainerPosition} from 'react-toasts';
import 'simplebar'; // or "import SimpleBar from 'simplebar';" if you want to use it manually.
import 'simplebar/dist/simplebar.css';
import { MDBNavLink } from "mdbreact";

function loadData(data){
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

export default class Agreement extends Component{

    constructor(props){
        super(props)
    }

    setAgreement(data){
        console.log(data)
        this.setState({
          agreementData: data
        })
    }
    

    componentDidMount(){
        var id = generateUniqueId({
            length: 10,
            useLetters: false,
            useNumbers: true
          });
          $('#agreeid').text(id);
          localStorage.setItem('agreeid', id);
          localStorage.setItem('agreement', null);
    }

    getAgreement(){
        localStorage.setItem('agreement', null);
        var agreeNo = $('#inputAgrrNo').val().toUpperCase();
        var path = 'http://localhost:8080/Agreement/getData';

        if(agreeNo.length > 9){
            axios.post(path, {
                data: agreeNo
              })
              .then(function (response) {
                if(response.data.msg){
                    if(response.data.table.rowCount > 1){
                        $('.checkButton').css('display','block')
                    }
                    localStorage.setItem('agreement', JSON.stringify(response.data.table.rows[0]));
                    loadData(response.data.table.rows[0])
                }else{
                    ToastsStore.error("User Data Is Not Found")
                }
              })
              .catch(function (error) {
                ToastsStore.error('Connection Fail')
              });
        }else{
            ToastsStore.warning("Invalid Vehical No or Agreement ID")
        }
        
    }

    render(){
        return(
            <div className="page-content">
                <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.BOTTOM_RIGHT} />
                <div data-simplebar>
                    <div className="col-md-12 col-sm-12 col-xs-12 agreement profile">
                        <form action="#" className="form-horizontal">
                        <div className="form-body pal">
                            <div className="form-group">
                                <div className='row'>
                                <label htmlFor="inputAgrrNo" className="col-xs-3 control-label">
                                    Search :- </label>
                                    <div className="input-icon col-xs-6" style={{display: 'inline-block' }}>
                                        <i className="fa fa-user"></i>
                                        <input id="inputAgrrNo" type="text" placeholder="Search by Agreement No/Vehical No" className="form-control" />
                                    </div>
                                    <div className='col-xs-2'>
                                        <a href="#" className="btn btn-primary xs-5" id="searchBtn" onClick={this.getAgreement.bind(this)}>Search</a>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <div className='col-md-12 col-sm-12 col-xs-12 container' style={{backgroundColor: '#ffffff'}}>
                                <div className="text-center">
                                    <h4 className="text-dark mt-5">{localStorage.getItem('company')} Agreement</h4>
                                </div>
                                <div className="mt-5">
                                <h5 className="text-dark">Agreement Details</h5>
                                    <hr/>
                                    <div className="row ml-5">
                                        <div className="col-md-6 col-sm-7 col-xs-12">
                                            <p>Agreement ID :- <span id="agreeid"></span></p>
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
                            <div class="form-group col-sm-12 col-md-4 col-xs-10 row checkButton">
                                <div class='col-sm-3 col-xs-6'>
                                    <button type="button" class="btn btn-light">Previous</button>
                                </div>
                                <div class='col-sm-3 col-xs-6'>
                                    <button type="button" class="btn btn-primary">Next</button>
                                </div>
                            </div>
                            <div class="form-group col-sm-7 col-md-3 col-xs-7 row rightButton">
                                <div class='col-sm-3 col-xs-6'>
                                    <button type="button" class="btn btn-primary">Edit</button>
                                </div>
                                <div class='col-sm-3 col-xs-6'>
                                    <MDBNavLink to="/agreementPDF" type="button" class="btn btn-success">Generate PDF</MDBNavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}