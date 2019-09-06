import React, {Component} from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

import CreateUser from './UsersForms/CreateUser'
import EditUser from './UsersForms/EditUser'
import DeleteUser from './UsersForms/DeleteUser'
import ViewUser from './UsersForms/ViewUser'
import FormControl from '../../../Main/UI/SingleComponent/FormControl'

export default class Admin extends Component {
  
    render() {

        const title = ['Create User Account', 'Edit User Account', 'Delete User Account', 'View User Account'];
        const com = [<CreateUser/>, <EditUser/>, <DeleteUser/>, <ViewUser/>];

        return (
            <FormControl
                titles = {title}
                startPos = {3}
                components = {com}
                viewBtn = {true}
                editBtn = {true}
                createBtn = {true}
                deleteBtn = {true}
            />
      );
    }
}