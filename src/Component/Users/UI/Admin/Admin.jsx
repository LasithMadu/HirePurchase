import React, {Component} from 'react';

import CreateAdmin from './AdminForms/CreateAdmin'
import EditAdmin from './AdminForms/EditAdmin'
import DeleteAdmin from './AdminForms/DeleteAdmin'
import FormControl from '../../../Main/UI/SingleComponent/FormControl'

export default class Admin extends Component {

    render() {

        const title = ['Create Admin Account', 'Edit Admin Account', 'Delete Admin Account'];
        const com = [<CreateAdmin/>, <EditAdmin/>, <DeleteAdmin/>];

        return (
            <FormControl
                titles = {title}
                startPos = {0}
                components = {com}
                editBtn = {true}
                createBtn = {true}
                deleteBtn = {true}
            />
      );
    }
}
