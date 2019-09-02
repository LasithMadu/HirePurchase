import React, {Component} from 'react';
import '@zendeskgarden/react-tabs/dist/styles.css';
import { ThemeProvider } from '@zendeskgarden/react-theming';
import { Tabs, TabPanel } from '@zendeskgarden/react-tabs';
import { Scrollbars } from 'react-custom-scrollbars';

import CreateUser from './UsersForms/CreateUser'
import EditUser from './UsersForms/EditUser'
import DeleteUser from './UsersForms/DeleteUser'
import ViewUser from './UsersForms/ViewUser'

export default class Admin extends Component {

    constructor(props){
        super(props)
        this.handleForms = this.handleForms.bind(this);
    }

    state = {
        formTitle: 'View User Account',
        componentId: 0
    }

    handleForms(value){
        switch(value){
            case 1:
                this.setState({componentId: 0, formTitle: 'View User Account'})
            break;
            case 2:
                this.setState({componentId: 1, formTitle: 'Create User Account'})
            break;
            case 3:
                this.setState({componentId: 2, formTitle: 'Edit User Account'})
            break;
            case 4:
                this.setState({componentId: 3, formTitle: 'Delete User Account'})
            break;
        }
    }
  
    render() {

        var component = "";

        switch(this.state.componentId){
            case 0:
                component = <ViewUser/>
            break;
            case 1:
                component = <CreateUser/>
            break;
            case 2:
                component = <EditUser/>
            break;
            case 3:
                component = <DeleteUser/>
            break;
        }

        return (
          <div className='col-md-12 col-sm-12 col-xs-12' style={{marginTop: '20px'}}>
            <div className='container edit profile formTitle' MalihuScrollbarModule style={{backgroundColor: '#ffffff'}}>
                {/* <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.BOTTOM_RIGHT} /> */}
                <div className="row">
                    <h3 className="col-md-9 col-sm-5 col-xs-10">{this.state.formTitle}</h3>
                    <div className="col-md-3 col-sm-6 col-xs-2">
                        <i className="fa fa-eye formBtn saveicon" onClick={() => this.handleForms(1)} style={{fontSize: '20px'}}></i>
                        <i className="fa fa-plus-circle formBtn saveicon" onClick={() => this.handleForms(2)} style={{fontSize: '20px'}}></i>
                        <i className="fa fa-edit formBtn saveicon" onClick={() => this.handleForms(3)} style={{fontSize: '20px'}}></i>
                        <i className="fa fa-trash-o formBtn saveicon" onClick={() => this.handleForms(4)} style={{fontSize: '20px'}}></i>
                    </div>
                </div>
                
                <hr/>
                <Scrollbars visibility-x={false} style={{height: 'calc(100vh - 250px)', display: 'inline-block', overflowX: 'hidden'}}>
                    {component}
                </Scrollbars>
            </div>
        </div>
      );
    }
}