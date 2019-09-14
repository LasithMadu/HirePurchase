import React, { Component } from "react";
import '@zendeskgarden/react-tabs/dist/styles.css';

import { ThemeProvider } from '@zendeskgarden/react-theming';
import { Tabs, TabPanel } from '@zendeskgarden/react-tabs';
import 'simplebar'; // or "import SimpleBar from 'simplebar';" if you want to use it manually.
import 'simplebar/dist/simplebar.css';

import CreateForm from './CutomerForms/CreateCustomer'
import EditCustomer from './CutomerForms/EditCustomer'
import DeleteCutomer from './CutomerForms/DeleteCustomer'
import FormControl from '../../../Main/UI/SingleComponent/FormControl'

export default class CustomerDetails extends Component {
  
    render() {

        const title = ['Customer Register', 'Edit Customer', 'Delete Customer'];
        const com = [<CreateForm/>, <EditCustomer/>, <DeleteCutomer/>];

      return (
        <div style={{margin: 0, padding: 0}}>
            <FormControl
                titles = {title}
                startPos = {0}
                components = {com}
                editBtn = {true}
                createBtn = {true}
                deleteBtn = {true}
            />
        </div>
    );
  }
}