import React, {useState} from 'react'
import $ from 'jquery'

const Search = ({id, classN, btnId, icon, placeholder, state, handleChange}) => {

    $(document).on("mouseover","#"+id,function(){
        $("#"+id).css('border', '1px solid #106BA3')
    });

    $(document).on("mouseout","#"+id,function(){      
        $("#"+id).css('border', '1px solid #106BA3')
    });

    return(
        <form action="#" className="form-horizontal">
            <div className="form-body container-full">
                <div className='row fullWidth'>
                    <div className="input-icon col-lg-11 col-md-11 col-sm-11 col-xs-6" style={{display: 'inline-block' }}>
                    <i className={icon}></i>
                        <input id={id} type="text" placeholder={placeholder} className="bp3-input bp3-fill modifier sInput" autoFocus/>
                    </div>
                    <div className='col-lg-1 col-md-1 col-sm-1 col-xs-2'>
                        <a href="#" className={"btn btn-primary "+classN} id={btnId} onClick={() => handleChange($("#"+id).val())}><i class="fa fa-search" aria-hidden="true"></i></a>
                    </div>
                </div>
            </div>
            <br/>
        </form>
    )
}

export default Search;