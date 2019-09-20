import React, { useState, useEffect} from 'react'
import $ from 'jquery'
import { NavLink } from 'react-router-dom'

const InputField = ({size, id, classN, label, placeholder, disable, msg, handleChange, editBtn, btnText, err, reqiured, save, type, value}) => {

    const [empty, setEmpty] = useState(false);
    const [enable, setEnable] = useState(disable);

    function msgChange(){
        if($("#"+id).val() === '' && reqiured){
            setEmpty(true); 
        }else{
            setEmpty(false);
        }     
    }

    function changeInput(){
        setEnable(false);
    }

    $(document).ready(function(){
        setTimeout(function(){ 
            if(save){
                if($("#"+id).val() === '' && reqiured){
                    setEmpty(true); 
                }else{
                    window.onload = null;
                    $(document).unbind("ready");
                    setEmpty(false);
                }  
            }
        }, 30);
    });

    $(document).on("focusout","#"+id,function(){
        $("#"+id).css('border', '1px solid black')
    });

    $(document).on("focusin","#"+id,function(){
        $("#"+id).css('border', '0px')
    });

    return(
        <div className={"col-lg-"+size[0]+"col-md-"+size[1]+" col-sm-"+size[2]+" col-xs-"+size[3]} style={{height: '85px'}}>
            <div className="form-group">
                <label for={id}>{label}{ editBtn ? <NavLink onClick={(e) => {changeInput();}}> {btnText}</NavLink> : "" }</label> { reqiured ? <span class="glyphicon glyphicon-asterisk"></span> : ""}
                <br/>
                {
                    enable ? 
                    <input className={"bp3-input bp3-fill modifier sInput"+classN} disabled={true} id={id} name={id} style={{border: '1px solid black', borderRadius: '0px'}} type="text" value={placeholder} dir="auto" /> :
                    <input className={"bp3-input bp3-fill modifier sInput" + classN} readonly={false} onChange={(e) => { handleChange($("#" + id).val()); msgChange();}} id={id} name={id} style={{ border: '1px solid black', borderRadius: '0px' }} type={type} placeholder={placeholder} dir="auto" />
                }
                <div>
                {
                    empty ?
                    <span className="text-danger">{msg}</span> :
                    ""
                }
                </div>
            </div>
        </div>
    )
}

export default InputField;