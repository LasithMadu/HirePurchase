import React, {useState} from 'react'

const FormControl = ({titles, startPos, createBtn, editBtn, deleteBtn, viewBtn, components}) => {

    const [count, setCount] = useState(startPos);

    var title = titles[startPos];
    var component = components[startPos];

    switch(count){
        case 3:
            title = titles[3];
            component = components[3];
            break;
        case 0:
            title = titles[0];
            component = components[0];
            break;
        case 1:
            title = titles[1];
            component = components[1];
            break;
        case 2:
            title = titles[2];
            component = components[2];
            break;
        default:
            break;
    }

    return (
        <div className='col-md-12 col-sm-12 col-xs-12'>
            <div className='formTitle' >
                {/* <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.BOTTOM_RIGHT} /> */}
                <div className="row col-lg-12" style={{backgroundColor: '#000000', color: '#ffffff', paddingTop: '10px', paddingBottom: '-10px', width: '100%'}}>
                    <div className="col-md-9 col-sm-5 col-xs-10">
                        <p style={{color: '#ffffff', fontSize: '20px', marginBottom: '10px'}}>{title.toUpperCase()}</p>
                    </div>
                    <div className="col-md-3 col-sm-6 col-xs-2">
                        {
                            viewBtn ?
                                <i className={[(count === 3 ? "fa fa-eye formBtn saveicon active" : "fa fa-eye formBtn saveicon")]} onClick={() => setCount(3)}></i> :
                            ""
                        }
                        {
                            createBtn ?
                                <i className={[(count === 0 ? "fa fa-plus formBtn saveicon active" : "fa fa-plus formBtn saveicon")]} onClick={() => setCount(0)}></i> :
                            ""
                        }
                        {
                            editBtn ?
                                <i className={[(count === 1 ? "fa fa-edit formBtn saveicon active" : "fa fa-edit formBtn saveicon")]} onClick={() => setCount(1)}></i> :
                            ""
                        }
                        {
                            deleteBtn ?
                                <i className={[(count === 2 ? "fa fa-trash-o formBtn saveicon active" : "fa fa-trash-o formBtn saveicon")]} onClick={() => setCount(2)}></i> :
                            ""
                        }
                    </div>
                </div>
                
                <hr/>
                    <div style={{marginTop: '75px'}}>
                        {component}
                    </div>
            </div>
        </div>
    )
}

export default FormControl;