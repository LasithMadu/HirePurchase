import React, {Component} from 'react';
import { NavLink } from 'react-router-dom'

import Customer from '../../../../Assests/images/menuicons/Customer.png'
import Items from '../../../../Assests/images/menuicons/Items.png'

const styleSheet = {
    sideNav: {
        minHeight: 'calc(100% - 50px)',
        height: 'calc(100% - 50px)',
        paddingLeft: '10px',
        background: "#1f1f1f",
        cursor: 'pointer',
    },
    themColor:{
        minHeight: '50px',
        background: "#1f1f1f",
        'a :active': {
            color: ' #fff000',
            background: "#fff000"
        }
    }
}

export default class SlideBar extends Component {

    constructor(props){
        super(props)
        this.higherShow = this.higherShow.bind(this);
        this.higherHide = this.higherHide.bind(this);
        this.itemShow = this.itemShow.bind(this);
        this.itemHide = this.itemHide.bind(this);
    }
    state = {
        activeItem: "1",
        higher: false,
        items: false,
        reminder: false
    };
  
    toggle = tab => e => {
        if (this.state.activeItem !== tab) {
          this.setState({
            activeItem: tab
          }); 
        }
        if(tab === "4"){
            this.higherShow();
            this.itemShow();
            this.setState({
                activeItem: '9'
              }); 
        }else if(tab === "5"){
            this.itemShow();
            this.setState({
                activeItem: '9'
              }); 
        }else if(tab === "13"){
            this.itemHide();
            this.reminderShow();
            this.setState({
                activeItem: '14'
              });
        }

        if(tab === "1"){
            this.itemHide();
            this.higherHide();
            this.reminderHide();
        }
        
        // if(tab == 5  || tab == 4){
        //     this.itemShow();
        //     this.setState({
        //         activeItem: 9
        //       }); 
        // }else if(tab < 5 || tab > 8){
        //     this.itemHide();
        // }
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

    itemShow(){
        this.setState({
            items: true
        });
    }

    itemHide(){
        this.setState({
            items: false
        });
    }

    reminderShow(){
        this.setState({
            reminder: true
        });
    }

    reminderHide(){
        this.setState({
            reminder: false
        });
    }

    render () {

        const reminders = (
            <ul className="nav sidehigh">
                <div className="clearfix"></div>
                <li style={styleSheet.themColor} className={this.state.activeItem === "14" ? "active" : ""} onClick={this.toggle("14")}><NavLink to="/higher/firstr" style={{paddingLeft: '70px'}}  onClick={()=>this.props.setLocation('First Reminder')}><i className="fa fa-edit fa-fw">
                    <div className="icon-bg bg-violet"></div>
                    </i><span className="menu-title">First Reminder</span></NavLink>
                </li>
                <li style={styleSheet.themColor} className={this.state.activeItem === "15" ? "active" : ""} onClick={this.toggle("15")}><NavLink to="/higher/finalr" style={{paddingLeft: '70px'}} activeStyle={{ background: localStorage.getItem('bgColor') }}  onClick={()=>this.props.setLocation('Final Reminder')}><i className="fa fa-edit fa-fw">
                    <div className="icon-bg bg-violet"></div>
                    </i><span className="menu-title">Final Reminder</span></NavLink>
                </li>
                <li style={styleSheet.themColor} className={this.state.activeItem === "16" ? "active" : ""} onClick={this.toggle("16")}><NavLink to="/higher/notist" style={{paddingLeft: '70px'}} activeStyle={{ background: localStorage.getItem('bgColor') }}  onClick={()=>this.props.setLocation('Notice Of Termination')}><i className="fa fa-edit fa-fw">
                    <div className="icon-bg bg-violet"></div>
                    </i><span className="menu-title">Notice Of Termination</span></NavLink>
                </li>
                <li style={styleSheet.themColor} className={this.state.activeItem === "16" ? "active" : ""} onClick={this.toggle("16")}><NavLink to="/higher/terml" style={{paddingLeft: '70px'}} activeStyle={{ background: localStorage.getItem('bgColor') }}  onClick={()=>this.props.setLocation('Termination Letter')}><i className="fa fa-edit fa-fw">
                    <div className="icon-bg bg-violet"></div>
                    </i><span className="menu-title">Termination Letter</span></NavLink>
                </li>
            </ul>
        )

        const subMenu = (
            <ul className="nav sidehigh">
                <div className="clearfix"></div>
                <li style={styleSheet.themColor} className={this.state.activeItem === "9" ? "active" : ""} onClick={this.toggle("9")}><NavLink to="/higher/items" style={{paddingLeft: '70px'}} activeStyle={{ background: localStorage.getItem('bgColor') }}  onClick={()=>this.props.setLocation('VEHICLE')}><i className="fa fa-edit fa-fw">
                    <div className="icon-bg bg-violet"></div>
                    </i><span className="menu-title">Vehicles</span></NavLink>
                </li>
                <li style={styleSheet.themColor} className={this.state.activeItem === "10" ? "active" : ""} onClick={this.toggle("10")}><NavLink to="/higher/lands" style={{paddingLeft: '70px'}} activeStyle={{ background: localStorage.getItem('bgColor') }}  onClick={()=>this.props.setLocation('LAND')}><i className="fa fa-edit fa-fw">
                    <div className="icon-bg bg-violet"></div>
                    </i><span className="menu-title">Lands</span></NavLink>
                </li>
                <li style={styleSheet.themColor} className={this.state.activeItem === "11" ? "active" : ""} onClick={this.toggle("11")}><NavLink to="/higher/other" style={{paddingLeft: '70px'}} activeStyle={{ background: localStorage.getItem('bgColor') }}  onClick={()=>this.props.setLocation('OTHER')}><i className="fa fa-edit fa-fw">
                    <div className="icon-bg bg-violet"></div>
                    </i><span className="menu-title">Other</span></NavLink>
                </li>
            </ul>
        )

        const dropMenu = (
            <ul className="nav sidehigh">
                <div className="clearfix"></div>
                <li style={styleSheet.themColor} className={this.state.activeItem === "5" ? "" : ""} onClick={this.toggle("5")}><NavLink to="/higher/items" style={{paddingLeft: '35px'}}  onClick={()=>this.props.setLocation('VEHICLE')}>
                    <div className="icon-bg"><img src={Items} className="slideIcon" alt="items" /></div>
                    <span className="menu-title">Items</span></NavLink>
                    { this.state.items ? subMenu : ""}
                </li>
                <li style={styleSheet.themColor} className={this.state.activeItem === "6" ? "active" : ""} onClick={this.toggle("6")}><NavLink to="/higher/agreement" style={{paddingLeft: '35px'}} activeStyle={{ background: localStorage.getItem('bgColor') }}  onClick={()=>this.props.setLocation('AGREEMENT')}><i className="fa fa-edit fa-fw">
                    <div className="icon-bg bg-violet"></div>
                    </i><span className="menu-title">Agreements</span></NavLink>
                </li>
                <li style={styleSheet.themColor} className={this.state.activeItem === "12" ? "active" : ""} onClick={this.toggle("12")}><NavLink to="/higher/payment" style={{paddingLeft: '35px'}} activeStyle={{ background: localStorage.getItem('bgColor') }}  onClick={()=>this.props.setLocation('PAYMENT')}><i className="fa fa-edit fa-fw">
                    <div className="icon-bg bg-violet"></div>
                    </i><span className="menu-title">Payments</span></NavLink>
                </li>
                <li style={styleSheet.themColor} className={this.state.activeItem === "13" ? "" : ""} onClick={this.toggle("13")}><NavLink to="/higher/reminder" style={{paddingLeft: '35px'}} activeStyle={{ background: localStorage.getItem('bgColor') }}  onClick={()=>this.props.setLocation('REMINDER')}><i className="fa fa-edit fa-fw">
                    <div className="icon-bg bg-violet"></div>
                    </i><span className="menu-title">Reminders</span></NavLink>
                    {/* { this.state.reminder ? reminders : ""} */}
                </li>
                <li style={styleSheet.themColor} className={this.state.activeItem === "8" ? "active" : ""} onClick={this.toggle("8")}><NavLink to="/higher/report" style={{paddingLeft: '35px'}} activeStyle={{ background: localStorage.getItem('bgColor') }}  onClick={()=>this.props.setLocation('REPORTS')}><i className="fa fa-edit fa-fw">
                    <div className="icon-bg bg-violet"></div>
                    </i><span className="menu-title">Reports</span></NavLink>
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
                        <li style={styleSheet.themColor} className={this.state.activeItem === "1" ? "active" : ""} onClick={this.toggle("1")}><NavLink to="/customer" activeStyle={{ background: localStorage.getItem('bgColor') }} onClick={()=>this.props.setLocation('CUSTOMER')}>
                            <div className="icon-bg"><img src={Customer} className="slideIcon" alt="customer" /></div>
                        <span className="menu-title">Customer</span></NavLink></li>
                        {/* <li  style={styleSheet.themColor} className={this.state.activeItem === "2" ? "active" : ""} onClick={this.toggle("2")} ><NavLink to="/fixed" onClick={()=>this.props.setLocation('Fixed Deposit')}><i className="fa fa-desktop fa-fw">
                            <div className="icon-bg bg-pink"></div>
                        </i><span className="menu-title">Fixed Deposit</span></NavLink>
                        
                        </li>
                        <li style={styleSheet.themColor} className={this.state.activeItem === "3" ? "active" : ""} onClick={this.toggle("3")} ><NavLink to="/gold" onClick={()=>this.props.setLocation('Gold Loans')}><i className="fa fa-send-o fa-fw">
                            <div className="icon-bg bg-green"></div>
                        </i><span className="menu-title">Gold Loans</span></NavLink>
                        
                        </li> */}
                        <li style={styleSheet.themColor} className={this.state.activeItem === "4" ? "" : ""} onClick={this.toggle("4")} ><NavLink to="/higher/items" onClick={()=>this.props.setLocation('VEHICLE')}><i className="fa fa-edit fa-fw">
                            <div className="icon-bg bg-violet"></div>
                        </i><span className="menu-title">Hire Purchase</span></NavLink>
                        { this.state.higher ? dropMenu : ""}
                        </li>
                        
                        {/* <li style={styleSheet.themColor}><a href="/customer"><i className="fa fa-th-list fa-fw">
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
                        </i><span className="menu-title">Animations</span></a></li> */}
                    </ul>
                </div>
            </nav>
        </div>
      )
    }
  }