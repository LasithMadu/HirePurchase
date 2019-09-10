import React, {useState} from 'react'
import $ from 'jquery'

const InputField = ({size, id, classN, label, placeholder, disable, msg, handleChange}) => {

    const [empty, setEmpty] = useState(true);

    function msgChange(){
        if($("#"+id).val() == ''){
            setEmpty(false);
        }else{
            setEmpty(true);
        }     
    }

    $(document).on("focusout","#"+id,function(){
        $("#"+id).css('border', '1px solid black')
    });

    $(document).on("focusin","#"+id,function(){
        $("#"+id).css('border', '0px')
    });

    return(
        <div className={"col-lg-"+size[0]+"col-md-"+size[1]+" col-sm-"+size[2]+" col-xs-"+size[3]} style={{height: '85px'}}>
            <div className="form-group">
                <label for={id}>{label}</label>
                <br/>
                {
                    disable ? 
                    <input className={"bp3-input bp3-fill modifier sInput"+classN} disabled={true} id={id} style={{border: '1px solid black', borderRadius: '0px'}} type="text" placeholder={placeholder} dir="auto" /> :
                    <input className={"bp3-input bp3-fill modifier sInput"+classN} onChange={(e) => {handleChange($("#"+id).val()); msgChange()}} id={id} style={{ border: '1px solid black', borderRadius: '0px'}} type="text" placeholder={placeholder} dir="auto" />
                }
                <div>{
                    empty ?
                    "" :
                    <span className="text-danger">{msg}</span>
                }</div>
                
            </div>
        </div>
    )
}

export default InputField;