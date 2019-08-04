import React, {Component} from 'react';
import { MDBContainer, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink } from "mdbreact";
import '@zendeskgarden/react-tabs/dist/styles.css';

import { ThemeProvider } from '@zendeskgarden/react-theming';
import { Tabs, TabPanel } from '@zendeskgarden/react-tabs';
import 'simplebar'; // or "import SimpleBar from 'simplebar';" if you want to use it manually.
import 'simplebar/dist/simplebar.css';

import CreateAdmin from './AdminForms/CreateAdmin'
import EditAdmin from './AdminForms/EditAdmin'
import DeleteAdmin from './AdminForms/DeleteAdmin'

export default class Admin extends Component {   
  
    render() {
        return (
          <div className='col-md-12 col-sm-12 col-xs-12' style={{marginTop: '20px'}}>
            
            <ThemeProvider className='container'>
                <Tabs>
                    <TabPanel label="Add" key="tab-1">
                        <div data-simplebar>
                            <div class='edit profile'>
                            <CreateAdmin/>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel label="Edit" key="tab-2">
                        <div data-simplebar>
                            <div class='edit profile'>
                            <EditAdmin/>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel label="Delete" key="tab-3">
                        <div data-simplebar>
                            <div class='edit profile'>
                            <DeleteAdmin/>
                            </div>
                        </div>
                    </TabPanel>
                </Tabs>
            </ThemeProvider>
            </div>
      );
    }
}