import React, {useState} from 'react'
import $ from 'jquery'

const Separation = ({size, title, component}) => {
    return(
        <div className={"col-lg-"+size[0]+"col-md-"+size[1]+" col-sm-"+size[2]+" col-xs-"+size[3]+ " border"} style={{border: '2px solid '+sessionStorage.getItem('bgColor')}}>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 titlediv">
                <span className="align-middle title">{title.toUpperCase()}</span>
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{marginTop: '12px'}} >
                {component}
            </div>
        </div>
    )
}

export default Separation;