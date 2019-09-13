import React, {Component} from 'react';
import { NavLink } from 'react-router-dom'

export default class LocationBar extends Component {

    render () {
      return (
        <div>
            <div id="title-breadcrumb-option-demo" className="page-title-breadcrumb">
                    <div className="page-header pull-left">
                        <div className="page-title">
                          <strong>{this.props.currentLocation.toUpperCase()}</strong>
                        </div>
                    </div>
                    <ol className="breadcrumb page-breadcrumb pull-right">
                        <li><i className="fa fa-home"></i>&nbsp;<NavLink to="/customer">Home</NavLink>&nbsp;&nbsp;<i className="fa fa-angle-right"></i>&nbsp;&nbsp;</li>
                        <li className="hidden">&nbsp;&nbsp;<i className="fa fa-angle-right"></i>&nbsp;&nbsp;</li>
                        <li className="active">{this.props.currentLocation}</li>
                    </ol>
                    <div className="clearfix">
                    </div>
                </div>
        </div>
      )
    }
  }