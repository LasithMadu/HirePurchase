import React, {useState} from 'react'
import $ from 'jquery'
import { DatePicker } from 'antd';

const DatePickerCom = ({size, id, classN, label, placeholder, msg}) => {

    const [empty, setEmpty] = useState(true);

    function handleChange(){
        if($("#"+id).val() == ''){
            setEmpty(false);
        }else{
            setEmpty(true);
        }      
    }

    return(
        <div className={"col-lg-"+size[0]+"col-md-"+size[1]+" col-sm-"+size[2]+" col-xs-"+size[3]} style={{height: '85px'}}>
            <div className="form-group">
                <label for={id}>{label}</label>
                <br/>
                <DatePicker className={classN} id={id} placeholder={placeholder} style={{border: '1px solid black', borderRadius: '5px'}} onChange={handleChange}/>
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