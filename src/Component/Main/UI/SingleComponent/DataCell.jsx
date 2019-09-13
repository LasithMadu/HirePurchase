import React from 'react'

const DataCell = ({label, value, icon}) => {

    return(
        <tr height="60px">
            <td><img src={icon} alt="icons" className={"iconSize"}/>
                {/* <i className={"icon "+icon} style={{fontSize: '26px', marginTop: '8px'}}></i> */}
                </td>
            <td>
                <div className="profileValue">
                <h5 className="gap"><strong>{label}</strong></h5>
                <p className="gap">{value}</p>
                </div>
            </td>
        </tr>
    )
}

export default DataCell;