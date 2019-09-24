import React from 'react'
import $ from 'jquery'

const PasswordInput = ({size, id, classN, label, placeholder, disable, handleChange, reqiured, err}) => {

    $(document).on("focusout","#"+id,function(){
        $("#"+id).css('border', '1px solid black')
    });

    $(document).on("focusin","#"+id,function(){
        $("#"+id).css('border', '0px')
    });

    return(
        <div className={"col-lg-" + size[0] + "col-md-" + size[1] + " col-sm-" + size[2] + " col-xs-" + size[3]} style={{ position: 'relative', height: '85px' }}>
            <div className="form-group">
                <label for={id}>{label}</label> {reqiured ? <span class="glyphicon glyphicon-asterisk"></span> : ""}
                <br/>
                    <input className={"bp3-input bp3-fill modifier sInput"+classN} onChange={(e) => {handleChange($("#"+id).val());}} id={id} style={{ border: '1px solid black', borderRadius: '0px'}} type="password" placeholder={placeholder} dir="auto" />
                <div>
                    <span className="text-danger">{err}</span>
                </div>
            </div>
        </div>
    )
}

export default PasswordInput;