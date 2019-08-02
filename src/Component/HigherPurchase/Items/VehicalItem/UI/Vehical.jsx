import React, { Component } from "react";
import '@zendeskgarden/react-tabs/dist/styles.css';
import { ThemeProvider } from '@zendeskgarden/react-theming';
import { Tabs, TabPanel } from '@zendeskgarden/react-tabs';
import 'simplebar'; // or "import SimpleBar from 'simplebar';" if you want to use it manually.
import 'simplebar/dist/simplebar.css';

import VehicalAdd from './VehicalForms/VehicalAdd'
import VehicalEdit from './VehicalForms/VehicalEdit'
import VehicalDelete from './VehicalForms/VehicalDelete'
import VehicalView from './VehicalForms/VehicalVew'

export default class Vehical extends Component {

    render() {
      return (
        <div className='col-md-12'>
          <br/>
            <ThemeProvider>
                <Tabs>
                    <TabPanel label="Add" key="tab-1">
                        <div data-simplebar>
                            <div class='vehical'>
                            <VehicalAdd/>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel label="Edit" key="tab-2">
                        <div data-simplebar>
                            <div class='vehical'>
                            <VehicalEdit/>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel label="Delete" key="tab-3">
                        <div data-simplebar>
                            <div class='vehical'>
                            <VehicalDelete/>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel label="View" key="tab-4">
                        <div data-simplebar>
                            <div class='vehical'>
                                <div className='container'>
                                <VehicalView/>
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                </Tabs>
            </ThemeProvider>
      </div>
    );
  }
}