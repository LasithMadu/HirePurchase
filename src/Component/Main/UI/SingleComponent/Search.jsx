import React, {useState} from 'react'
import $ from 'jquery'

const Search = ({id, classN, btnId, icon, placeholder, msg, handleChange, width}) => {

    const [empty, setEmpty] = useState(false);

    $(document).on("mouseover","#"+id,function(){
        $("#"+id).css('border', '1px solid #106BA3')
    });

    $(document).on("mouseout","#"+id,function(){      
        $("#"+id).css('border', '1px solid #106BA3')
    });

    function validate(){
        if($("#"+id).val() === ''){
            setEmpty(true)
        }else{
            setEmpty(false)
        }
    }

    return(
        <form onSubmit={(event)=>{handleChange(event); validate()}} className="form-horizontal" style={{marginTop: '5px'}}>
            <div className="form-body">
                <div className='row fullWidth'>
                    <div className="input-icon col-lg-10 col-md-10 col-sm-10 col-xs-6" style={{display: 'inline-block', width: width}}>
                        <i className={icon}></i>
                        <input id={id} type="text" onChange={()=>validate()} placeholder={placeholder} style={{border: '1px solid black', borderRadius: '0px'}} className="bp3-input bp3-fill modifier sInput" autoFocus/>
                    </div>
                    <div className='col-lg-1 col-md-1 col-sm-1 col-xs-2' style={{width: '35px', height: '16px', marginTop: '-2px', display: 'inline-block'}}>
                        <button type="submit" style={{padding: '5px', width: '30px'}} className={"btn btn-primary "+classN} id={btnId} ><i className="fa fa-search" style={{fontSize: '11px'}} aria-hidden="true"></i></button>
                    </div>
                </div>
                {
                    empty ?
                    <span className="text-danger">{msg}</span> :
                    ""
                }
            </div>
        <br/>
        </form>
    )
}

export default Search;