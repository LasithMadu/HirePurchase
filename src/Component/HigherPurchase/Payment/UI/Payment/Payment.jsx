import React, {Component} from 'react';

import PaymentAdd from './PaymentForms/PaymentAdd'
import FormControl from '../../../../Main/UI/SingleComponent/FormControl'

export default class Payment extends Component{

    render(){

        const title = ['Add New Vehicle', 'Edit Vehicle', 'Delete Vehicle', 'View Vehicle'];
        const com = [<PaymentAdd/>, '', '', ''];

        return(
            <div style={{margin: 0, padding: 0}}>
                <FormControl
                    titles = {title}
                    startPos = {0}
                    components = {com}
                    createBtn = {true}
                />
            </div>
        )
    }
}