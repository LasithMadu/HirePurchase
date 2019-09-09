import React, {useState} from 'react'

const Button = ({size, id, classN, label, placeholder, disable, msg}) => {

    return(
        <div className={"col-lg-"+size[0]+"col-md-"+size[1]+" col-sm-"+size[2]+" col-xs-"+size[3]} style={{height: '85px'}}>
            <div class="form-group col-sm-6 row">
                <div className='col-xs-6 col-md-3'>
                    <button type="button" class="btn btn-primary" onClick={this.saveVehicals}>Save</button>
                </div>
                <div className='col-xs-6 col-md-3'>
                    <button type="button" class="btn btn-light">Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default Button;