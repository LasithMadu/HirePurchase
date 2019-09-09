import React, {useState} from 'react'
import $ from 'jquery'

const InputField = ({size, id, classN, label, placeholder, disable, msg}) => {

    const [empty, setEmpty] = useState(true);

    function handleChange(){
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
        $("#"+id).css('border', '0')
    });

    $(document).on("mouseover","#"+id,function(){
        $("#"+id).css('border', '1px solid #106BA3')
    });

    $(document).on("mouseout","#"+id,function(){      
        $("#"+id).css('border', '1px solid #106BA3')
    });

    return(
        <div className={"col-lg-"+size[0]+"col-md-"+size[1]+" col-sm-"+size[2]+" col-xs-"+size[3]} style={{height: '85px'}}>
            <div className="form-group">
                <label for={id}>{label}</label>
                <br/>
                {
                    disable ? 
                    <input className={"bp3-input bp3-fill modifier sInput"+classN} disabled={true} id={id} style={{borderRadius: 0, border: '1px solid black'}} type="text" placeholder={placeholder} dir="auto" /> :
                    <input className={"bp3-input bp3-fill modifier sInput"+classN} onChange={handleChange} id={id} style={{borderRadius: 0, border: '1px solid black'}} type="text" placeholder={placeholder} dir="auto" />
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