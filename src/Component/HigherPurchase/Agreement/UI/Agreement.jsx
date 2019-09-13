import React, {Component} from 'react'
import axios from 'axios'

import CustomerDetails from './SubComponent/CustomerDetails'
import VehicleDetails from './SubComponent/VehicleDetails'
import Payment from './SubComponent/Payment'
import OtherDetails from './SubComponent/OtherDetails'

export default class Agreement extends Component{

    constructor(props){
        super(props)
        this.state = {
          values: [],
          isSearch: false,
          saveIcon: [false, false, false, false],
          expArr: [false, false, false, false],
          agreeId : 'i360-1',
          cusDetails: null,
          vehiDetails: null,
          payDetails: null,
          otherDetails: null,
          nic: ''
        }

        this.changeCustomer = this.changeCustomer.bind(this);
        this.changeVehicle = this.changeVehicle.bind(this);
        this.changePayment = this.changePayment.bind(this);
        this.changeOther = this.changeOther.bind(this);
        this.setNic = this.setNic.bind(this);
    }

    setNic(nic){
        this.setState({nic: nic})
    }

    changeCustomer(value){
        this.setState({cusDetails: [value.title+" "+value.nameInitials, value.nic, value.address+" "+value.address_2, value.occupation, value.city, value.state, value.country, value.email, value.mobile]})
    }

    changeVehicle(value){
        this.setState({vehiDetails: [value.vehiNo, value.chassis, value.engineNo, value.capacity, value.make+" "+value.modal, value.fuel, value.year]})
    }

    changePayment(value){
        this.setState({payDetails: value})
    }

    changeOther(value){
        console.log(value);
        this.setState({otherDetails: value})
    }

