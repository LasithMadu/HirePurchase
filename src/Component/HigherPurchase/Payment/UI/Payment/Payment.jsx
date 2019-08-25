import React, {Component} from 'react';
import '@zendeskgarden/react-tabs/dist/styles.css';
import { ThemeProvider } from '@zendeskgarden/react-theming';
import { Tabs, TabPanel } from '@zendeskgarden/react-tabs';
import 'simplebar'; // or "import SimpleBar from 'simplebar';" if you want to use it manually.
import 'simplebar/dist/simplebar.css';

import PaymentAdd from './PaymentForms/PaymentAdd'

export default class Payment extends Component{
    render(){
        return(
            <div className='col-sm-12'>
          <br/>
            <ThemeProvider>
                <Tabs>
                    <TabPanel label="Add" key="tab-1">
                        <div data-simplebar>
                            <div class='vehical vadd'>
                            <PaymentAdd/>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel label="Edit" key="tab-2">
                        <div data-simplebar>
                            <div class='vehical vadd'>
                            
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel label="Delete" key="tab-3">
                        <div data-simplebar>
                            <div class='vehical vadd'>
                            
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel label="View" key="tab-4">
                        <div data-simplebar>
                            <div class='vehical'>
                                <div className='container'>
                                
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                </Tabs>
            </ThemeProvider>
      </div>
        )
    }
}