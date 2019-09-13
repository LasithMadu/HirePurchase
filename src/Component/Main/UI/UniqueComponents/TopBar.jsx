import React, {Component} from 'react';
import { MDBNavLink } from "mdbreact";
import $ from 'jquery'
import '../../../../Assests/styles/NavCss.css'

import logo from '../../../../Assests/images/logo/i360 white.png'

const styleSheet = {
    dropContent: {
        marginBottom: 0,
        backgroundColor: '#1f1f1f'
    }
}

let i = 1;

export default class TopBar extends Component {

    constructor(props){
        super(props)
        this.state = {
            userLevel: localStorage.getItem('userLevel')
        }
    }

    clearCache(){
        localStorage.clear();
    }

    mouse(){
        if(i === 0){
            $('#side-menu').css('display','block')
            i = 1;
        }else{
            $('#side-menu').css('display','none')
            i = 0;
        }
    }

    render () {

        const oprator = (
            <div className="dropdown-content" style={styleSheet.dropContent}>
                <MDBNavLink to="/userprofile" className="dropdown-item text-white" onClick={()=>this.props.setLocation('Profile')}><i className="fa fa-user"></i>My Profile</MDBNavLink>
                <MDBNavLink to="/create" className="dropdown-item text-white" onClick={()=>this.props.setLocation('Customer')}><i className="fa fa-calendar"></i>Customer</MDBNavLink>
                <div className="divider"></div>
                <a href="/" className="dropdown-item text-white" onClick={this.clearCache}><i className="fa fa-key"></i>Log Out</a>
            </div>
        );

        const admin = (
            <div className="dropdown-content" style={styleSheet.dropContent}>
                <MDBNavLink to="/profile" className="dropdown-item text-white" onClick={()=>this.props.setLocation('Profile')}><i className="fa fa-user"></i>My Profile</MDBNavLink>
                <MDBNavLink to="/users" className="dropdown-item text-white" onClick={()=>this.props.setLocation('Users')}><i className="fa fa-calendar"></i> Create Account</MDBNavLink>
                <MDBNavLink to="/users" className="dropdown-item text-white" onClick={()=>this.props.setLocation('Settings')}><i className="fa fa-calendar"></i> Settings</MDBNavLink>
                <div className="divider"></div>
                <a href="/" className="dropdown-item text-white" onClick={this.clearCache}><i className="fa fa-key"></i>Log Out</a>
            </div>
        );

        const superadmin = (
            <div className="dropdown-content" style={styleSheet.dropContent}>
                <MDBNavLink to="/settings" className="dropdown-item text-white" onClick={()=>this.props.setLocation('Settings')}><i className="fa fa-user"></i>Settings</MDBNavLink>
                <MDBNavLink to="/caccount" className="dropdown-item text-white" onClick={()=>this.props.setLocation('Create Account')}><i className="fa fa-calendar"></i>Create Account</MDBNavLink>
                <div className="divider"></div>
                <a href="/" className="dropdown-item text-white" onClick={this.clearCache}><i className="fa fa-key"></i>Log Out</a>
            </div>
        );

      return (
        <div>
            <div id="header-topbar-option-demo" className="page-header-topbar">
                    <nav id="topbar" role="navigation" style={styleSheet.dropContent} data-step="3" className="navbar navbar-default navbar-static-top">
                    <div className="navbar-header"style={{marginLeft: '5px', paddingTop: '8px'}}>
                        <MDBNavLink style={styleSheet.dropContent} to="/customer"><img src={logo} alt="logo" style={{width: '170px', padding: 0, margin: 0}}/></MDBNavLink></div>
                        <div id="mydiv" className="navbar-toggle" onClick={this.mouse}><i className="fa fa-bars"></i></div>
                    <div className="topbar-main">
                        <ul className="nav navbar navbar-top-links navbar-right mbn mobileDrop">
                            <li className="dropdown topbar-user"><a data-hover="dropdown" className="dropdown-toggle"><span className="hidden-xs username">{localStorage.getItem('username').toUpperCase()}</span>&nbsp;<span className="caret"></span></a>
                            <div>
                                { this.state.userLevel === 'Super Admin' ? superadmin : ""}
                                { this.state.userLevel === 'Admin' ? admin : ""}
                                { this.state.userLevel === 'Oparator' ? oprator : ""}
                            </div>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
      )
    }
  }