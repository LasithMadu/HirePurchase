import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom"
import axios from 'axios'
import {ToastsContainer, ToastsStore, ToastsContainerPosition} from 'react-toasts';

import Customer from '../../../Customer/UI/CustomerComponents/CustomerDetails'
import CDetails from '../../../Customer/UI/CustomerDetails/CustomerDetail'
import Settings from '../../../Users/UI/SuperAdmin/SettingsComponent/Settings'
import CAccount from '../../../Users/UI/Admin/Admin'
import Users from '../../../Users/UI/Users/Users'
import Profile from '../../../Users/UI/Admin/Profile/Profile'
import NotFound from '../../../Main/UI/UniqueComponents/NotFound';

import SlideBar from '../../../Main/UI/UniqueComponents/SlideBar'
import TopBar from '../../../Main/UI/UniqueComponents/TopBar'
import LocationBar from '../../../Main/UI/UniqueComponents/LocationBar'

const styleSheet = {
  body: {
    marginLeft: '250px'
  }
}

export default class Main extends Component {

  constructor(props){
    super(props)
    this.state = {
      currentLocation: 'Customer'
    }
  }

  setLocation(current){
    this.setState({
      currentLocation: current
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
                <div style={styleSheet.body}>
                    <LocationBar currentLocation={this.state.currentLocation}/>
                    <div className='col-md-12'>
                    <Switch>
                        <Route exact path="/customer" component={Customer} />
                        <Route exact path="/higher" component={Customer} />
                        <Route exact path="/create" component={CDetails} />
                        <Route exact path="/profile" component={Profile} />
                        <Route exact path="/users" component={Users} />
                        <Route exact path="/settings" component={Settings} />
                        <Route exact path="/caccount" component={CAccount} />
                        <Route component={NotFound} />
                    </Switch>
                    </div>
                  </div>
              </div>
          </div>
        </Router>
      )
    }
  }