import React, {useState} from 'react'
import $ from 'jquery'
import { DatePicker } from "@blueprintjs/datetime";

const DatePickerCom = ({size, id, classN, label, placeholder, msg, dpId}) => {

    const [empty, setEmpty] = useState(true);
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(placeholder);

    function handleChange(){
        if($("#"+id).val() === ''){
            setEmpty(false);
        }else{
            setEmpty(true);
        }      
    }

    function handleDate(value){
        var day = value.getDate();
        var month = value.getMonth();
        var year = value.getFullYear();
        
        setDate(day + '-' + ++month + '-' + year);
        //setShow(false);
        //$("#"+id).css('border', '1px solid black')
    }   

    $(document).on("focusout","#"+id,function(){
        $("#"+id).css('border', '1px solid black')
    });

    $(document).on("focusin","#"+id,function(){
        $("#"+id).css('border', '0px')
        setShow(!show);
    });

    return(
        <div className={"dp col-lg-"+size[0]+"col-md-"+size[1]+" col-sm-"+size[2]+" col-xs-"+size[3]} style={{height: '85px'}}>
            <div className="form-group">
                <label for={id}>{label}</label>
                <br/>
                <input className={"bp3-input bp3-fill modifier sInput"+classN} value={date} onChange={handleChange} id={id} style={{ border: '1px solid black', borderRadius: '0px'}} type="text" placeholder={placeholder} dir="auto"/>
                {
                    show ?
                    <DatePicker className="ui-datepicker dateP" id={dpId} onChange={(newDate) => handleDate(newDate)
                    }
                    value={new Date()}/> :
                    ""
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

export default DatePickerCom;