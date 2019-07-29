import React, { Component } from "react";
import '@zendeskgarden/react-tabs/dist/styles.css';
import { ThemeProvider } from '@zendeskgarden/react-theming';
import { Tabs, TabPanel } from '@zendeskgarden/react-tabs';
import 'simplebar'; // or "import SimpleBar from 'simplebar';" if you want to use it manually.
import 'simplebar/dist/simplebar.css';

import Vehical from '../VehicalItem/UI/Vehical'

export default class ItemComponent extends Component {

    render() {
      return (
        <div className='col-md-12'>
          <br/>
            <ThemeProvider>
                <Tabs>
                    <TabPanel label="Vehicals" key="tab-1">
                        <Vehical/>
                    </TabPanel>
                    <TabPanel label="Lands" key="tab-2">
                        <div data-simplebar>
                            <div class='edit'>
                            
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel label="Other" key="tab-3">
                        <div data-simplebar>
                            <div class='edit'>
                            
                            </div>
                        </div>
                    </TabPanel>
                </Tabs>
            </ThemeProvider>
      </div>
    );
  }
}