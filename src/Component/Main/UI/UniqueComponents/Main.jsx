import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom"
import {ToastsContainer, ToastsStore, ToastsContainerPosition} from 'react-toasts';
import { Scrollbars } from 'react-custom-scrollbars';
import axios from 'axios'

import Customer from '../../../Customer/UI/CustomerComponents/CustomerDetails'
import CDetails from '../../../Customer/UI/CustomerDetails/CustomerDetail'
import Settings from '../../../Users/UI/SuperAdmin/SettingsComponent/Settings'
import CAccount from '../../../Users/UI/Admin/Admin'
import Users from '../../../Users/UI/Users/Users'
import Profile from '../../../Users/UI/Admin/Profile/Profile'
import Vehicle from '../../../HigherPurchase/Items/VehicalItem/UI/Vehical'
import UserProfile from '../../../Users/UI/Users/Profile/Profile'
import Agreement from '../../../HigherPurchase/Agreement/UI/Agreement';
import Payment from '../../../HigherPurchase/Payment/UI/Payment/PaymentForms/PaymentAdd';
import AgreementPDF from '../../../HigherPurchase/Agreement/UI/AgreementPDF';
import NotFound from '../../../Main/UI/UniqueComponents/NotFound';

import SlideBar from '../../../Main/UI/UniqueComponents/SlideBar'
import TopBar from '../../../Main/UI/UniqueComponents/TopBar'
import LocationBar from '../../../Main/UI/UniqueComponents/LocationBar'

export default class Main extends Component {

  constructor(props){
    super(props)
    this.state = {
      currentLocation: 'CUSTOMER',
      vehicles: []
    }
    if (sessionStorage.getItem('username') === null || sessionStorage.getItem('username') === '') {
      window.location.replace('/');
    }
  }

  setLocation(current){
    this.setState({
      currentLocation: current
    })
  }

  componentDidMount(){
    axios.get(sessionStorage.getItem('url')+'/Vehicals/getVehicals')
    .then((response) => {
      if(response.data.msg){
        this.setState({vehicles: response.data.table.rows});
      }
      else{
        console.log("Did");
      }
    })
  }


    render () {
      return (
        <Router>
          <div className='container-full'>
          <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.BOTTOM_RIGHT} />
              <TopBar setLocation={this.setLocation.bind(this)}/>

              <div className='row'>
                    <SlideBar setLocation={this.setLocation.bind(this)}/>
                <div className='components'>
                    <LocationBar currentLocation={this.state.currentLocation}/>
                    <div className='col-md-12'>
                    <Scrollbars visibility-x={false} style={{height: 'calc(100vh - 120px)', display: 'inline-block', overflowX: 'hidden'}}>
                      <Switch>
                          <Route exact path="/customer" component={Customer} />
                          <Route exact path="/higher/items" render={() => <Vehicle vehicles={this.state.vehicles} />} />
                          <Route exact path="/higher/agreement" component={Agreement} />
                          <Route exact path="/create" component={CDetails} />
                          <Route exact path="/profile" component={Profile} />
                          <Route exact path="/higher/payment" component={Payment} />
                          <Route exact path="/userprofile" component={UserProfile} />
                          <Route exact path="/users" component={Users} />
                          <Route exact path="/settings" component={Settings} />
                          <Route exact path="/caccount" component={CAccount} />
                          <Route exact path="/agreementPDF" component={AgreementPDF} />
                          <Route component={NotFound} />
                      </Switch>
                    </Scrollbars>
                    </div>
                    {/* <Footer/> */}
                  </div>
              </div>
          </div>
        </Router>
      )
    }
  }