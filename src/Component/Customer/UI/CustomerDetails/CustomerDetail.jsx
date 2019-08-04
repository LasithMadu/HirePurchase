import React, { Component } from "react";
import '@zendeskgarden/react-tabs/dist/styles.css';

import { ThemeProvider } from '@zendeskgarden/react-theming';
import { Tabs, TabPanel } from '@zendeskgarden/react-tabs';
import 'simplebar'; // or "import SimpleBar from 'simplebar';" if you want to use it manually.
import 'simplebar/dist/simplebar.css';

import CreateForm from './CutomerForms/CreateCustomer'
import EditCustomer from './CutomerForms/EditCustomer'
import DeleteCutomer from './CutomerForms/DeleteCustomer'

export default class CustomerDetails extends Component {
  
    render() {
      return (
        <div className='col-md-12 col-sm-12 col-xs-12'>
          <br/>
            <ThemeProvider className='container'>
                <Tabs>
                    <TabPanel label="Add" key="tab-1">
                        <div data-simplebar>
                            <div class='edit profile'>
                            <CreateForm/>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel label="Edit" key="tab-2">
                        <div data-simplebar>
                            <div class='edit profile'>
                            <EditCustomer/>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel label="Delete" key="tab-3">
                        <div data-simplebar>
                            <div class='edit profile'>
                            <DeleteCutomer/>
                            </div>
                        </div>
                    </TabPanel>
                </Tabs>
            </ThemeProvider>
      </div>
    );
  }
}