    componentDidMount(){
        var self = this;
        axios.get('http://localhost:8080/Agreement/getPayement')
        .then(function (response) {
            if(response.data.msg){
                self.setState({agreeId: response.data.table.rows[0].agreeId});
                var newStr = self.state.agreeId.split("-");
                self.setState({agreeId: newStr[0]+"-"+(++newStr[1])});
            }else{
                console.log('Agreement id has a error');
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    genratePDF(){
        var self = this;
        if(this.state.cusDetails === null){
            alert('Please choose a customer');
        }else if(this.state.vehiDetails === null){
            alert('Please choose a vehicle');
        }else if(this.state.otherDetails === null){
            alert('Please add other details');
        }else if(this.state.payDetails === null){
            alert('Please add payment plan');
        }else{
            axios.post('http://localhost:8080/Agreement/saveData', {
                cusDetails: self.state.cusDetails,
                vehiDetails: self.state.vehiDetails,
                payDetails: self.state.payDetails,
                otherDetails: self.state.otherDetails
            })
            .then(function (response) {
                if(response.data.msg){
                    self.setState({cusDetails: null})
                    self.setState({vehiDetails: null})
                    self.setState({payDetails: null})
                    self.setState({otherDetails: null})
                    window.location.replace('/agreementPDF');
                }else{
                    console.log('Agrrement has a error');
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }

    logoShow(value){
        if(this.state.expArr[value-1]){
           this.state.expArr[value-1] = false;
            this.forceUpdate()
        }else{
            this.state.expArr[value-1] = true;
            this.forceUpdate()
        }        
    }

    render(){
        return(
            <div className="page-content" style={{paddingBottom: '100px'}}>
                
                <div className="col-md-12 col-sm-12 col-xs-12 topItem" style={{border: '2px solid '+localStorage.getItem('bgColor')}}>
                    <div className="itemTitle" onClick={() => this.logoShow(1)}>
                        <div className="row">
                            <div className="col-md-10 col-sm-10 col-xs-10">
                                {this.state.expArr[1-1]
                                    ? <i class="fa fa-angle-down arrowicon" style={{fontSize: '20px'}}></i>
                                    : <i class="fa fa-angle-right arrowicon" style={{fontSize: '20px'}}></i>
                                }
                                <h4 className="uploadTitle">Customer Details</h4>
                            </div>
                            <div className="col-md-1 col-sm-1 col-xs-1">

                            </div>
                            <div className="col-md-1 col-sm-1 col-xs-1">
                                {this.state.saveIcon[0] && this.state.expArr[0]
                                    ? <i className="fa fa-save saveicon" style={{fontSize: '20px'}}></i>
                                    : ""
                                }
                            </div>
                        </div>
                    </div>
                        {this.state.expArr[0]
                            ? <CustomerDetails changeCustomer={this.changeCustomer} setNic={this.setNic}/>
                            : ""
                        }
                </div>
                <br/>
                <div className="col-md-12 col-sm-12 col-xs-12 topItem" style={{border: '2px solid '+localStorage.getItem('bgColor')}}>
                    <div className="itemTitle" onClick={() => this.logoShow(2)}>
                        <div className="row">
                            <div className="col-md-10 col-sm-10 col-xs-10">
                                {this.state.expArr[2-1]
                                    ? <i class="fa fa-angle-down arrowicon" style={{fontSize: '20px'}}></i>
                                    : <i class="fa fa-angle-right arrowicon" style={{fontSize: '20px'}}></i>
                                }
                                <h4 className="uploadTitle">Vehicle Details</h4>
                            </div>
                            <div className="col-md-1 col-sm-1 col-xs-1">

                            </div>
                            <div className="col-md-1 col-sm-1 col-xs-1">
                                {this.state.saveIcon[1] && this.state.expArr[1]
                                    ? <i className="fa fa-save saveicon" style={{fontSize: '20px'}}></i>
                                    : ""
                                }
                            </div>
                        </div>
                    </div>
                        {this.state.expArr[1]
                            ? <VehicleDetails changeVehicle={this.changeVehicle} nic={this.state.nic} setNic={this.setNic}/>
                            : ""
                        }
                </div>
                <div className="col-md-12 col-sm-12 col-xs-12 topItem" style={{border: '2px solid '+localStorage.getItem('bgColor')}}>
                    <div className="itemTitle" onClick={() => this.logoShow(4)}>
                        <div className="row">
                            <div className="col-md-10 col-sm-10 col-xs-10">
                                {this.state.expArr[4-1]
                                    ? <i class="fa fa-angle-down arrowicon" style={{fontSize: '20px'}}></i>
                                    : <i class="fa fa-angle-right arrowicon" style={{fontSize: '20px'}}></i>
                                }
                                <h4 className="uploadTitle">Other Details</h4>
                            </div>
                            <div className="col-md-1 col-sm-1 col-xs-1">

                            </div>
                            <div className="col-md-1 col-sm-1 col-xs-1">
                                {this.state.saveIcon[3] && this.state.expArr[3]
                                    ? <i className="fa fa-save saveicon" style={{fontSize: '20px'}}></i>
                                    : ""
                                }
                            </div>
                        </div>
                    </div>
                        {this.state.expArr[3]
                            ? <OtherDetails changeOther={this.changeOther} agreeId={this.state.agreeId}/>
                            : ""
                        }
                </div>
                <div className="col-md-12 col-sm-12 col-xs-12 topItem" style={{border: '2px solid '+localStorage.getItem('bgColor')}}>
                    <div className="itemTitle" onClick={() => this.logoShow(3)}>
                        <div className="row">
                            <div className="col-md-10 col-sm-10 col-xs-10">
                                {this.state.expArr[3-1]
                                    ? <i class="fa fa-angle-down arrowicon" style={{fontSize: '20px'}}></i>
                                    : <i class="fa fa-angle-right arrowicon" style={{fontSize: '20px'}}></i>
                                }
                                <h4 className="uploadTitle">Payment Details</h4>
                            </div>
                            <div className="col-md-1 col-sm-1 col-xs-1">

                            </div>
                            <div className="col-md-1 col-sm-1 col-xs-1">
                                {this.state.saveIcon[2] && this.state.expArr[2]
                                    ? <i className="fa fa-save saveicon" style={{fontSize: '20px'}}></i>
                                    : ""
                                }
                            </div>
                        </div>
                    </div>
                        {this.state.expArr[2]
                            ? <Payment changePayment={this.changePayment} genratePDF={this.genratePDF} agreeId={this.state.agreeId}/>
                            : ""
                        }
                </div>
                <div class="form-group col-sm-12 col-md-12 col-lg-12 col-xs-12 row" style={{marginTop: '20px'}}>
                    <div className='col-xs-10 col-md-11'>
                        
                    </div>
                    <div className='col-xs-2 col-md-1'>
                        <button type="button" class="btn btn-success" onClick={this.genratePDF.bind(this)}>Genrate PDF</button>
                    </div>
                </div>       
            </div>
        )
    }
}
