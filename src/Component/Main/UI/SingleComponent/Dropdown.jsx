import React, { useState, useEffect } from 'react'
import $ from 'jquery'

const Dropdown = ({ size, id, classN, label, disable, msg, reqiured, save, value }) => {

    const [empty, setEmpty] = useState(false);
    const [count, setCount] = useState(0);
    const [enable] = useState(disable);

    function msgChange() {
        if ($("#" + id).val() === '' && reqiured) {
            setEmpty(true);
        } else {
            setEmpty(false);
        }
    }

    const setDropdown = () => {
        if (count === 0) {
            var dropdown = $("#" + id);
            for (var i = 0; i < value.length; i++) {
                dropdown.append("<option value=" + value[i] + ">" + value[i] + "</option>");
            }
            if (value.length > 0) {
                setCount(1)
            }
        }
    }

    useEffect(() => {
        setDropdown();
    }, [setDropdown]);

    
    $(document).ready(function () {
        setTimeout(function () {
            if (save) {
                if ($("#" + id).find(":selected").index() === 0 && reqiured) {
                    setEmpty(true);
                } else {
                    window.onload = null;
                    $(document).unbind("ready");
                    setEmpty(false);
                }
            }
        }, 30);
    });

    $(document).on("focusout", "#" + id, function () {
        $("#" + id).css('border', '1px solid black')
        $("#" + id + "icon").removeClass("droparrow")
    });

    $(document).on("focusin", "#" + id, function () {
        $("#" + id).css('border', '0px')
        $("#" + id+"icon").addClass("droparrow")
    });

    return (
        <div className={"col-lg-" + size[0] + "col-md-" + size[1] + " col-sm-" + size[2] + " col-xs-" + size[3]} style={{ height: '85px', position: 'relative' }}>
            <div className="form-group has-feedback">
                <label for={id}>{label}</label> {reqiured ? <span class="glyphicon glyphicon-asterisk"></span> : ""}
                <br />
                {
                    enable ?
                        <div><select className={"bp3-input bp3-fill modifier sInput icon-input " + classN} disabled={true} name={id} id={id} style={{ border: '1px solid black', borderRadius: '0px' }} dir="auto" ></select> <i id={id + "icon"} className='fa fa-angle-double-down form-control-feedback ' style={{fontSize: '20px'}} aria-hidden='true'></i></div> :
                        <div><select className={"bp3-input bp3-fill modifier sInput icon-input " + classN} onChange={(e) => msgChange()} name={id} id={id} style={{ border: '1px solid black', borderRadius: '0px' }} dir="auto" ></select> <i id={id+"icon"} className='fa fa-angle-double-down form-control-feedback' style={{ fontSize: '20px' }} aria-hidden='true'></i></div>
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

export default Dropdown;