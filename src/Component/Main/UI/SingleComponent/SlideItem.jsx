import React, {useState} from 'react'
import { NavLink } from 'react-router-dom'

const SlideItem = ({size, id, classN, label, placeholder, disable, msg}) => {

    return(
        <li style={styleSheet.themColor} className={this.state.activeItem === "1" ? "active" : ""} onClick={this.toggle("1")}><NavLink to="/customer" activeStyle={{ background: sessionStorage.getItem('bgColor') }} onClick={()=>this.props.setLocation('Customer')}><i className="fa fa-tachometer fa-fw">
            <div className="icon-bg bg-orange"></div>
        </i><span className="menu-title">Customer</span></NavLink></li>
    )
}

export default SlideItem;