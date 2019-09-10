import React, {Component} from 'react'
import axios from 'axios'
import $ from 'jquery'
import { Scrollbars } from 'react-custom-scrollbars';

import CustomerDetails from './SubComponent/CustomerDetails'
import VehicleDetails from './SubComponent/VehicleDetails'
import Payment from './SubComponent/Payment'



export default class Agreement extends Component{

    constructor(props){
        super(props)
        this.state = {
          values: [],
          isSearch: false,
          saveIcon: [false, false, false, false],
          expArr: [false, false, false, false]
        }
    }

    setAgreement(data){
        this.setState({
          agreementData: data,
          agreeid: null,
          created: null,
          version: null,
        })
    }


    componentDidMount(){
        localStorage.setItem('agreement', null);
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
      var data = this.state.values;
        return(
            <div className="page-content" style={{paddingBottom: '100px'}}>
                
                <div className="col-md-12 col-sm-12 col-xs-12 topItem">
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
                            ? <CustomerDetails/>
                            : ""
                        }
                </div>
                <br/>
                <div className="col-md-12 col-sm-12 col-xs-12 topItem">
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
                            ? <VehicleDetails/>
                            : ""
                        }
                </div>
                <div className="col-md-12 col-sm-12 col-xs-12 topItem">
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
                            ? <Payment/>
                            : ""
                        }
                </div>
                <div className="col-md-12 col-sm-12 col-xs-12 topItem">
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
                            ? ""
                            : ""
                        }
                </div>
            </div>
        )
    }
}
