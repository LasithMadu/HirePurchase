import React, {Component} from 'react';

export default class LocationBar extends Component {

    render () {
      return (
        <div>
            <div id="title-breadcrumb-option-demo" className="page-title-breadcrumb">
                    <div className="page-header pull-left">
                        <div className="page-title">
                            {this.props.currentLocation}</div>
                    </div>
                    <ol className="breadcrumb page-breadcrumb pull-right">
                        <li><i className="fa fa-home"></i>&nbsp;<a href="dashboard.html">Home</a>&nbsp;&nbsp;<i className="fa fa-angle-right"></i>&nbsp;&nbsp;</li>
                        <li className="hidden"><a href="#">{this.props.currentLocation}</a>&nbsp;&nbsp;<i className="fa fa-angle-right"></i>&nbsp;&nbsp;</li>
                        <li className="active">{this.props.currentLocation}</li>
                    </ol>
                    <div className="clearfix">
                    </div>
                </div>
        </div>
      )
    }
  }