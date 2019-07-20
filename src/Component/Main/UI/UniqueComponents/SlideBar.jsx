import React, {Component} from 'react';
import { MDBNavLink } from "mdbreact";

const styleSheet = {
    sideNav: {
        minHeight: 'calc(100% - 50px)',
        height: 'calc(100% - 50px)',
        paddingLeft: '10px',
        background: localStorage.getItem('bgColor'),
        cursor: 'pointer'
    },
    themColor:{
        minHeight: '50px',
        background: localStorage.getItem('bgColor'),
        '&:active': {
            color: ' #454545 '
        }
    }
}

export default class SlideBar extends Component {

    constructor(props){
        super(props)
        this.higherShow = this.higherShow.bind(this);
        this.higherHide = this.higherHide.bind(this);
    }
    state = {
        activeItem: "1",
        higher: false
    };
    
  
    toggle = tab => e => {
        if (this.state.activeItem !== tab) {
          this.setState({
            activeItem: tab
          }); 
        }
        if(tab == 4){
            this.higherShow();
        }else if(tab < 4 || tab > 4){
            this.higherHide();
        }
    };

    higherShow(){
        this.setState({
            higher: true
        });
    }

    higherHide(){
        this.setState({
            higher: false
        });
    }

    render () {

        const dropMenu = (
            <ul id="side-menu" className="nav">
                <div className="clearfix"></div>
                <li style={styleSheet.themColor} className={this.state.activeItem === "5" ? "active" : ""} onClick={this.toggle("5")}><MDBNavLink to="/higher/items" style={{paddingLeft: '35px'}} onClick={()=>this.props.setLocation('Items')}><i className="fa fa-edit fa-fw">
                    <div className="icon-bg bg-violet"></div>
                    </i><span className="menu-title">Items</span></MDBNavLink>
                </li>
                <li style={styleSheet.themColor} className={this.state.activeItem === "6" ? "active" : ""} onClick={this.toggle("6")}><MDBNavLink to="/higher/agreement" style={{paddingLeft: '35px'}} onClick={()=>this.props.setLocation('Agreement')}><i className="fa fa-edit fa-fw">
                    <div className="icon-bg bg-violet"></div>
                    </i><span className="menu-title">Agreement</span></MDBNavLink>
                </li>
                <li style={styleSheet.themColor} className={this.state.activeItem === "7" ? "active" : ""} onClick={this.toggle("7")}><MDBNavLink to="/higher/payement" style={{paddingLeft: '35px'}} onClick={()=>this.props.setLocation('Payment')}><i className="fa fa-edit fa-fw">
                    <div className="icon-bg bg-violet"></div>
                    </i><span className="menu-title">Payment</span></MDBNavLink>
                </li>
                <li style={styleSheet.themColor} className={this.state.activeItem === "8" ? "active" : ""} onClick={this.toggle("8")}><MDBNavLink to="/higher/report" style={{paddingLeft: '35px'}} onClick={()=>this.props.setLocation('Report')}><i className="fa fa-edit fa-fw">
                    <div className="icon-bg bg-violet"></div>
                    </i><span className="menu-title">Report</span></MDBNavLink>
                </li>
            </ul>
        )

      return (
        <div>
            <nav id="sidebar" role="navigation" data-step="2" data-intro="Template has &lt;b&gt;many navigation styles&lt;/b&gt;"
                data-position="right" className="navbar-default navbar-static-side" style={styleSheet.sideNav}>
                <div className="sidebar-collapse menu-scroll">
                    <ul id="side-menu" className="nav">
                        
                        <div className="clearfix"></div>
                        <li style={styleSheet.themColor} className={this.state.activeItem === "1" ? "active" : ""} onClick={this.toggle("1")} ><MDBNavLink to="/customer" onClick={()=>this.props.setLocation('Customer')}><i className="fa fa-tachometer fa-fw">
                            <div className="icon-bg bg-orange"></div>
                        </i><span className="menu-title">Customer</span></MDBNavLink></li>
                        <li  style={styleSheet.themColor} className={this.state.activeItem === "2" ? "active" : ""} onClick={this.toggle("2")} ><MDBNavLink to="/fixed" onClick={()=>this.props.setLocation('Fixed Deposit')}><i className="fa fa-desktop fa-fw">
                            <div className="icon-bg bg-pink"></div>
                        </i><span className="menu-title">Fixed Deposit</span></MDBNavLink>
                        
                        </li>
                        <li style={styleSheet.themColor} className={this.state.activeItem === "3" ? "active" : ""} onClick={this.toggle("3")} ><MDBNavLink to="/gold" onClick={()=>this.props.setLocation('Gold Loans')}><i className="fa fa-send-o fa-fw">
                            <div className="icon-bg bg-green"></div>
                        </i><span className="menu-title">Gold Loans</span></MDBNavLink>
                        
                        </li>
                        <li style={styleSheet.themColor} className={this.state.activeItem === "4" ? "active" : ""} onClick={this.toggle("4")} ><MDBNavLink to="/higher" onClick={()=>this.props.setLocation('Higher Purchase')}><i className="fa fa-edit fa-fw">
                            <div className="icon-bg bg-violet"></div>
                        </i><span className="menu-title">Higher Purchase</span></MDBNavLink>
                        { this.state.higher ? dropMenu : ""}
                        </li>
                        
                        <li style={styleSheet.themColor}><a href="/customer"><i className="fa fa-th-list fa-fw">
                            <div className="icon-bg bg-blue"></div>
                        </i><span className="menu-title">Tables</span></a>
                            
                        </li>
                        <li style={styleSheet.themColor}><a href="DataGrid.html"><i className="fa fa-database fa-fw">
                            <div className="icon-bg bg-red"></div>
                        </i><span className="menu-title">Data Grids</span></a>
                        
                        </li>
                        <li style={styleSheet.themColor}><a href="Pages.html"><i className="fa fa-file-o fa-fw">
                            <div className="icon-bg bg-yellow"></div>
                        </i><span className="menu-title">Pages</span></a>
                        
                        </li>
                        <li style={styleSheet.themColor}><a href="Extras.html"><i className="fa fa-gift fa-fw">
                            <div className="icon-bg bg-grey"></div>
                        </i><span className="menu-title">Extras</span></a>
                        
                        </li>
                        <li style={styleSheet.themColor}><a href="Dropdown.html"><i className="fa fa-sitemap fa-fw">
                            <div className="icon-bg bg-dark"></div>
                        </i><span className="menu-title">Multi-Level Dropdown</span></a>
                        
                        </li>
                        <li style={styleSheet.themColor}><a href="Email.html"><i className="fa fa-envelope-o">
                            <div className="icon-bg bg-primary"></div>
                        </i><span className="menu-title">Email</span></a>
                        
                        </li>
                        <li style={styleSheet.themColor}><a href="Charts.html"><i className="fa fa-bar-chart-o fa-fw">
                            <div className="icon-bg bg-orange"></div>
                        </i><span className="menu-title">Charts</span></a>
                        
                        </li>
                        <li style={styleSheet.themColor}><a href="Animation.html"><i className="fa fa-slack fa-fw">
                            <div className="icon-bg bg-green"></div>
                        </i><span className="menu-title">Animations</span></a></li>
                    </ul>
                </div>
            </nav>
        </div>
      )
    }
  }